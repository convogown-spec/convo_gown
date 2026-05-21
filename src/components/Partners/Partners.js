import React from 'react';
import './Partners.css';

const partners = [
  { name: 'Cochin University', abbr: 'CUSAT', color: '#1E3A8A' },
  { name: 'SRM University', abbr: 'SRM', color: '#7C3AED' },
  { name: 'Amrita University', abbr: 'AMRITA', color: '#059669' },
  { name: 'Mahatma Gandhi Univ.', abbr: 'MGU', color: '#D97706' },
  { name: 'Calicut University', abbr: 'CALICUT', color: '#DC2626' },
  { name: 'Kannur University', abbr: 'KANNUR', color: '#0891B2' },
  { name: 'Kerala University', abbr: 'KU', color: '#4F46E5' },
  { name: 'Bharathiar Univ.', abbr: 'BU', color: '#BE185D' },
];

const Partners = () => {
  return (
    <section className="partners section" id="partners">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Trusted Partners</span>
          <h2>Our Trusted Partners</h2>
          <p>From small colleges to premier universities — Gownify is the trusted choice across the country.</p>
        </div>

        <div className="partners__grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card" style={{ '--partner-color': partner.color }}>
              <div className="partner-card__logo" style={{ background: `${partner.color}12` }}>
                <span style={{ color: partner.color }}>{partner.abbr}</span>
              </div>
              <p className="partner-card__name">{partner.name}</p>
            </div>
          ))}
        </div>

        {/* Partner CTA removed per request */}
      </div>
    </section>
  );
};

export default Partners;
