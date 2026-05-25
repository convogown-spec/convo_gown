import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Convo Gown | Kerala's Trusted Convocation Partner",
  description: "Elevating graduation ceremonies across Kerala with premium convocation gowns, hoods, mortarboards, and ceremony branding solutions. Trusted by leading institutions.",
  keywords: ["graduation gown Kerala", "convocation gown", "academic hoods", "mortarboard caps", "convo gown", "Kerala convocation logistics"],
  authors: [{ name: "Convo Gown" }],
  openGraph: {
    title: "Convo Gown | Kerala's Trusted Convocation Partner",
    description: "Elevating graduation ceremonies across Kerala with premium convocation gowns, hoods, mortarboards, and ceremony branding solutions.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${outfit.variable}`}
      style={{
        // Expose variables directly
        "--font-serif": "var(--font-playfair-display)",
        "--font-sans": "var(--font-outfit)",
      } as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}
