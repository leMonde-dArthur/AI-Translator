import os
from typing import Optional

from dotenv import load_dotenv
from dubbing_utils import download_dubbed_file, wait_for_dubbing_completion
from elevenlabs.client import ElevenLabs

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


def create_dub_from_url(
    source_url: str,
    source_language: str,
    target_language: str,
):

    response = client.dubbing.dub_a_video_or_an_audio_file(
        source_url=source_url,
        target_lang=target_language,
        mode="automatic",
        source_lang=source_language,
        num_speakers=1,
        watermark=True,  # reduces the characters used
    )

    dubbing_id = response.dubbing_id
    if wait_for_dubbing_completion(dubbing_id):
        output_file_path = download_dubbed_file(dubbing_id, target_language)
        return output_file_path
    else:
        return None