import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const stats = [
  { value: '200+', label: 'Partner Colleges' },
  { value: '50K+', label: 'Gowns Delivered' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '48hr', label: 'Fast Delivery' },
];

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Elements */}
      <div className="hero__bg">
        <div className="hero__bg-orb hero__bg-orb--1"></div>
        <div className="hero__bg-orb hero__bg-orb--2"></div>
        <div className="hero__bg-orb hero__bg-orb--3"></div>
        <div className="hero__bg-grid"></div>
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge reveal delay-1">
            <span className="hero__badge-dot"></span>
            Trusted by 200+ Universities Nationwide
          </div>

          {/* Headline */}
          <h1 className="hero__headline reveal delay-2">
            Bulk Graduation Gown
            <span className="hero__headline-accent"> Rentals Made</span>
            <span className="hero__headline-highlight"> Simple.</span>
          </h1>

          {/* Subheading */}
          <p className="hero__subheading reveal delay-3">
            Premium graduation gown rental solutions for colleges and universities.
            Fast delivery, bulk pricing, and dedicated support — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="hero__ctas reveal delay-4">
            <Link to="/book" className="btn btn-accent btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Book Now
            </Link>
            <a href="#pricing" className="btn btn-outline btn-lg">
              Request Quote
            </a>
          </div>

          {/* Trust Bar */}
          <div className="hero__trust reveal delay-5">
            <span className="hero__trust-item">✓ No hidden fees</span>
            <span className="hero__trust-divider">·</span>
            <span className="hero__trust-item">✓ Bulk discounts available</span>
            <span className="hero__trust-divider">·</span>
            <span className="hero__trust-item">✓ 48-hour delivery guarantee</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero__visual reveal delay-3">
          {/* Gown Illustration Card */}
          <div className="hero__visual-main animate-floatSlow">
            <div className="hero__gown-card">
              <div className="hero__gown-header">
                <div className="hero__gown-header-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="hero__gown-header-title">Graduation 2026</span>
              </div>
              <div className="hero__gown-body">
                {/* SVG Gown Illustration */}
                <div className="hero__gown-illustration">
                  <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cap */}
                    <rect x="60" y="28" width="80" height="8" rx="3" fill="#1E3A8A"/>
                    <rect x="90" y="36" width="20" height="20" rx="2" fill="#1E3A8A"/>
                    <ellipse cx="100" cy="28" rx="50" ry="6" fill="#2563EB"/>
                    <line x1="140" y1="28" x2="155" y2="60" stroke="#FBBF24" strokeWidth="2"/>
                    <circle cx="155" cy="62" r="5" fill="#FBBF24"/>
                    {/* Head */}
                    <circle cx="100" cy="70" r="22" fill="#F5C5A3"/>
                    {/* Gown body */}
                    <path d="M70 90 Q60 110 50 200 L150 200 Q140 110 130 90 Q115 85 100 86 Q85 85 70 90Z" fill="#1E3A8A"/>
                    {/* Gown accent stripe */}
                    <path d="M90 90 L88 200 L92 200 L94 90Z" fill="#2563EB" opacity="0.5"/>
                    <path d="M110 90 L112 200 L108 200 L106 90Z" fill="#2563EB" opacity="0.5"/>
                    {/* Collar */}
                    <path d="M82 92 Q100 105 118 92" stroke="#FBBF24" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    {/* Stole */}
                    <path d="M85 92 L78 180" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round"/>
                    <path d="M115 92 L122 180" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round"/>
                    {/* Hands */}
                    <ellipse cx="58" cy="155" rx="10" ry="14" fill="#1E3A8A"/>
                    <ellipse cx="142" cy="155" rx="10" ry="14" fill="#1E3A8A"/>
                    {/* Diploma */}
                    <rect x="72" y="148" width="56" height="38" rx="4" fill="white" opacity="0.9"/>
                    <rect x="78" y="154" width="44" height="3" rx="1.5" fill="#1E3A8A" opacity="0.3"/>
                    <rect x="78" y="160" width="34" height="3" rx="1.5" fill="#1E3A8A" opacity="0.3"/>
                    <circle cx="100" cy="172" r="6" fill="#FBBF24"/>
                    {/* Feet */}
                    <ellipse cx="83" cy="214" rx="14" ry="7" fill="#111827" opacity="0.7"/>
                    <ellipse cx="117" cy="214" rx="14" ry="7" fill="#111827" opacity="0.7"/>
                  </svg>
                </div>
                <div className="hero__gown-info">
                  <div className="hero__gown-status">
                    <span className="hero__gown-dot"></span>
                    Ready for Delivery
                  </div>
                  <p className="hero__gown-subtitle">Premium Academic Gown</p>
                  <div className="hero__gown-qty">
                    <span>Bulk Order:</span>
                    <strong>500 Units</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stat Cards */}
          <div className="hero__float-card hero__float-card--1 animate-float">
            <div className="hero__float-icon">🎓</div>
            <div>
              <strong>1,200 Gowns</strong>
              <span>Delivered Last Month</span>
            </div>
          </div>

          <div className="hero__float-card hero__float-card--2 animate-float" style={{animationDelay:'1s'}}>
            <div className="hero__float-icon">⭐</div>
            <div>
              <strong>4.9 / 5.0</strong>
              <span>Average Rating</span>
            </div>
          </div>

          <div className="hero__float-card hero__float-card--3 animate-float" style={{animationDelay:'2s'}}>
            <div className="hero__float-icon">🚚</div>
            <div>
              <strong>48-Hour</strong>
              <span>Delivery Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="hero__stats">
        <div className="container">
          <div className="hero__stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="hero__stat-item reveal" style={{animationDelay:`${i*0.1+0.5}s`}}>
                <strong className="hero__stat-value">{s.value}</strong>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
