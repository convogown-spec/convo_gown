import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section section">
      <div className="container">
        <div className="cta-section__inner">
          {/* Bg orbs */}
          <div className="cta-section__orb cta-section__orb--1"></div>
          <div className="cta-section__orb cta-section__orb--2"></div>

          <div className="cta-section__content">
            <span className="badge badge-accent" style={{marginBottom:'20px', display:'inline-flex'}}>🎓 Graduation Season 2026</span>
            <h2 className="cta-section__title">
              Ready to Book Gowns for Your <br/>
              <span className="cta-section__title-highlight">Next Graduation?</span>
            </h2>
            <p className="cta-section__subtitle">
              Join 200+ colleges and universities that trust Gownify for seamless bulk graduation gown rentals. Get a free quote today.
            </p>
            <div className="cta-section__actions">
              <Link to="/book" className="btn btn-accent btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Book Your Gowns Now
              </Link>
              <a href="tel:+918001234567" className="btn btn-outline btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l1.04-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call +91 800 123 4567
              </a>
            </div>
            <p className="cta-section__note">
              ✓ No upfront payment &nbsp;·&nbsp; ✓ Free quote in 24 hours &nbsp;·&nbsp; ✓ Cancel anytime before confirmation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
