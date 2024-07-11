import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DubbingForm = ({ onSubmit }) => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('fr');
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false); // State to track drag events

    const handleUrlSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        await onSubmit({ url, sourceLanguage, targetLanguage });
        setLoading(false);
    };

    const handleFileSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('sourceLanguage', sourceLanguage);
        formData.append('targetLanguage', targetLanguage);

        await onSubmit(formData);

        setLoading(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setUrl("");
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        setFile(null);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        setUrl("");
    };

    return (
        <form onSubmit={file ? handleFileSubmit : handleUrlSubmit}>

            <label>
                Source Language
                <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="pt">Portuguese</option>
                    <option value="zh">Chinese</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="ar">Arabic</option>
                    <option value="ru">Russian</option>
                    <option value="ko">Korean</option>
                    <option value="id">Indonesian</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="tr">Turkish</option>
                    <option value="pl">Polish</option>
                    <option value="sv">Swedish</option>
                    <option value="fil">Filipino</option>
                    <option value="ms">Malay</option>
                    <option value="ro">Romanian</option>
                    <option value="uk">Ukrainian</option>
                    <option value="el">Greek</option>
                    <option value="cs">Czech</option>
                    <option value="da">Danish</option>
                    <option value="fi">Finnish</option>
                    <option value="bg">Bulgarian</option>
                    <option value="hr">Croatian</option>
                    <option value="sk">Slovak</option>
                    <option value="ta">Tamil</option>
                </select>
            </label>
            <br />
            <label>
                Target Language
                <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="pt">Portuguese</option>
                    <option value="zh">Chinese</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="ar">Arabic</option>
                    <option value="ru">Russian</option>
                    <option value="ko">Korean</option>
                    <option value="id">Indonesian</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="tr">Turkish</option>
                    <option value="pl">Polish</option>
                    <option value="sv">Swedish</option>
                    <option value="fil">Filipino</option>
                    <option value="ms">Malay</option>
                    <option value="ro">Romanian</option>
                    <option value="uk">Ukrainian</option>
                    <option value="el">Greek</option>
                    <option value="cs">Czech</option>
                    <option value="da">Danish</option>
                    <option value="fi">Finnish</option>
                    <option value="bg">Bulgarian</option>
                    <option value="hr">Croatian</option>
                    <option value="sk">Slovak</option>
                    <option value="ta">Tamil</option>
                </select>
            </label>
            <br />
            <label>
                Youtube URL:
                <input type="text" value={url} onChange={handleUrlChange} placeholder="https://www.youtube.com/watch?v=..." required={!file} />
            </label>
            <div className={`or-separator ${file ? 'hidden' : ''}`}>OR</div>
            <div
                className={`file-input-container ${dragging ? 'dragging' : ''}`}
                id="drop-area"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('audio-file').click()}
            >
                <input type="file" id="audio-file" onChange={handleFileChange} name="audio-file" accept=".mp3,.wav,.flac,.aac,.ogg,.mp4" />
                <div className="file-input-icon">📁</div>
                <div className="file-input-text">Drag &amp; Drop your file here or click to select</div>
                <div className="file-name" id="file-name">{file ? file.name : ''}</div>
            </div>

            <br />
            <br />
            {loading ? (
                <Box sx={{ display: 'flex', margin: 'auto', color: '#6C63FF' }}>
                    <CircularProgress color="inherit" />
                </Box>

            ) : (
                <button type="submit">Submit</button>
            )}
        </form>
    );
};

export default DubbingForm;
