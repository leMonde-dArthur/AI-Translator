import os
import time

from dotenv import load_dotenv
import magic
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

def get_file_mime_type(content):
    mime = magic.Magic(mime=True)
    return mime.from_buffer(content)

def download_dubbed_file(dubbing_id: str, language_code: str) -> str:

    headers = {"xi-api-key": f"{ELEVENLABS_API_KEY}"}

    dir_path = "data_output/"
    os.makedirs(dir_path, exist_ok=True)

    url = f"https://api.elevenlabs.io/v1/dubbing/{dubbing_id}/audio/{language_code}"

    response = requests.get(url, headers=headers)

    if response.status_code == 200:

        content = response.content
        mime_type = get_file_mime_type(content)

        dir_path = f"{dir_path}{dubbing_id}"
        os.makedirs(dir_path, exist_ok=True)

        if mime_type.startswith('audio/'):
            # It's already an audio file, save it as MP3
            mp3_file_path = f"{dir_path}/{dubbing_id}_{language_code}.mp3"
            with open(mp3_file_path, "wb") as file:
                file.write(content)
            return mp3_file_path
        else:
            # Not an audio file, assume it's a video (e.g., MP4)
            mp4_file_path = f"{dir_path}/{dubbing_id}_{language_code}.mp4"
            with open(mp4_file_path, "wb") as file:
                file.write(content)
            return mp4_file_path

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
