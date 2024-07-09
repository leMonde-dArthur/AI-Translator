import React from 'react';
import DubbingForm from '../components/dubbingForm';
import createDubbing from '../services/dubbingService';

const DubbingPage = () => {
    const handleSubmit = async (formData) => {
        const result = await createDubbing(formData);
        if (result.success) {
            alert("Dubbing was successful!");
        } else {
            alert(result.error);
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
