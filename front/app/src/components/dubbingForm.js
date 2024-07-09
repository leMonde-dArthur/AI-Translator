import React, { useState } from 'react';

const DubbingForm = ({ onSubmit }) => {
    const [url, setUrl] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('en');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ url, sourceLanguage, targetLanguage });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter Source URL:
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
            </label>
            <br />
            <label>
                Select Source Language:
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
                Select Target Language:
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default DubbingForm;
