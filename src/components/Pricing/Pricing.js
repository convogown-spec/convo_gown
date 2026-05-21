import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const plans = [
  {
    name: 'Basic',
    badge: null,
    price: '₹199',
    unit: '/gown',
    minQty: '50–200 gowns',
    color: '#6B7280',
    features: [
      'Standard academic gowns',
      'Delivery within 72 hours',
      'Email support',
      'Basic booking portal',
      'Standard cleaning included',
      '—',
    ],
  },
  {
    name: 'Standard',
    badge: 'Most Popular',
    price: '₹169',
    unit: '/gown',
    minQty: '201–1,000 gowns',
    color: '#1E3A8A',
    featured: true,
    features: [
      'Premium academic gowns',
      'Guaranteed 48-hour delivery',
      'Priority phone + email support',
      'Advanced booking management',
      'Professional pressing included',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Premium',
    badge: 'Best Value',
    price: '₹139',
    unit: '/gown',
    minQty: '1,000+ gowns',
    color: '#FBBF24',
    features: [
      'Luxury academic gown collection',
      'Same-day express delivery',
      '24/7 VIP support hotline',
      'Full booking dashboard + analytics',
      'Premium dry-cleaning included',
      'Dedicated event coordinator',
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('per-event');

  return (
    <section className="pricing section" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Bulk Pricing</span>
          <h2>Transparent <span className="text-gradient">Bulk Pricing</span> for Every Institution</h2>
          <p>Simple per-gown pricing with volume discounts. The more you order, the more you save.</p>
        </div>

        {/* Toggle */}
        <div className="pricing__toggle">
          {['per-event', 'annual-contract'].map(type => (
            <button
              key={type}
              className={`pricing__toggle-btn ${billingCycle === type ? 'active' : ''}`}
              onClick={() => setBillingCycle(type)}
            >
              {type === 'per-event' ? 'Per Event' : 'Annual Contract'}
              {type === 'annual-contract' && <span className="pricing__save-badge">Save 15%</span>}
            </button>
          ))}
        </div>

        <div className="pricing__grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}
              style={{ '--plan-color': plan.color }}
            >
              {plan.badge && (
                <div className="pricing-card__badge">{plan.badge}</div>
              )}

              <div className="pricing-card__header">
                <h3 className="pricing-card__name">{plan.name}</h3>
                <p className="pricing-card__qty">{plan.minQty}</p>
              </div>

              <div className="pricing-card__price">
                <span className="pricing-card__amount">
                  {billingCycle === 'annual-contract'
                    ? `₹${Math.round(parseInt(plan.price.replace('₹', '')) * 0.85)}`
                    : plan.price}
                </span>
                <span className="pricing-card__unit">{plan.unit}</span>
              </div>

              <ul className="pricing-card__features">
                {plan.features.map((f, i) => (
                  <li key={i} className={`pricing-card__feature ${f === '—' ? 'pricing-card__feature--disabled' : ''}`}>
                    <span className="pricing-card__check">
                      {f === '—'
                        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
                        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      }
                    </span>
                    {f === '—' ? 'Not included' : f}
                  </li>
                ))}
              </ul>

              <Link
                to="/book"
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline-dark'} pricing-card__cta`}
              >
                {plan.featured ? 'Get Started' : 'Choose Plan'}
              </Link>
            </div>
          ))}
        </div>

        <div className="pricing__note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          All plans include pick-up logistics coordination. Custom enterprise quotes available for 5,000+ gowns.
          <a href="#!"> Contact us →</a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
