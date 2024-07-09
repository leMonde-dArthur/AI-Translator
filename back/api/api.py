from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from create_a_dub_from_url import create_dub_from_url

app = Flask(__name__)
CORS(app)  # active les CORS pour les nos routes


@app.route('/')
def index():
    return 'Server Flask'


@app.route('/create-dub', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)
