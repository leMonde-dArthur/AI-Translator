import whisper

def transcribe_audio(audio_path):
    # Charger le modèle Whisper
    model = whisper.load_model("base")

    # Transcrire l'audio avec Whisper
    result = model.transcribe(audio_path)
    transcription = result["text"]
    return transcription
