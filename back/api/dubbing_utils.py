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


def download_dubbed_file(dubbing_id: str, language_code: str) -> str:

    dir_path = "data/"
    os.makedirs(dir_path, exist_ok=True)

    url = f"https://api.elevenlabs.io/v1/dubbing/{dubbing_id}/audio/en"

    headers = {"xi-api-key": f"{ELEVENLABS_API_KEY}"}

    response = requests.request("GET", url, headers=headers)

    if response.status_code == 200:

        dir_path = f"data/{dubbing_id}"
        os.makedirs(dir_path, exist_ok=True)

        mp4_file_path = f"{dir_path}/{language_code}.mp4"
        with open(mp4_file_path, "wb") as file:
            file.write(response.content)

        # Convert MP4 to MP3
        mp3_file_path = f"{dir_path}/{language_code}.mp3"
        audio = AudioSegment.from_file(mp4_file_path, format="mp4")
        audio.export(mp3_file_path, format="mp3")

        # Supprimer le fichier MP4 après la conversion
        os.remove(mp4_file_path)

        return mp3_file_path
    else:
        print(f"Failed to download the file: {response.status_code}, {response.text}")
        return ""


def wait_for_dubbing_completion(dubbing_id: str) -> bool:
    """
    Waits for the dubbing process to complete by periodically checking the status.

    Args:
        dubbing_id (str): The dubbing project id.

    Returns:
        bool: True if the dubbing is successful, False otherwise.
    """
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
