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

        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        return { success: false };
    }
};

export default createDubbing;
