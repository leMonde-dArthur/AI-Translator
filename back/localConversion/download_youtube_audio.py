import os
import pytube
from moviepy.editor import AudioFileClip

def download_youtube_audio(url, output_folder):
    # Créer un objet YouTube
    yt = pytube.YouTube(url)

    # Obtenir la meilleure qualité audio disponible
    audio_stream = yt.streams.filter(only_audio=True).first()

    # Créer le dossier de sortie s'il n'existe pas
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Télécharger l'audio au format MP4
    audio_filename = audio_stream.download(filename='temp_audio')

    # Convertir le fichier MP4 en MP3
    audio_clip = AudioFileClip(audio_filename)
    audio_mp3_filename = os.path.join(output_folder, 'audio.mp3')
    audio_clip.write_audiofile(audio_mp3_filename)

    # Supprimer le fichier temporaire MP4
    os.remove(audio_filename)

    print(f"L'audio a été téléchargé et enregistré sous {audio_mp3_filename}")
    return audio_mp3_filename
