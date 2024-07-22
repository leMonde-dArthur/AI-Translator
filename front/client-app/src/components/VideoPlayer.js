import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./css/video_player.css";
import { CircleFlag } from 'react-circle-flags';

const VideoPlayer = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const languages = [
        { code: "es", name: "Español", flag: <CircleFlag countryCode="es" height="50" /> },
        { code: "de", name: "Deutsch", flag: <CircleFlag countryCode="de" height="50" /> },
        { code: "ru", name: "Русский", flag: <CircleFlag countryCode="ru" height="50" /> },
        { code: "zh", name: "中文", flag: <CircleFlag countryCode="cn" height="50" /> }
    ];

    const handleSelect = (code) => {
        setSelectedLanguage(code);
    };

    const getVideoUrl = () => {
        switch (selectedLanguage) {
            case "fr":
                return "/videos/video_.mp4";
            case "es":
                return "/videos/video_es.mp4";
            case "de":
                return "/videos/video_de.mp4";
            case "ru":
                return "/videos/video_ru.mp4";
            case "zh":
                return "/videos/video_zh.mp4";
            default:
                return "/videos/video_en.mp4";
        }
    };

    return (
        <div className="video-player-container">
            <div className="video-section">
                <p className="video-description">Avant</p>
                <ReactPlayer url="/videos/video_en.mp4" controls className="left-video" />
            </div>
            <div className="video-section">
                <p className="video-description">Après</p>
                <ReactPlayer url={getVideoUrl()} controls className="right-video" />
                <ul className="language-list">
                    {languages.map((language, index) => (
                        <li key={index} onClick={() => handleSelect(language.code)} className={`language-item ${language.code === selectedLanguage ? "selected" : ""}`}>
                            {language.flag}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoPlayer;
