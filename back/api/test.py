
from dubbing_utils import download_dubbed_file
from create_a_dub_from_url import create_dub_from_url

from dotenv import load_dotenv
import os


if __name__ == "__main__":

    source_url = "https://youtu.be/QrHAMiZdb0g" 
    source_language = "de"
    target_language = "en"
    result = create_dub_from_url(source_url, source_language, target_language)
    if result:
        print("Dubbing was successful! File saved at:", result)
    else:
        print("Dubbing failed or timed out.")

    #dubbing_id_sample = os.getenv("sample_dubbing_id")
    #download_dubbed_file(dubbing_id= dubbing_id_sample, language_code="en")