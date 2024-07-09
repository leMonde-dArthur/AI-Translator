from flask import Flask, request, jsonify
from create_a_dub_from_url import create_dub_from_url

app = Flask(__name__)

@app.route('/create-dub', methods=['POST'])
def create_dub():
    data = request.json
    source_url = data['source_url']
    source_language = data['source_language']
    target_language = data['target_language']
    
    result = create_dub_from_url(source_url, source_language, target_language)
    
    if result:
        return jsonify({'success': True, 'result': result}), 200
    else:
        return jsonify({'success': False}), 500

if __name__ == '__main__':
    app.run(debug=True)
