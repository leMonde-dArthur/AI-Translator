import librosa
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

def identify_speakers(audio_path, num_clusters=2):
    audio, sr = librosa.load(audio_path, sr=None)
    mfccs = librosa.feature.mfcc(y=audio, sr=sr)

    scaler = StandardScaler()
    mfccs_scaled = scaler.fit_transform(mfccs.T)

    kmeans = KMeans(n_clusters=num_clusters)
    speaker_labels = kmeans.fit_predict(mfccs_scaled)

    for i, label in enumerate(speaker_labels):
        print(f"Time Segment {i}: Speaker {label}")