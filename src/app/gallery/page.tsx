"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import styles from "./page.module.css";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const categories = ["All", "Ceremonies", "Gowns", "Branding"];

  const galleryItems = [
    {
      title: "CUSAT Convocation Day",
      category: "Ceremonies",
      image: "/assets/hero_bg.png",
      desc: "Mass distribution and ceremony grid logistics for Cochin University.",
    },
    {
      title: "Calicut Academic Hooding",
      category: "Ceremonies",
      image: "/assets/hood.png",
      desc: "Discipline-coded academic hoods for Calicut University candidates.",
    },
    {
      title: "Embroidered Satin Stoles",
      category: "Gowns",
      image: "/assets/stole.png",
      desc: "Custom crest embroidery stitched on gold satin stoles.",
    },
    {
      title: "Caps Flying High",
      category: "Branding",
      image: "/assets/cap.png",
      desc: "Zero-failure mortarboards reinforcing the crowning graduation moment.",
    },
    {
      title: "Pre-School Robes",
      category: "Gowns",
      image: "/assets/kid.png",
      desc: "Adorable mini graduation gowns tailor-cut for kindergarten graduates.",
    },
    {
      title: "Stage Branding Setup",
      category: "Branding",
      image: "/assets/branding.jpg",
      desc: "Podiums, banners, and backdrops setup for prestigious events.",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
      },
    },
    exit: { opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.2 } }
  };

  return (
    <div className={styles.appContainer}>
      {/* Premium Sticky Navbar */}
      <Navbar onRequestQuote={handleOpenModal} />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Banner Section */}
        <section className={styles.bannerSection}>
          <div className={styles.bgOverlay} />
          <div className={styles.bannerContainer}>
            <span className={styles.eyebrow}>VISUAL JOURNEY</span>
            <h1 className={styles.title}>
              Convocation <span className={styles.goldItalic}>Gallery</span>
            </h1>
            <p className={styles.subtitle}>
              Showcasing premium convocation ceremonies, customized regalia, and flawless delivery network setups across leading institutions in Kerala.
            </p>
          </div>
        </section>

        {/* Catalog Filter Tabs Section */}
        <section className={styles.gallerySection}>
          <div className={styles.container}>
            {/* Filter Tabs */}
            <div className={styles.tabRow}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Photo Grid */}
            <motion.div
              className={styles.galleryGrid}
              layout
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.title}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={styles.galleryCard}
                    whileHover={{ y: -6 }}
                    onClick={handleOpenModal}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                        className={styles.image}
                      />
                      <span className={styles.categoryTag}>{item.category}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Brand Footer */}
      <Footer onRequestQuote={handleOpenModal} />

      {/* Request custom proposal form overlay */}
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
