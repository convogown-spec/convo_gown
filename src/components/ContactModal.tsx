"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Phone, Mail } from "lucide-react";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    institution: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    district: "",
    quantity: "",
  });

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const districts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur",
    "Palakkad", "Malappuram", "Kozhikode", "Wayanad",
    "Kannur", "Kasaragod"
  ];

  const sizeOptions = [
    "Kid Size (Ages 4-10)",
    "School Size (Ages 11-17)",
    "University Size (Adult)"
  ];

  const serviceOptions = [
    "Graduation Gowns",
    "Convocation Caps",
    "Academic Hoods",
    "Custom Stoles",
    "Degree Folders",
    "Event Branding"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sizes: selectedSizes,
          services: selectedServices,
        }),
      });

      const result = await response.json();
      setIsSubmitting(false);

      if (response.ok && result.status === "success") {
        setIsSuccess(true);
        
        // Reset form after progress and close
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            institution: "",
            name: "",
            phone: "",
            email: "",
            date: "",
            district: "",
            quantity: "",
          });
          setSelectedSizes([]);
          setSelectedServices([]);
          onClose();
        }, 3000);
      } else {
        alert(result.message || "Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit quote:", error);
      setIsSubmitting(false);
      alert("A connection error occurred. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          {/* Backdrop Blur */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.96, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 25 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            {!isSuccess ? (
              <div className={styles.mainGrid}>
                
                {/* Left Column: Benefits & Direct Links */}
                <div className={styles.leftPanel}>
                  <h2 className={styles.title}>
                    Request a <span className={styles.goldItalic}>Quote</span>
                  </h2>
                  <p className={styles.subtitle}>
                    Tell us about your upcoming convocation ceremony and we'll prepare a tailored proposal within 24 hours.
                  </p>

                  <div className={styles.benefitList}>
                    <div className={styles.benefitItem}>
                      <div className={styles.checkIconBox}>
                        <CheckCircle2 size={16} />
                      </div>
                      <div className={styles.benefitContent}>
                        <strong>Tailored Pricing</strong>
                        <span>Volume-based rates with no hidden fees</span>
                      </div>
                    </div>

                    <div className={styles.benefitItem}>
                      <div className={styles.checkIconBox}>
                        <CheckCircle2 size={16} />
                      </div>
                      <div className={styles.benefitContent}>
                        <strong>24-Hour Response</strong>
                        <span>Detailed proposal delivered within one business day</span>
                      </div>
                    </div>

                    <div className={styles.benefitItem}>
                      <div className={styles.checkIconBox}>
                        <CheckCircle2 size={16} />
                      </div>
                      <div className={styles.benefitContent}>
                        <strong>Free Consultation</strong>
                        <span>Dedicated coordinator assigned to your institution</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Row */}
                  <div className={styles.directContact}>
                    <span className={styles.directLabel}>OR REACH US DIRECTLY</span>
                    <div className={styles.directButtons}>
                      <a
                        href="https://wa.me/918891360876"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.directWhatsapp}
                      >
                        <Phone size={14} fill="currentColor" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="mailto:hello@convogown.com"
                        className={styles.directMail}
                      >
                        <Mail size={14} />
                        <span>hello@convogown.com</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Custom Template Form */}
                <form onSubmit={handleSubmit} className={styles.formPanel}>
                  {/* Institution input */}
                  <div className={styles.formGroup}>
                    <label htmlFor="institution">Institution Name</label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      required
                      placeholder="e.g., Cochin University of Science and Technology"
                      value={formData.institution}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name and Phone Split */}
                  <div className={styles.formRowSplit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Contact Person</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Email address */}
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="admin@university.ac.in"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date and District Split */}
                  <div className={styles.formRowSplit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="date">Ceremony Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="district">District</label>
                      <select
                        id="district"
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select district...</option>
                        {districts.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Gown Quantity */}
                  <div className={styles.formGroup}>
                    <label htmlFor="quantity">Estimated Number of Gowns</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      required
                      min="1"
                      placeholder="e.g., 500"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Sizes pill selector */}
                  <div className={styles.pillGroup}>
                    <label className={styles.pillGroupLabel}>Size Categories Needed</label>
                    <div className={styles.pillsRow}>
                      {sizeOptions.map((size) => {
                        const isSelected = selectedSizes.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            className={`${styles.pill} ${isSelected ? styles.activePill : ""}`}
                            onClick={() => toggleSize(size)}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Services required selector */}
                  <div className={styles.pillGroup} style={{ marginTop: "1rem" }}>
                    <label className={styles.pillGroupLabel}>Services Required</label>
                    <div className={styles.pillsRow}>
                      {serviceOptions.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            className={`${styles.pill} ${isSelected ? styles.activePill : ""}`}
                            onClick={() => toggleService(service)}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.spinner}></span>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                className={styles.successScreen}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.successIcon}>
                  <CheckCircle2 size={64} />
                </div>
                <h3>Quote Request Received!</h3>
                <p>Thank you, <strong>{formData.name}</strong>. Your customized request for <strong>{formData.institution}</strong> in the <strong>{formData.district}</strong> district has been successfully registered. Our coordinator will contact you with a detailed proposal within 24 hours.</p>
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
