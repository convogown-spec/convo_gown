import React from 'react';
import './SampleGowns.css';

const images = [
  'https://via.placeholder.com/400x600?text=Gown+1',
  'https://via.placeholder.com/400x600?text=Gown+2',
  'https://via.placeholder.com/400x600?text=Gown+3'
];

const SampleGowns = () => {
  return (
    <section className="sample-gowns section" id="sample-gowns">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Sample Gowns</span>
          <h2>See Our Gowns</h2>
          <p>Browse a few sample gowns to get a feel for style and fit.</p>
        </div>

        <div className="sample-gowns__grid">
          {images.map((src, i) => (
            <div key={i} className="sample-gowns__item">
              <img src={src} alt={`Gown ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SampleGowns;
