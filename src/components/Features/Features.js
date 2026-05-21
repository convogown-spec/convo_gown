import React from 'react';
import './Features.css';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Bulk Gown Rentals',
    desc: 'Order 50 to 5,000+ gowns in a single booking. Custom bulk pricing tailored for every institution size.',
    color: '#1E3A8A',
    bg: 'rgba(30,58,138,0.06)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="m16 8 2 2 4-4"/>
        <path d="M4 19h16"/>
        <path d="M9 3v13"/>
      </svg>
    ),
    title: 'Fast Delivery',
    desc: 'Guaranteed 48-hour delivery window for all confirmed orders. On-time arrival for your graduation day.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.06)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Premium Quality Gowns',
    desc: 'High-grade academic gowns, professionally cleaned and pressed before every delivery.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
        <path d="M10 9H8"/>
      </svg>
    ),
    title: 'Easy Booking Process',
    desc: 'Submit your booking request in under 3 minutes. No complex procedures, no back-and-forth emails.',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.06)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Reliable Service',
    desc: 'Zero failure record across 200+ university partnerships. We have never missed a graduation ceremony.',
    color: '#DC2626',
    bg: 'rgba(220,38,38,0.06)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Dedicated Support',
    desc: 'A dedicated account manager for every university partner. Available 7 days a week, call or chat.',
    color: '#0891B2',
    bg: 'rgba(8,145,178,0.06)',
  },
];

const Features = () => {
  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Why Choose Gownify</span>
          <h2>Everything You Need for a <br/><span className="text-gradient">Seamless Graduation Day</span></h2>
          <p>From bulk ordering to same-day pickup coordination, we've built every feature your institution needs.</p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ '--feature-color': feature.color, '--feature-bg': feature.bg }}
            >
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.desc}</p>
              <div className="feature-card__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
