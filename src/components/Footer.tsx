"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import styles from "./Footer.module.css";

interface FooterProps {
  onRequestQuote: () => void;
}

export default function Footer({ onRequestQuote }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (id: string) => {
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

  const renderFooterLinks = () => {
    const items = [
      { id: "services", label: "Services", href: "/#services" },
      { id: "logistics", label: "Logistics", href: "/#logistics" },
      { id: "sizing", label: "Sizing", href: "/#sizing" },
    ];

    return (
      <ul className={styles.linksList}>
        <li>
          {isHomePage ? (
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={styles.footerBtn}>
              Home
            </button>
          ) : (
            <Link href="/" className={styles.footerBtn}>
              Home
            </Link>
          )}
        </li>
        
        {items.map((item) => (
          <li key={item.id}>
            {isHomePage ? (
              <button onClick={() => scrollToSection(item.id)} className={styles.footerBtn}>
                {item.label}
              </button>
            ) : (
              <Link href={item.href} className={styles.footerBtn}>
                {item.label}
              </Link>
            )}
          </li>
        ))}

        <li>
          <Link href="/gallery" className={styles.footerBtn}>
            Gallery
          </Link>
        </li>

        <li>
          <button onClick={onRequestQuote} className={styles.footerBtn}>
            Request Quote
          </button>
        </li>
      </ul>
    );
  };

  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.container}>
        {/* Main Columns Grid */}
        <div className={styles.mainGrid}>
          {/* Column 1: Brand Info */}
          <div className={styles.brandCol}>
            {isHomePage ? (
              <div className={styles.logoGroup} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <div className={styles.logoIcon}>
                  <Image
                    src="/assets/logo_v2.png"
                    alt="Convo Gown Logo Badge"
                    width={56}
                    height={56}
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
                    src="/assets/logo_v2.png"
                    alt="Convo Gown Logo Badge"
                    width={56}
                    height={56}
                    className={styles.badgeImg}
                  />
                </div>
                <div className={styles.logoText}>
                  <span className={styles.convo}>Convo</span>
                  <span className={styles.gown}>Gown</span>
                </div>
              </Link>
            )}
            <p className={styles.brandDesc}>
              Kerala's trusted convocation partner, providing premium graduation
              gowns, academic hoods, stoles, and complete ceremony branding.
            </p>
            <div className={styles.socialGroup}>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            {renderFooterLinks()}
          </div>

          {/* Column 3: Catalog */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Catalog</h4>
            <ul className={styles.linksList}>
              <li>
                {isHomePage ? (
                  <button onClick={() => scrollToSection("services")} className={styles.footerBtn}>Graduation Gowns</button>
                ) : (
                  <Link href="/#services" className={styles.footerBtn}>Graduation Gowns</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <button onClick={() => scrollToSection("services")} className={styles.footerBtn}>Convocation Caps</button>
                ) : (
                  <Link href="/#services" className={styles.footerBtn}>Convocation Caps</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <button onClick={() => scrollToSection("services")} className={styles.footerBtn}>Academic Hoods</button>
                ) : (
                  <Link href="/#services" className={styles.footerBtn}>Academic Hoods</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <button onClick={() => scrollToSection("services")} className={styles.footerBtn}>Custom Stoles</button>
                ) : (
                  <Link href="/#services" className={styles.footerBtn}>Custom Stoles</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <button onClick={() => scrollToSection("services")} className={styles.footerBtn}>Degree Folders</button>
                ) : (
                  <Link href="/#services" className={styles.footerBtn}>Degree Folders</Link>
                )}
              </li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className={styles.contactCol} id="contact">
            <h4 className={styles.colTitle}>Kerala Coordination Desk</h4>
            <ul className={styles.contactList}>
              <li>
                <Phone size={16} className={styles.contactIcon} />
                <a href="tel:+918891360876">+91 88913 60876</a>
              </li>
              <li>
                <MessageSquare size={16} className={styles.contactIcon} />
                <a href="https://wa.me/918891360876?text=Hello%20Convo%20Gown%2C%20I%20am%20contacting%20for%20an%20order%20from%20your%20website.">WhatsApp Chat Desk</a>
              </li>
              <li>
                <Mail size={16} className={styles.contactIcon} />
                <a href="mailto:convogown@gmail.com">convogown@gmail.com</a>
              </li>
              <li>
                <MapPin size={16} className={styles.contactIcon} style={{ alignSelf: "flex-start", marginTop: "2px" }} />
                <span>
                  Offices: Kothamangalam | Thrissur | Changanassery, Kerala
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {currentYear} Convo Gown. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
