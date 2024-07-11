import React from 'react';
import DubbingForm from '../components/dubbingForm';
import { createDubbingUrl, createDubbingFile } from '../services/dubbingService';

const DubbingPage = () => {
    const handleSubmit = async (formData) => {
        if (formData instanceof FormData) {
            // Soumission de fichier
            return createDubbingFile(
                formData.get('file'),
                formData.get('sourceLanguage'),
                formData.get('targetLanguage')
            );
        } else {
            // Soumission d'URL
            return createDubbingUrl(formData);
        }
    };

    return (
        <div className="DubbingPage">
            <h1>Dubbing Creator</h1>
            <DubbingForm onSubmit={handleSubmit} />
        </div>
    );
};

export default DubbingPage;
