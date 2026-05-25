"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FileText, ClipboardCheck, Sparkles, Truck, PartyPopper, RefreshCw } from "lucide-react";
import styles from "./Process.module.css";

export default function Process() {
  const steps = [
    {
      num: "01",
      icon: <FileText size={20} />,
      title: "Booking Inquiry",
      desc: "Submit your event details and estimated gown count for a tailored quote.",
    },
    {
      num: "02",
      icon: <ClipboardCheck size={20} />,
      title: "Quote Confirmation",
      desc: "Receive a detailed proposal with pricing, timelines, and customization options.",
    },
    {
      num: "03",
      icon: <Sparkles size={20} />,
      title: "Cleaning & Packing",
      desc: "Every gown is professionally cleaned, pressed, and inspected before packing.",
    },
    {
      num: "04",
      icon: <Truck size={20} />,
      title: "48-Hour Delivery",
      desc: "Guaranteed delivery to your institution within 48 hours of confirmation.",
    },
    {
      num: "05",
      icon: <PartyPopper size={20} />,
      title: "Convocation Ceremony",
      desc: "On-site coordination support ensures a seamless ceremony experience.",
    },
    {
      num: "06",
      icon: <RefreshCw size={20} />,
      title: "Return Coordination",
      desc: "Hassle-free collection and post-event inventory reconciliation.",
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

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 16,
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>OUR PROCESS</div>
          <h2 className={styles.title}>
            From Inquiry to <span className={styles.goldItalic}>Ceremony</span>
          </h2>
          <p className={styles.description}>
            A refined six-step process designed for institutional reliability and
            zero-failure execution.
          </p>
        </div>

        {/* Timeline Grid */}
        <motion.div
          className={styles.timelineGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Faint Connecting Line (Desktop only) */}
          <div className={styles.connectingLine} />

          {steps.map((s, index) => (
            <motion.div
              key={s.title}
              className={styles.stepCard}
              variants={stepVariants}
            >
              {/* Icon Container with Nested Circle Badge */}
              <div className={styles.iconNodeWrapper}>
                <div className={styles.iconBox}>{s.icon}</div>
                {/* Custom Gold Number Badge */}
                <div className={styles.numberBadge}>{s.num}</div>
              </div>

              {/* Text Info */}
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
