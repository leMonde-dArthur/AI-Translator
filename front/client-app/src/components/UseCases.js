import React from 'react';

const UseCases = () => {
    return (
        <section id="use-cases" className="section">
            <h2 className="h2">Cas d'Utilisation</h2>
            <div className="use-cases">
                <div className="use-case">
                    <div className="use-case-icon">🎥</div>
                    <h3>Production Médiatique</h3>
                    <p>Traduisez rapidement des films, séries TV et documentaires pour atteindre un public international.</p>
                </div>
                <div className="use-case">
                    <div className="use-case-icon">🎓</div>
                    <h3>Éducation</h3>
                    <p>Rendez les cours en ligne et les conférences accessibles aux étudiants du monde entier.</p>
                </div>
                <div className="use-case">
                    <div className="use-case-icon">💼</div>
                    <h3>Affaires Internationales</h3>
                    <p>Facilitez la communication lors de réunions multilingues et de conférences internationales.</p>
                </div>
            </div>
        </section>
    );
};

export default UseCases;
