import whisper
import srt

def transcribe_audio_with_timestamps(audio_path, output_path):
    # Charger le modèle Whisper
    model = whisper.load_model("base")

    # Transcrire l'audio avec Whisper et obtenir les segments avec les timestamps
    result = model.transcribe(audio_path, language='de', word_timestamps=True)
    segments = result["segments"]

    # Créer une liste de sous-titres
    subs = []

    # Ajouter les segments avec les timestamps à la liste de sous-titres
    for i, segment in enumerate(segments):
        start_time = srt.timedelta(milliseconds=int(segment["start"] * 1000))
        end_time = srt.timedelta(milliseconds=int(segment["end"] * 1000))
        text = segment["text"]
        subs.append(srt.Subtitle(index=i+1, start=start_time, end=end_time, content=text))

    # Écrire le fichier SRT
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(srt.compose(subs))


