"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import styles from "./page.module.css";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<Array<{ title: string; category: string; image: string }>>([
    {
      title: "CUSAT Convocation Day",
      category: "Happy Customers",
      image: "/assets/gallery/Happy Customers/hero_bg.png",
    },
    {
      title: "Calicut Academic Hooding",
      category: "Our Assets",
      image: "/assets/gallery/Our Assets/hood.png",
    },
    {
      title: "Embroidered Satin Stoles",
      category: "Our Assets",
      image: "/assets/gallery/Our Assets/stole.png",
    },
    {
      title: "Caps Flying High",
      category: "Our Assets",
      image: "/assets/gallery/Our Assets/cap.png",
    },
    {
      title: "Pre-School Robes",
      category: "Our Assets",
      image: "/assets/gallery/Our Assets/kid.png",
    },
    {
      title: "Stage Branding Setup",
      category: "Our Assets",
      image: "/assets/gallery/Our Assets/branding.jpg",
    },
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const categories = ["All", "Our Assets", "Happy Customers"];

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/gallery-photos");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setGalleryItems(shuffleArray(data));
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic gallery photos, falling back to defaults.", err);
      }
      // Shuffle default fallback items on mount if dynamic fetch fails
      setGalleryItems((prev) => shuffleArray(prev));
    }
    fetchPhotos();
  }, []);

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
