import React from 'react';

const Features = () => {
    return (
        <section id="features" className="section">
            <h2 className="h2">Fonctionnalités</h2>
            <div className="features">
                <div className="feature">
                    <div className="feature-icon">🌍</div>
                    <h3>Traduction Multilingue</h3>
                    <p>Traduisez votre audio dans plus de 25 langues en un seul clic.</p>
                </div>
                <div className="feature">
                    <div className="feature-icon">🧠</div>
                    <h3>IA Contextuelle</h3>
                    <p>Notre IA comprend le contexte pour des traductions plus précises.</p>
                </div>

                <div className="feature">
                    <div className="feature-icon">🎭</div>
                    <h3>Préservation de l'Intonation</h3>
                    <p>Conservez les nuances émotionnelles de la voix originale.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
