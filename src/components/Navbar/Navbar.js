import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__left">☎ 8891360876</div>
          <div className="topbar__right"><a href="#partners">Our Trusted Partners</a></div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${!isHome ? 'navbar--solid' : ''}`}>
        <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="#1E3A8A"/>
              <path d="M20 8L32 14V18C32 25.5 27 32.2 20 34C13 32.2 8 25.5 8 18V14L20 8Z" fill="#FBBF24"/>
              <path d="M16 20L19 23L25 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="navbar__logo-text">Gownify</span>
        </Link>

        {/* Desktop Nav Links removed per request (Features, How It Works, Pricing, Partners, Dashboard) */}

        {/* CTA */}
        <div className="navbar__cta">
          <Link to="/book" className="btn btn-accent navbar__btn">
            Book Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className="navbar__mobile-phone">☎ 8891360876</li>
          <li>
            <Link to="/book" className="btn btn-primary" style={{width:'100%', marginTop:'8px'}}>
              Book Gowns Now
            </Link>
          </li>
        </ul>
      </div>
      </nav>
    </>
  );
};

export default Navbar;
