import librosa
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import whisper
import srt

def identify_speakers(audio_path, num_clusters=1):
    audio, sr = librosa.load(audio_path, sr=None)
    mfccs = librosa.feature.mfcc(y=audio, sr=sr)

    scaler = StandardScaler()
    mfccs_scaled = scaler.fit_transform(mfccs.T)

    kmeans = KMeans(n_clusters=num_clusters)
    speaker_labels = kmeans.fit_predict(mfccs_scaled)

    return speaker_labels

def transcribe_audio_with_timestamps(audio_path):
    # Charger le modèle Whisper
    model = whisper.load_model("base")

    # Transcrire l'audio avec Whisper et obtenir les segments avec les timestamps
    result = model.transcribe(audio_path, language='de', word_timestamps=True)
    segments = result["segments"]

    return segments

def associate_speakers_with_timestamps(speaker_labels, segments, hop_length=512, sr=22050):
    speaker_timestamps = []
    current_speaker = speaker_labels[0]
    current_words = []

    for i, segment in enumerate(segments):
        segment_start = segment["start"]
        segment_end = segment["end"]
        text = segment["text"]

        # Vérifier si le speaker a changé
        frame_index = int((segment_start * sr) / hop_length)
        if frame_index >= len(speaker_labels) or speaker_labels[frame_index] != current_speaker:
            # Ajouter les mots précédents au speaker actuel
            if current_words:
                speaker_timestamps.append((current_speaker, current_words))
                current_words = []

            # Mettre à jour le speaker actuel
            current_speaker = speaker_labels[frame_index] if frame_index < len(speaker_labels) else current_speaker

        # Ajouter le mot actuel à la liste des mots du speaker actuel
        current_words.append((segment_start, segment_end, text))

    # Ajouter les derniers mots au speaker actuel
    if current_words:
        speaker_timestamps.append((current_speaker, current_words))

    return speaker_timestamps

def save_speaker_timestamps_to_file(speaker_timestamps, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        for speaker, words in speaker_timestamps:
            f.write(f"Speaker {speaker}:\n")
            for start, end, text in words:
                f.write(f"{srt.timedelta(milliseconds=int(start * 1000))} --> {srt.timedelta(milliseconds=int(end * 1000))} : {text}\n")
            f.write("\n")

def process_audio_file(audio_path, output_path):
    speaker_labels = identify_speakers(audio_path)
    segments = transcribe_audio_with_timestamps(audio_path)
    speaker_timestamps = associate_speakers_with_timestamps(speaker_labels, segments)
    save_speaker_timestamps_to_file(speaker_timestamps, output_path)

# Exemple d'utilisation
audio_path = "audio.wav"
output_path = "example_output.txt"
process_audio_file(audio_path, output_path)
