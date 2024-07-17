import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { red } from '@mui/material/colors';

const HeroSection = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [result, setResult] = useState('');
    const [url, setUrl] = useState('');
    const [tagline, setTagline] = useState("Sumfy utilise une IA de pointe pour transformer vos fichiers audio et vidéo en plus de 25 langues, offrant une solution rapide et efficace.");
    const [alertSeverity, setAlertSeverity] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const updateTagline = () => {
            if (window.innerWidth <= 768) {
                setTagline("Sumfy utilise une IA avancée pour convertir rapidement vos fichiers en plus de 25 langues.");
            } else {
                setTagline("Sumfy utilise une IA de pointe pour transformer vos fichiers audio et vidéo en plus de 25 langues, offrant une solution rapide et efficace.");
            }
        };

        // Initial call
        updateTagline();

        // Update on resize
        window.addEventListener('resize', updateTagline);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', updateTagline);
        };
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = '';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = '';
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFileSelect(selectedFile);
    };

    const handleFileSelect = (file) => {
        if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
            setFile(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);

        let formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/upload-file-to-google-drive", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                setFile(null);
            }

            const responseData = await response.json();
            if (responseData && responseData.publicUrl) {
                setUrl(responseData.publicUrl);
            }
            setIsTranslating(false);
            setAlertSeverity('success');
            setAlertMessage('Le fichier a été envoyé avec succès!');

        } catch (error) {
            console.error('Error uploading file:', error);
            setAlertSeverity('error');
            setAlertMessage('Une erreur est survenue lors de l\'envoi du fichier.');
        } finally {
            setIsTranslating(false);
            setIsLoading(false);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        document.getElementById('fileInput').value = '';
    };

    const handleAlertClose = () => {
        setAlertSeverity(null);
        setAlertMessage('');
    };

    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="h1">Traduisez votre contenu en un seul clic</h1>
                <p className="tagline">
                    {tagline}
                </p>
            </div>
            <div className="app" id="app">
                <div
                    className="upload-area"
                    id="dropArea"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="upload-icon">🎙️</div>
                    {file ?
                        <div>
                            <div className="file-info">
                                <h3>{file.name}</h3>
                                <CancelIcon onClick={handleRemoveFile} sx={{ color: red[500] }} />
                            </div>
                            <br></br></div> : <div>
                            <h3>Déposez votre fichier audio ici</h3>
                            <p>ou</p>
                        </div>}
                    <input type="file" id="fileInput" accept="audio/*, video/*" style={{ display: 'none' }} onChange={handleFileChange} />

                    {file ? (
                        <React.Fragment>
                            {isLoading ? (
                                <button className="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    En cours...
                                </button>
                            ) : (
                                <button className="button" onClick={handleSubmit} disabled={!file || isTranslating}>
                                    Envoyer
                                </button>
                            )}
                        </React.Fragment>
                    ) : (
                        <button className="button" onClick={() => document.getElementById('fileInput').click()}>
                            Sélectionner un fichier
                        </button>
                    )}


                </div>

                {/* Affichage des alertes */}
                {<div>
                    <br></br>
                    {
                        alertSeverity && !file && (
                            <Alert severity={alertSeverity} onClose={handleAlertClose}>
                                <AlertTitle>{alertSeverity === 'success' ? 'Succès' : 'Erreur'}</AlertTitle>
                                {alertMessage}
                            </Alert>
                        )}</div>}

                {url && (
                    <div id="result" style={{ marginTop: '1rem' }}>
                        <p>File uploaded! View it <a href={url} target="_blank" rel="noopener noreferrer">here</a>.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
