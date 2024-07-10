from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from create_a_dub_from_url import create_dub_from_url
from create_a_dub_from_file import create_dub_from_file
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return 'Server Flask'

# Doublage par URL
@app.route('/create-dub-url', methods=['POST'])
def create_dub():
    data = request.json 
    if not data or 'url' not in data or 'sourceLanguage' not in data or 'targetLanguage' not in data:
        return jsonify({'error': 'Invalid request. Missing required fields.'}), 400
    
    source_url = data['url']
    source_language = data['sourceLanguage']
    target_language = data['targetLanguage']
    
    result = create_dub_from_url(source_url, source_language, target_language)
    
    if result:
        # return jsonify({'success': True, 'result': result}), 200
        return send_file(result, mimetype='audio/mpeg'), 200
    else:
        return jsonify({'success': False}), 500
    
# Doublage par fichier
@app.route('/create-dub-file', methods=['POST'])
def create_dub_file():
    if 'file' not in request.files or 'sourceLanguage' not in request.form or 'targetLanguage' not in request.form:
        return jsonify({'error': 'Invalid request. Missing required fields.'}), 400
    
    file = request.files['file']
    source_language = request.form['sourceLanguage']
    target_language = request.form['targetLanguage']
    
    if file:
        input_file_path = f"data/{file.filename}"
        file.save(input_file_path)

        result = create_dub_from_file(input_file_path, file.mimetype, source_language, target_language)
        
        os.remove(input_file_path)

        if result:
            return send_file(result, mimetype='audio/mpeg'), 200
        else:
            return jsonify({'success': False}), 500
    else:
        return jsonify({'error': 'No file provided.'}), 400


if __name__ == '__main__':
    app.run(debug=True)
