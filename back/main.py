from download_youtube_audio import download_youtube_audio
from transcribe_audio import transcribe_audio_with_timestamps
from diarize_audio import diarize_audio

def main():

    # URL de la vidéo YouTube
    youtube_url = "https://www.youtube.com/watch?v=OZXbiB0g950&t=619s&ab_channel=TocaToast"

    # Dossier de sortie
    output_folder = "downloaded_audio"

    # On call la fonction pour télécharger l'audio
    # audio_file_path = download_youtube_audio(youtube_url, output_folder)

    audio_file_path = "downloaded_audio\\audio.wav"

    # Transcrire l'audio téléchargé
    transcription = transcribe_audio_with_timestamps_and_diarization(audio_file_path, "example.srt")
    print("Transcription de l'audio :")
    print(transcription)

if __name__ == "__main__":
    main()
