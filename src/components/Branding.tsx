"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, PenTool, Palette, Award, Building, GraduationCap } from "lucide-react";
import styles from "./Branding.module.css";

interface BrandingProps {
  onRequestQuote: () => void;
}

export default function Branding({ onRequestQuote }: BrandingProps) {
  const features = [
    {
      icon: <PenTool size={20} />,
      title: "Embroidered Stoles",
      desc: "Personalized names, degrees, and dates stitched in premium gold or silver thread.",
    },
    {
      icon: <Palette size={20} />,
      title: "Satin Trims",
      desc: "Silk satin edge trims in institutional colors for a refined ceremonial finish.",
    },
    {
      icon: <Building size={20} />,
      title: "Institutional Branding",
      desc: "University crests, logos, and mottos integrated seamlessly into gown designs.",
    },
    {
      icon: <Award size={20} />,
      title: "Degree Hood Colors",
      desc: "Standardized academic hood colors per discipline — velvet-lined and regulation-compliant.",
    },
    {
      icon: <GraduationCap size={20} />,
      title: "Logo Embroidery",
      desc: "Precision machine and hand-embroidery for caps, stoles, and certificate holders.",
    },
  ];

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column: Image with Floating Card */}
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/embroidery.png"
              alt="Custom Embroidery Regalia Detail"
              fill
              sizes="(max-width: 960px) 100vw, 45vw"
              className={styles.image}
              priority
            />
          </div>
        </motion.div>

        {/* Right Column: Title and Custom Branding Features */}
        <div className={styles.contentCol}>
          <h2 className={styles.title}>
            Custom Branding for <span className={styles.goldItalic}>Every</span> Institution
          </h2>
          <p className={styles.description}>
            Transform standard regalia into a powerful statement of your institution's
            prestige with bespoke embroidery, colors, and ceremonial details.
          </p>

          <motion.div
            className={styles.featureList}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                className={styles.featureItem}
                variants={itemVariants}
              >
                <div className={styles.iconBox}>{f.icon}</div>
                <div className={styles.featureInfo}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Button */}
          <motion.button
            onClick={onRequestQuote}
            className={styles.ctaBtn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <span>Customize Your Ceremony</span>
            <span className={styles.arrow}>↗</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
