import os
import time

from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from pydub import AudioSegment
import requests

# Load environment variables
load_dotenv()

# Retrieve the API key
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
if not ELEVENLABS_API_KEY:
    raise ValueError(
        "ELEVENLABS_API_KEY environment variable not found. "
        "Please set the API key in your environment variables."
    )

client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

def is_audio_file(file_name: str) -> bool:
    audio_extensions = ['.mp3', '.wav', '.flac', '.aac', '.ogg']
    return any(file_name.lower().endswith(ext) for ext in audio_extensions)

def download_dubbed_file(dubbing_id: str, language_code: str) -> str:

    headers = {"xi-api-key": f"{ELEVENLABS_API_KEY}"}
    url_metadata = f"https://api.elevenlabs.io/v1/dubbing/{dubbing_id}"
    response_metadata = requests.get(url_metadata, headers=headers)

    is_audio_type = False

    if response_metadata.status_code == 200:
        metadata = response_metadata.json()
        file_name = metadata.get("name", "")
        is_audio_type = is_audio_file(file_name)

    dir_path = "data/"
    os.makedirs(dir_path, exist_ok=True)

    url = f"https://api.elevenlabs.io/v1/dubbing/{dubbing_id}/audio/{language_code}"

    response = requests.get(url, headers=headers)

    if response.status_code == 200:

        dir_path = f"data/{dubbing_id}"
        os.makedirs(dir_path, exist_ok=True)

        if not is_audio_type :
            mp4_file_path = f"{dir_path}/{dubbing_id}_{language_code}.mp4"
            with open(mp4_file_path, "wb") as file:
                file.write(response.content)

            # Convert MP4 to MP3
            mp3_file_path = f"{dir_path}/{dubbing_id}_{language_code}.mp3"
            audio = AudioSegment.from_file(mp4_file_path, format="mp4")
            audio.export(mp3_file_path, format="mp3")

            # Supprimer le fichier MP4 après la conversion
            os.remove(mp4_file_path)
        else :
            mp3_file_path = f"{dir_path}/{dubbing_id}_{language_code}.mp3"
            with open(mp3_file_path, "wb") as file:
                file.write(response.content)
                   
        return mp3_file_path

    else:
        print(f"Failed to download the file: {response.status_code}, {response.text}")
        return ""


def wait_for_dubbing_completion(dubbing_id: str) -> bool:
    MAX_ATTEMPTS = 120
    CHECK_INTERVAL = 10  # In seconds

    for _ in range(MAX_ATTEMPTS):
        metadata = client.dubbing.get_dubbing_project_metadata(dubbing_id)
        if metadata.status == "dubbed":
            return True
        elif metadata.status == "dubbing":
            print(
                "Dubbing in progress... Will check status again in",
                CHECK_INTERVAL,
                "seconds.",
            )
            time.sleep(CHECK_INTERVAL)
        else:
            print("Dubbing failed:", metadata.error_message)
            return False

    print("Dubbing timed out")
    return False
