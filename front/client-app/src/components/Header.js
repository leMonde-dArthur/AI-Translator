import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <div className="logo">Sumfy.</div>
                <div className="nav-links">
                    <a href="#use-cases" className="nav-links-a">
                        Convertir
                    </a>
                    <a href="#features" className="nav-links-a">
                        Fonctionnalités
                    </a>
                    <a href="#footer" className="nav-links-a">
                        Contact
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
