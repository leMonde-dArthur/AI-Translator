import React from 'react';
import DubbingForm from '../components/dubbingForm';
import createDubbing from '../services/dubbingService';

const DubbingPage = () => {
    const handleSubmit = async (formData) => {
        const result = await createDubbing(formData);
        if (result.success) {
            alert("Dubbing was successful! File saved at: " + result.result);
        } else {
            alert("Dubbing failed or timed out.");
        }
    };

    return (
        <div className="DubbingPage">
            <h1>Dubbing Application</h1>
            <DubbingForm onSubmit={handleSubmit} />
        </div>
    );
};

export default DubbingPage;
