"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, MapPin, Truck, Shield, ArrowUpRight } from "lucide-react";
import styles from "./Logistics.module.css";

interface LogisticsProps {
  onRequestQuote: () => void;
}

export default function Logistics({ onRequestQuote }: LogisticsProps) {
  const districts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur",
    "Palakkad", "Malappuram", "Kozhikode", "Wayanad",
    "Kannur", "Kasaragod"
  ];

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <section id="logistics" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>KERALA LOGISTICS</div>
          <h2 className={styles.title}>
            Reaching <span className={styles.goldItalic}>Every</span> Corner of Kerala
          </h2>
          <p className={styles.description}>
            From Kasaragod to Thiruvananthapuram — dedicated coordination, reliable
            logistics, and a zero-failure delivery system.
          </p>
        </div>

        {/* Asymmetrical 2-Column Grid */}
        <div className={styles.grid}>
          {/* Left Column: 14 Districts Checklist + Panoramic Road Card */}
          <div className={styles.leftCol}>
            {/* Districts Card */}
            <div className={styles.districtsCard}>
              <h3 className={styles.cardHeaderTitle}>
                <MapPin size={18} className={styles.pinIcon} />
                <span>14 Districts — Full Coverage</span>
              </h3>
              
              <motion.div
                className={styles.districtsGrid}
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {districts.map((d) => (
                  <motion.div
                    key={d}
                    className={styles.districtItem}
                    variants={itemVariants}
                  >
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>{d}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Panoramic Road Card */}
            <div className={styles.roadCard}>
              <div className={styles.roadImageWrapper}>
                <Image
                  src="/assets/kerala_road.png"
                  alt="Coastal highway pan-Kerala delivery road"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  className={styles.image}
                />
                <div className={styles.roadOverlay}>
                  <div className={styles.overlayLeft}>
                    <span className={styles.overlayTextWhite}>Pan-Kerala Delivery</span>
                    <span className={styles.overlayTextWhite}>Network</span>
                  </div>
                  <div className={styles.overlayRight}>
                    <span className={styles.overlayTextGold}>48hr</span>
                    <span className={styles.overlayTextGold}>Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fleet Metrics Stack + District Quote Action */}
          <div className={styles.rightCol}>
            <div className={styles.metricsStack}>
              {/* Card 1: 14 Districts Covered */}
              <div className={styles.metricItemCard}>
                <div className={styles.metricIconBox}>
                  <MapPin size={22} />
                </div>
                <div className={styles.metricText}>
                  <h4>14 Districts Covered</h4>
                  <p>Complete Kerala-wide logistics network ensuring every institution is within reach.</p>
                </div>
              </div>

              {/* Card 2: Dedicated Fleet */}
              <div className={styles.metricItemCard}>
                <div className={styles.metricIconBox}>
                  <Truck size={22} />
                </div>
                <div className={styles.metricText}>
                  <h4>Dedicated Fleet</h4>
                  <p>Our own temperature-controlled transport ensures pristine condition on arrival.</p>
                </div>
              </div>

              {/* Card 3: Zero-Failure System */}
              <div className={styles.metricItemCard}>
                <div className={styles.metricIconBox}>
                  <Shield size={22} />
                </div>
                <div className={styles.metricText}>
                  <h4>Zero-Failure System</h4>
                  <p>Triple-check inventory protocol with real-time tracking and backup stock.</p>
                </div>
              </div>
            </div>

            {/* Request District Specific Quote Action Button */}
            <motion.button
              onClick={onRequestQuote}
              className={styles.districtBtn}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <span>Request District-Specific Quote</span>
              <ArrowUpRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
