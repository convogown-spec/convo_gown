"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./Sizing.module.css";

interface SizingProps {
  onRequestQuote: () => void;
}

export default function Sizing({ onRequestQuote }: SizingProps) {
  return (
    <section id="sizing" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Perfect Fit for <span className={styles.goldItalic}>Every</span> Stage
          </h2>
          <p className={styles.description}>
            Standardized measurements and bespoke fitting options to ensure every graduate looks clean and professional.
          </p>
        </div>

        {/* Asymmetrical Sizing Grid */}
        <div className={styles.grid}>
          {/* Left: Tall Portrait Model Gown Card */}
          <motion.div
            className={styles.portraitCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            onClick={onRequestQuote}
          >
            <div className={styles.portraitImageWrapper}>
              <Image
                src="/assets/model.jpg"
                alt="Adult Graduation Gown Model"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={styles.image}
                priority
              />
              <div className={styles.portraitOverlay}>
                <span className={styles.ageEyebrow} style={{ color: "#c5a870" }}>ADULT FIT</span>
                <h3 className={styles.portraitTitle}>University Size</h3>
                <p className={styles.portraitDesc}>
                  Full academic regalia with precise sizing from XS to 5XL for all body types.
                </p>
                <div className={styles.exploreLink} style={{ color: "#c5a870", marginTop: "8px" }}>
                  <span>Explore Sizes</span>
                  <ArrowUpRight size={14} className={styles.linkArrow} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stack of Two Horizontal Sizing Cards */}
          <div className={styles.stack}>
            {/* Card 1: Kid Size */}
            <motion.div
              className={styles.horizontalCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 75, damping: 16, delay: 0.1 }}
              onClick={onRequestQuote}
            >
              <div className={styles.horizontalImageWrapper}>
                <Image
                  src="/assets/kid.png"
                  alt="Kid Sized Graduation Gown"
                  fill
                  sizes="(max-width: 600px) 100px, 150px"
                  className={styles.image}
                />
              </div>
              <div className={styles.horizontalInfo}>
                <span className={styles.ageEyebrow}>AGES 4–10</span>
                <h3 className={styles.sizeTitle}>Kid Size</h3>
                <p className={styles.sizeDesc}>
                  Adorable mini gowns and caps for pre-school graduations and
                  kindergarten ceremonies.
                </p>
                <div className={styles.exploreLink}>
                  <span>Explore Sizes</span>
                  <ArrowUpRight size={14} className={styles.linkArrow} />
                </div>
              </div>
            </motion.div>

            {/* Card 2: School Size */}
            <motion.div
              className={styles.horizontalCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 75, damping: 16, delay: 0.2 }}
              onClick={onRequestQuote}
            >
              <div className={styles.horizontalImageWrapper}>
                <Image
                  src="/assets/school.png"
                  alt="School Sized Graduation Gown"
                  fill
                  sizes="(max-width: 600px) 100px, 150px"
                  className={styles.image}
                />
              </div>
              <div className={styles.horizontalInfo}>
                <span className={styles.ageEyebrow}>AGES 11–17</span>
                <h3 className={styles.sizeTitle}>School Size</h3>
                <p className={styles.sizeDesc}>
                  Standardized secondary school gowns with durable fabric for active
                  ceremony days.
                </p>
                <div className={styles.exploreLink}>
                  <span>Explore Sizes</span>
                  <ArrowUpRight size={14} className={styles.linkArrow} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
