import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Dr. Priya Nair',
    role: 'Academic Registrar',
    college: 'Cochin University of Science and Technology',
    avatar: 'PN',
    avatarColor: '#1E3A8A',
    rating: 5,
    text: 'Gownify handled our batch of 800 gowns flawlessly. Delivered two days before our ceremony — pressed, packed and ready. The team is incredibly professional.',
  },
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Dean of Students',
    college: 'SRM Institute of Science and Technology',
    avatar: 'RK',
    avatarColor: '#7C3AED',
    rating: 5,
    text: 'We have been using Gownify for three consecutive graduation seasons. The reliability and quality are unmatched. Our students always look impeccable.',
  },
  {
    name: 'Ms. Anita George',
    role: 'Graduation Coordinator',
    college: 'Amrita School of Engineering',
    avatar: 'AG',
    avatarColor: '#059669',
    rating: 5,
    text: 'The booking portal is intuitive and the bulk pricing is very competitive. Gownify saves us weeks of logistics every year. Highly recommended.',
  },
  {
    name: 'Mr. Sanjay Pillai',
    role: 'Event Manager',
    college: 'Mahatma Gandhi University',
    avatar: 'SP',
    avatarColor: '#D97706',
    rating: 5,
    text: 'For our university of 1,200 graduates, Gownify delivered everything on time without a single issue. Their support team is always available.',
  },
];

const StarRating = ({ count }) => (
  <div className="star-rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" fill={i < count ? '#FBBF24' : '#E5E7EB'} className="star">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">What Universities Say</span>
          <h2>Trusted by <span className="text-gradient">Academic Institutions</span> Nationwide</h2>
          <p>Hear from the coordinators and administrators who rely on Gownify every graduation season.</p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-card__top">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div>
                  <strong className="testimonial-card__name">{t.name}</strong>
                  <span className="testimonial-card__role">{t.role}</span>
                  <span className="testimonial-card__college">{t.college}</span>
                </div>
              </div>

              <StarRating count={t.rating} />

              <blockquote className="testimonial-card__text">
                "{t.text}"
              </blockquote>

              <div className="testimonial-card__quote-mark">❝</div>
            </div>
          ))}
        </div>

        {/* Overall Rating Bar */}
        <div className="testimonials__overall">
          <div className="testimonials__overall-rating">
            <span className="testimonials__overall-score">4.9</span>
            <div>
              <StarRating count={5} />
              <p>Based on 500+ reviews from partner universities</p>
            </div>
          </div>
          <div className="testimonials__overall-badges">
            <div className="testimonials__badge">🏆 Top Rated 2025</div>
            <div className="testimonials__badge">🎓 200+ College Partners</div>
            <div className="testimonials__badge">⭐ 99% Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
