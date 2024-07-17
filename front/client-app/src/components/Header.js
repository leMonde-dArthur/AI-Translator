import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <div className="logo">Sumfy.</div>
                <div className="nav-links">
                    <Link smooth to="/" className="nav-links-a">
                        Convertir
                    </Link>
                    <Link smooth to="/#features" className="nav-links-a">
                        Fonctionnalités
                    </Link>
                    <Link smooth to="/contact" className="nav-links-a">
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
