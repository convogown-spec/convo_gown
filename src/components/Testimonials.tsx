"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sabeena O M",
      role: "Convocation Convener",
      institution: "MBITS Kothamangalam",
      quote: "Convo Gown delivered custom gowns precisely to our regulated discipline specifications. Their 48-hour coordination and on-site distribution desk made the graduation ceremony absolutely seamless.",
      stars: 5,
      avatar: "/assets/testimonials/sabeena.png",
    },
    {
      name: "Dr. P A Abdul Samad",
      role: "Professor",
      institution: "GEC Thrissur",
      quote: "The quality of the embroidery stoles and velvet hood linings was outstanding. Every student remarked on the premium weight and feel. Zero inventory errors and zero delays.",
      stars: 5,
      avatar: "/assets/testimonials/abdul.png",
    },
    {
      name: "Josmi Jose",
      role: "Teacher",
      institution: "SH of Mary's CGHS, Kandassamkadavu",
      quote: "The kid and school sized gowns were absolutely perfect and durable for our secondary students. Excellent delivery service and perfect fits for active graduation ceremony days.",
      stars: 5,
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>INSTITUTIONAL VOICES</div>
          <h2 className={styles.title}>
            Trusted by <span className={styles.goldItalic}>Leaders</span> in Academia
          </h2>
          <p className={styles.description}>
            Hear from the registrars, deans, and coordinators who trust Convo Gown
            with their most important ceremonies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              {/* Custom Quote Icon decoration */}
              <div className={styles.quoteIconBox}>
                <Quote size={24} className={styles.quoteIcon} />
              </div>

              {/* Stars Row */}
              <div className={styles.starsRow}>
                {[...Array(r.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="#c5a870" color="#c5a870" />
                ))}
              </div>

              {/* Quote Content */}
              <blockquote className={styles.quoteText}>
                "{r.quote}"
              </blockquote>

              {/* Profile Details */}
              <div className={styles.profile}>
                <div className={styles.avatar}>
                  {r.avatar ? (
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className={styles.avatarImg}
                    />
                  ) : (
                    r.name.charAt(0)
                  )}
                </div>
                <div className={styles.info}>
                  <cite className={styles.name}>{r.name}</cite>
                  <span className={styles.role}>
                    {r.role}, <span className={styles.institution}>{r.institution}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
