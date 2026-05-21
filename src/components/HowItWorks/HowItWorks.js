import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Submit Booking Request',
    desc: 'Fill out our simple booking form with your event date, number of students, and college details. Takes less than 3 minutes.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="4" width="32" height="40" rx="4" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="2"/>
        <rect x="14" y="12" width="20" height="3" rx="1.5" fill="#BFDBFE"/>
        <rect x="14" y="18" width="16" height="3" rx="1.5" fill="#BFDBFE"/>
        <rect x="14" y="24" width="12" height="3" rx="1.5" fill="#BFDBFE"/>
        <circle cx="34" cy="34" r="10" fill="#1E3A8A"/>
        <path d="M30 34l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Confirm Quantity & Dates',
    desc: 'Our team reviews your request and confirms the exact gown count, delivery schedule, and pickup arrangements within 24 hours.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="34" rx="4" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="2"/>
        <path d="M6 18h36" stroke="#1E3A8A" strokeWidth="2"/>
        <rect x="15" y="4" width="4" height="10" rx="2" fill="#FBBF24"/>
        <rect x="29" y="4" width="4" height="10" rx="2" fill="#FBBF24"/>
        <rect x="12" y="24" width="6" height="6" rx="1" fill="#BFDBFE"/>
        <rect x="21" y="24" width="6" height="6" rx="1" fill="#BFDBFE"/>
        <rect x="30" y="24" width="6" height="6" rx="1" fill="#1E3A8A"/>
        <rect x="12" y="33" width="6" height="6" rx="1" fill="#BFDBFE"/>
        <rect x="21" y="33" width="6" height="6" rx="1" fill="#BFDBFE"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive Gowns on Graduation Day',
    desc: 'Gowns are delivered fresh, pressed, and organized to your campus address — right on time for the big ceremony.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="22" width="32" height="20" rx="3" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="2"/>
        <path d="M4 30h32" stroke="#1E3A8A" strokeWidth="2"/>
        <circle cx="14" cy="38" r="4" fill="white" stroke="#1E3A8A" strokeWidth="2"/>
        <circle cx="28" cy="38" r="4" fill="white" stroke="#1E3A8A" strokeWidth="2"/>
        <path d="M36 26l6-6" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36 30h8" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="24" cy="10" r="7" fill="#FBBF24"/>
        <path d="M21 10l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="hiw__bg-accent"></div>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Simple Process</span>
          <h2>From Request to <span className="text-gradient">Graduation Day</span> in 3 Steps</h2>
          <p>We've simplified the entire rental process so your team can focus on what matters most — a perfect ceremony.</p>
        </div>

        <div className="hiw__steps">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="hiw__step">
                <div className="hiw__step-icon">
                  {step.icon}
                </div>
                <div className="hiw__step-number">{step.number}</div>
                <h3 className="hiw__step-title">{step.title}</h3>
                <p className="hiw__step-desc">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hiw__connector">
                  <div className="hiw__connector-line"></div>
                  <svg viewBox="0 0 24 24" fill="none" className="hiw__connector-arrow">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="hiw__cta">
          <a href="/book" className="btn btn-primary btn-lg">
            Start Your Booking
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p>No commitment required. Free quote within 24 hours.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
