import { api_dub_url, api_dub_file } from '../utils/constants';

const createDubbingUrl = async (data) => {
    try {
        const response = await fetch(api_dub_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'dubbing.mp3');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        return { success: true };
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        return { success: false, error: error.message };
    }
};

const createDubbingFile = async (file, sourceLanguage, targetLanguage) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sourceLanguage', sourceLanguage);
    formData.append('targetLanguage', targetLanguage);

    try {
        const response = await fetch(api_dub_file, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'dubbing.mp3');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        return { success: true };
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        return { success: false, error: error.message };
    }
};

export { createDubbingUrl, createDubbingFile };
