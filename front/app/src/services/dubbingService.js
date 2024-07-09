const apiUrl = 'http://localhost:5000/create-dub'; // url call à l'api Flask

const createDubbing = async (data) => {
    try {
        const response = await fetch(apiUrl, {
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
        return { success: false };
    }
};

export default createDubbing;
