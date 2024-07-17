from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from pytube import YouTube
import os
import io
import sys
import json
from pydub import AudioSegment

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return 'Server Flask'


# Google Drive part

# Chemin vers le fichier de clés JSON téléchargé depuis Google Cloud Console
KEY_FILE = './credentials.json'

# Scopes nécessaires pour accéder à Google Drive
SCOPES = ['https://www.googleapis.com/auth/drive']

# Authentification avec les clés du service Google
credentials = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
drive_service = build('drive', 'v3', credentials=credentials)

# Endpoint pour télécharger un fichier vers Google Drive
@app.route('/upload-file-to-google-drive', methods=['POST'])
def upload_file_to_google_drive():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    file_metadata = {
        'name': file.filename,
        'parents': ['12zUj6DVxotQf_inge55W0zCVCMqcQg8R']  # ID du dossier parent dans Google Drive
    }

    try:
        # Créer un objet MediaIoBaseUpload à partir du fichier
        media = MediaIoBaseUpload(io.BytesIO(file.read()), mimetype=file.mimetype, resumable=True)

        # Envoi du fichier à Google Drive
        uploaded_file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        file_id = uploaded_file.get('id')

        return jsonify({'fileId': file_id}), 200
    except Exception as e:
        print('Error uploading file to Google Drive:', e)
        return jsonify({'error': 'Error uploading file to Google Drive'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
