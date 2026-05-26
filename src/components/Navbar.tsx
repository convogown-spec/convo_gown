"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onRequestQuote: () => void;
}

export default function Navbar({ onRequestQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        const navbarOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  // Common Nav Rendering logic
  const renderNavLinks = (isMobile: boolean = false) => {
    const linkStyle = isMobile ? styles.drawerLink : styles.navLink;
    
    const items = [
      { id: "services", label: "Services", href: "/#services" },
      { id: "logistics", label: "Logistics", href: "/#logistics" },
      { id: "sizing", label: "Sizing", href: "/#sizing" },
      { id: "about", label: "About", href: "/#about" },
    ];

    return (
      <>
        {isHomePage ? (
          <button onClick={() => { isMobile ? setIsMobileMenuOpen(false) : null; window.scrollTo({ top: 0, behavior: "smooth" }); }} className={linkStyle}>
            Home
          </button>
        ) : (
          <Link href="/" className={linkStyle}>
            Home
          </Link>
        )}

        {items.map((item) => (
          isHomePage ? (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={linkStyle}>
              {item.label}
            </button>
          ) : (
            <Link key={item.id} href={item.href} className={linkStyle}>
              {item.label}
            </Link>
          )
        ))}

        <Link href="/gallery" className={`${linkStyle} ${pathname === "/gallery" ? styles.activeNavLink : ""}`} onClick={() => isMobile ? setIsMobileMenuOpen(false) : null}>
          Gallery
        </Link>

        {isHomePage ? (
          <button onClick={() => scrollToSection("contact")} className={linkStyle}>
            Contact
          </button>
        ) : (
          <Link href="/#contact" className={linkStyle}>
            Contact
          </Link>
        )}
      </>
    );
  };

  return (
    <header className={`${styles.header} ${isScrolled || !isHomePage ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        {isHomePage ? (
          <div className={styles.logoGroup} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className={styles.logoIcon}>
              <Image
                src="/assets/logo.png"
                alt="Convo Gown Badge"
                width={34}
                height={34}
                className={styles.badgeImg}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.convo}>Convo</span>
              <span className={styles.gown}>Gown</span>
            </div>
          </div>
        ) : (
          <Link href="/" className={styles.logoGroup}>
            <div className={styles.logoIcon}>
              <Image
                src="/assets/logo.png"
                alt="Convo Gown Badge"
                width={34}
                height={34}
                className={styles.badgeImg}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.convo}>Convo</span>
              <span className={styles.gown}>Gown</span>
            </div>
          </Link>
        )}

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          {renderNavLinks(false)}
        </nav>

        {/* Action Buttons */}
        <div className={styles.actionGroup}>
          <a
            href="https://wa.me/918891360876?text=Hello%20Convo%20Gown%2C%20I%20am%20contacting%20for%20an%20order%20from%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <Phone size={14} fill="currentColor" className={styles.phoneIcon} />
            <span>WhatsApp</span>
          </a>

          <button onClick={onRequestQuote} className={styles.quoteBtn}>
            <span>Request Quote</span>
            <span className={styles.arrow}>↗</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileMenuToggle} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.drawerLinks}>
          {renderNavLinks(true)}
          
          <div className={styles.drawerActions}>
            <a
              href="https://wa.me/918891360876?text=Hello%20Convo%20Gown%2C%20I%20am%20contacting%20for%20an%20order%20from%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.drawerWhatsapp}
            >
              <Phone size={16} fill="currentColor" />
              <span>Connect on WhatsApp</span>
            </a>
            <button 
              onClick={() => { onRequestQuote(); setIsMobileMenuOpen(false); }} 
              className={styles.drawerQuote}
            >
              <span>Request Quote</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
