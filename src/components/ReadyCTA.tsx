"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MessageSquare } from "lucide-react";
import styles from "./ReadyCTA.module.css";

interface ReadyCTAProps {
  onRequestQuote: () => void;
}

export default function ReadyCTA({ onRequestQuote }: ReadyCTAProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <section className={styles.section}>
      {/* Cinematic Hall Overlay Background */}
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Eyebrow badge */}
          <motion.div className={styles.eyebrow} variants={itemVariants}>
            BEGIN YOUR PARTNERSHIP
          </motion.div>

          {/* Headline */}
          <motion.h2 className={styles.title} variants={itemVariants}>
            Ready to Elevate Your <br />
            <span className={styles.goldItalic}>Next Ceremony?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p className={styles.description} variants={itemVariants}>
            Join Kerala's most trusted convocation partner. Request a quote today
            and experience the Convo Gown difference.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div className={styles.buttonGroup} variants={itemVariants}>
            {/* Custom Premium Request Quote Button */}
            <button className={styles.quoteBtn} onClick={onRequestQuote}>
              <div className={styles.capCircle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.capIcon}
                >
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <span className={styles.quoteText}>REQUEST A QUOTE</span>
              <span className={styles.arrow}>↗</span>
            </button>

            {/* WhatsApp Us Button */}
            <a
              href="https://wa.me/918891360876?text=Hello%20Convo%20Gown%2C%20I%20would%20like%20to%20partner%20for%20our%20university%20convocation."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageSquare size={16} />
              <span>WhatsApp Us</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
