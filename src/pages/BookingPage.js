import React, { useState } from 'react';
import './BookingPage.css';

const BookingPage = () => {
  const [form, setForm] = useState({
    collegeName: '',
    contactName: '',
    email: '',
    phone: '',
    eventDate: '',
    quantity: '',
    deliveryAddress: '',
    city: '',
    pincode: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const pricePerGown = form.quantity > 1000 ? 139 : form.quantity > 200 ? 169 : 199;
  const subtotal = form.quantity ? parseInt(form.quantity) * pricePerGown : 0;
  const delivery = subtotal > 0 ? 500 : 0;
  const total = subtotal + delivery;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="booking-success__card">
          <div className="booking-success__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </div>
          <h2>Booking Request Sent!</h2>
          <p>Thank you, <strong>{form.collegeName || 'your institution'}</strong>. Our team will review your request for <strong>{form.quantity} gowns</strong> and get back to you within 24 hours.</p>
          <div className="booking-success__details">
            <div className="booking-success__detail">
              <span>Event Date</span>
              <strong>{form.eventDate || '—'}</strong>
            </div>
            <div className="booking-success__detail">
              <span>Quantity</span>
              <strong>{form.quantity} Gowns</strong>
            </div>
            <div className="booking-success__detail">
              <span>Estimated Total</span>
              <strong>₹{total.toLocaleString()}</strong>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ collegeName:'',contactName:'',email:'',phone:'',eventDate:'',quantity:'',deliveryAddress:'',city:'',pincode:'',notes:'' }); setStep(1); }}>
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Header */}
      <div className="booking-header">
        <div className="booking-header__bg">
          <div className="booking-header__orb booking-header__orb--1"></div>
          <div className="booking-header__orb booking-header__orb--2"></div>
        </div>
        <div className="container booking-header__content">
          <span className="badge" style={{marginBottom:'12px', background:'rgba(251,191,36,0.15)', color:'#FDE68A', border:'1px solid rgba(251,191,36,0.25)'}}>
            🎓 Graduation 2026 Bookings Open
          </span>
          <h1>Book Graduation Gowns</h1>
          <p>Fill in your institution details and we will prepare a custom bulk quote for you within 24 hours.</p>
          {/* Progress */}
          <div className="booking-steps">
            {['Institution Details', 'Event & Quantity', 'Delivery Info'].map((label, i) => (
              <div key={i} className={`booking-step ${step > i+1 ? 'completed' : step === i+1 ? 'active' : ''}`}>
                <div className="booking-step__dot">
                  {step > i+1
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    : <span>{i+1}</span>
                  }
                </div>
                <span className="booking-step__label">{label}</span>
                {i < 2 && <div className="booking-step__line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container booking-layout">
        {/* Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="booking-form__section">
              <h3>Institution Details</h3>
              <p className="booking-form__subtitle">Tell us about your college or university.</p>
              <div className="form-group">
                <label htmlFor="collegeName">College / University Name *</label>
                <input id="collegeName" name="collegeName" type="text" placeholder="e.g. Cochin University of Science and Technology" value={form.collegeName} onChange={handleChange} required/>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Contact Person Name *</label>
                  <input id="contactName" name="contactName" type="text" placeholder="Full name" value={form.contactName} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Official Email Address *</label>
                <input id="email" name="email" type="email" placeholder="your@university.edu" value={form.email} onChange={handleChange} required/>
              </div>
              <button type="button" className="btn btn-primary booking-form__next" onClick={() => setStep(2)}>
                Continue to Event Details
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="booking-form__section">
              <h3>Event & Quantity</h3>
              <p className="booking-form__subtitle">Tell us about your graduation ceremony and how many gowns you need.</p>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventDate">Graduation Event Date *</label>
                  <input id="eventDate" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]}/>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Number of Gowns Required *</label>
                  <input id="quantity" name="quantity" type="number" placeholder="e.g. 500" min="50" value={form.quantity} onChange={handleChange} required/>
                  {form.quantity && parseInt(form.quantity) < 50 && (
                    <span className="form-hint form-hint--error">Minimum order is 50 gowns.</span>
                  )}
                  {form.quantity && parseInt(form.quantity) >= 50 && (
                    <span className="form-hint form-hint--success">
                      {form.quantity > 1000 ? '🏆 Premium pricing applied (₹139/gown)' : form.quantity > 200 ? '⭐ Standard pricing applied (₹169/gown)' : '📦 Basic pricing applied (₹199/gown)'}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="notes">Additional Requirements</label>
                <textarea id="notes" name="notes" rows="4" placeholder="Any special requirements, colour preferences, or additional notes..." value={form.notes} onChange={handleChange}/>
              </div>
              <div className="booking-form__nav">
                <button type="button" className="btn btn-outline-dark" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)} disabled={!form.eventDate || !form.quantity}>
                  Continue to Delivery
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="booking-form__section">
              <h3>Delivery Information</h3>
              <p className="booking-form__subtitle">Where should we deliver the gowns?</p>
              <div className="form-group">
                <label htmlFor="deliveryAddress">Street Address *</label>
                <input id="deliveryAddress" name="deliveryAddress" type="text" placeholder="Building, street, area..." value={form.deliveryAddress} onChange={handleChange} required/>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input id="city" name="city" type="text" placeholder="e.g. Kochi" value={form.city} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">PIN Code *</label>
                  <input id="pincode" name="pincode" type="text" placeholder="e.g. 682022" value={form.pincode} onChange={handleChange} required/>
                </div>
              </div>
              <div className="booking-form__nav">
                <button type="button" className="btn btn-outline-dark" onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                  {loading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Confirm Booking Request
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Summary Sidebar */}
        <aside className="booking-summary">
          <div className="booking-summary__card">
            <h4>Booking Summary</h4>

            <div className="booking-summary__item">
              <span>Institution</span>
              <strong>{form.collegeName || '—'}</strong>
            </div>
            <div className="booking-summary__item">
              <span>Event Date</span>
              <strong>{form.eventDate || '—'}</strong>
            </div>
            <div className="booking-summary__item">
              <span>Gown Quantity</span>
              <strong>{form.quantity ? `${form.quantity} gowns` : '—'}</strong>
            </div>
            <div className="booking-summary__item">
              <span>Price per Gown</span>
              <strong>{form.quantity >= 50 ? `₹${pricePerGown}` : '—'}</strong>
            </div>

            <div className="booking-summary__divider"></div>

            <div className="booking-summary__item">
              <span>Subtotal</span>
              <strong>{subtotal > 0 ? `₹${subtotal.toLocaleString()}` : '₹0'}</strong>
            </div>
            <div className="booking-summary__item">
              <span>Delivery</span>
              <strong>{delivery > 0 ? `₹${delivery}` : '—'}</strong>
            </div>

            <div className="booking-summary__total">
              <span>Estimated Total</span>
              <strong>{total > 0 ? `₹${total.toLocaleString()}` : '₹0'}</strong>
            </div>
            <p className="booking-summary__note">Final price confirmed after team review.</p>
          </div>

          {/* Trust badges */}
          <div className="booking-trust">
            {[
              { icon: '🔒', text: 'Secure & Private', sub: 'Your data is safe' },
              { icon: '📋', text: 'Free Quote', sub: 'No obligation' },
              { icon: '⚡', text: 'Fast Response', sub: 'Within 24 hours' },
            ].map((item, i) => (
              <div key={i} className="booking-trust__item">
                <span className="booking-trust__icon">{item.icon}</span>
                <div>
                  <strong>{item.text}</strong>
                  <span>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingPage;
