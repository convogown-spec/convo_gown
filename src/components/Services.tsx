"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./Services.module.css";

interface ServicesProps {
  onRequestQuote: () => void;
}

export default function Services({ onRequestQuote }: ServicesProps) {
  const products = [
    {
      title: "Graduation Gowns",
      description: "Premium matte-finish gowns in university-regulated colors and cuts.",
      image: "/assets/gown.png",
    },
    {
      title: "Convocation Caps",
      description: "Mortarboards with reinforced bands and custom tassel colors.",
      image: "/assets/cap.png",
    },
    {
      title: "Academic Hoods",
      description: "Ceremonial hoods with velvet-lined discipline color coding.",
      image: "/assets/hood.png",
    },
    {
      title: "Custom Stoles",
      description: "Embroidered satin stoles with institutional crests and names.",
      image: "/assets/stole.png",
    },
    {
      title: "Degree Folders",
      description: "Leatherette and leather degree certificate presentation folders.",
      image: "/assets/folder.png",
    },
    {
      title: "Event Branding",
      description: "Stage banners, podium backdrops, and directional signage.",
      image: "/assets/branding.jpg",
    },
    {
      title: "Keepsake Accessories",
      description: "Medallions, lapel pins, and commemorative gift sets.",
      image: "/assets/accessory.png",
    },
    {
      title: "Certificate Holders",
      description: "Elegant holders with foil embossing and ribbon closures.",
      image: "/assets/holder.jpg",
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
        stiffness: 85,
        damping: 18,
      },
    },
  };

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Everything for Your <span className={styles.goldItalic}>Convocation</span>
          </h2>
          <p className={styles.description}>
            From premium gowns to full ceremony branding — a complete convocation
            solution for institutions across Kerala.
          </p>
        </div>

        {/* Product Catalog Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((p) => (
            <motion.div
              key={p.title}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              onClick={onRequestQuote}
            >
              {/* Product Image Container */}
              <div className={styles.imageWrapper}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                  className={styles.image}
                  priority={p.title === "Graduation Gowns" || p.title === "Convocation Caps"}
                />
              </div>

              {/* Product Info */}
              <div className={styles.info}>
                <div className={styles.titleRow}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <div className={styles.cardArrow}>
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                  </div>
                </div>
                <p className={styles.cardDesc}>{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
