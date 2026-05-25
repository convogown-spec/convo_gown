"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Branding from "@/components/Branding";
import Process from "@/components/Process";
import Logistics from "@/components/Logistics";
import Services from "@/components/Services";
import Sizing from "@/components/Sizing";
import Testimonials from "@/components/Testimonials";
import ReadyCTA from "@/components/ReadyCTA";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleExploreServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const navbarOffset = 90;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={styles.appContainer}>
      {/* Premium Glass Sticky Navbar */}
      <Navbar onRequestQuote={handleOpenModal} />

      {/* Main Landing Sections */}
      <main className={styles.mainContent}>
        {/* Cinematic Hero */}
        <Hero
          onRequestQuote={handleOpenModal}
          onExploreServices={handleExploreServices}
        />

        {/* Product Catalog Grid */}
        <Services onRequestQuote={handleOpenModal} />

        {/* Asymmetrical sizing panels */}
        <Sizing onRequestQuote={handleOpenModal} />

        {/* Custom Branding details */}
        <Branding onRequestQuote={handleOpenModal} />

        {/* Inquiry-to-Ceremony Timeline Process */}
        <Process />

        {/* Pan-Kerala Logistics network */}
        <Logistics onRequestQuote={handleOpenModal} />

        {/* Testimonials section */}
        <Testimonials />

        {/* Final Conversation Ready CTA stage */}
        <ReadyCTA onRequestQuote={handleOpenModal} />
      </main>

      {/* Global Brand Footer */}
      <Footer onRequestQuote={handleOpenModal} />

      {/* Interactive Request Quote Form Modal */}
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
