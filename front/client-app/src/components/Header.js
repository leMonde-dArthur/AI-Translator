import React, { useEffect, useState } from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { useMediaQuery } from 'react-responsive';


const Header = () => {
    const [showMenu, setShowMenu] = useState(true);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (isMobile) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }, [isMobile]);

    return (
        <header className="header">
            <nav className="nav">
                <div className="logo">Sumfy.</div>

                <>
                    {isMobile &&
                        <div className="mobile-menu-toggle" onClick={toggleMenu}>
                            <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}`}></i>
                        </div>}
                    {(showMenu || !isMobile) &&
                        <div className={`nav-links ${showMenu ? 'mobile-menu' : ''}`}>
                            <Link smooth to="/" className="nav-links-a" onClick={toggleMenu}>
                                Convertir
                            </Link>
                            <Link smooth to="/#features" className="nav-links-a" onClick={toggleMenu}>
                                Fonctionnalités
                            </Link>
                            <Link smooth to="/contact" className="nav-links-a" onClick={toggleMenu}>
                                Contact
                            </Link>
                        </div>}
                </>

            </nav>
        </header>
    );
};

export default Header;
