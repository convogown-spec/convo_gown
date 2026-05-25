"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

interface HeroProps {
  onRequestQuote: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onRequestQuote, onExploreServices }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className={styles.heroSection}>
      {/* Background Graphic */}
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Label */}
          <motion.div className={styles.eyebrow} variants={itemVariants}>
            <Sparkles size={14} className={styles.eyebrowIcon} />
            <span>KERALA'S TRUSTED CONVOCATION PARTNER</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            Elevating Graduation <br />
            Ceremonies Across <br />
            <span className={styles.goldItalic}>Kerala</span>
          </motion.h1>

          {/* Description */}
          <motion.p className={styles.description} variants={itemVariants}>
            Premium graduation gowns, institutional convocation solutions, custom
            ceremony essentials, and Kerala-wide logistics.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div className={styles.buttonGroup} variants={itemVariants}>
            {/* Custom Premium Request Quote Button */}
            <button className={styles.bulkQuoteBtn} onClick={onRequestQuote}>
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
              <span className={styles.bulkQuoteText}>REQUEST BULK QUOTE</span>
              <span className={styles.bulkArrow}>↗</span>
            </button>

            {/* Explore Button */}
            <button className={styles.exploreBtn} onClick={onExploreServices}>
              <span>Explore Services</span>
              <span className={styles.exploreArrow}>↗</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className={styles.mouse}>
          <motion.div
            className={styles.wheel}
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
