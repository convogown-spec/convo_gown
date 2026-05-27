import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Script from "next/script";
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
  title: "Convo Gown | Premium Graduation & Convocation Gown Rental Kerala",
  description: "Rent premium convocation gowns, academic hoods, mortarboard caps, and stoles across Kerala and India. Zero-failure bulk delivery to colleges & schools.",
  metadataBase: new URL("https://www.convogown.com"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "jb8rIwmL48CSx8M_7PkbTB2dWKNRD9P5MFQAPbDJt_M",
  },
  keywords: [
    "convocation gown rental",
    "graduation gown rental",
    "graduation robe rental",
    "academic gown rental",
    "college gown rental",
    "university gown rental",
    "convocation gown rental Kerala",
    "graduation gown rental Kochi",
    "graduation gown rental Ernakulam",
    "convocation services Kerala",
    "academic gown rental India",
    "graduation robes Kerala",
    "convocation gowns Kerala",
    "bulk gown rental India",
    "graduation cap and gown rental",
    "premium graduation gowns",
    "best graduation gown rental service in Kerala",
    "degree ceremony gowns",
    "institutional gown rental"
  ],
  authors: [{ name: "Convo Gown" }],
  openGraph: {
    title: "Convo Gown | Premium Graduation & Convocation Gown Rental Kerala",
    description: "Rent premium convocation gowns, hoods, caps, and stoles across Kerala & India. Complete convocation ceremony branding and logistics.",
    url: "https://www.convogown.com",
    siteName: "Convo Gown",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/logo_v2.png",
        width: 512,
        height: 512,
        alt: "Convo Gown - Premium Academic Regalia Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convo Gown | Premium Graduation & Convocation Gown Rental Kerala",
    description: "Kerala's trusted graduation regalia partner. Premium gown, caps, hoods and stoles rental in bulk.",
    images: ["/assets/logo_v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Kochi",
    "geo.position": "9.9312;76.2673",
    "ICBM": "9.9312, 76.2673",
    "revisit-after": "7 days",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.convogown.com/#organization",
        "name": "Convo Gown",
        "url": "https://www.convogown.com",
        "logo": "https://www.convogown.com/assets/logo_v2.png",
        "sameAs": [
          "https://facebook.com/convogown",
          "https://instagram.com/convogown",
          "https://linkedin.com/company/convogown"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-88913-60876",
          "contactType": "Coordination Desk",
          "email": "convogown@gmail.com",
          "areaServed": "IN",
          "availableLanguage": ["English", "Malayalam"]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.convogown.com/#localbusiness",
        "name": "Convo Gown",
        "image": "https://www.convogown.com/assets/logo_v2.png",
        "priceRange": "$$",
        "telephone": "+918891360876",
        "email": "convogown@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kothamangalam Coordination Desk",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "postalCode": "686691",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "10.0531",
          "longitude": "76.6218"
        },
        "url": "https://www.convogown.com",
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Kerala"
          },
          {
            "@type": "AdministrativeArea",
            "name": "India"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.convogown.com/#website",
        "url": "https://www.convogown.com",
        "name": "Convo Gown",
        "description": "Premium Graduation & Convocation Gown Rentals in Kerala and India",
        "publisher": {
          "@id": "https://www.convogown.com/#organization"
        }
      }
    ]
  };

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
      <head>
        <link rel="preload" as="image" href="/assets/hero_bg.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Dynamic GA4 Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-63RZKEDS48"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-63RZKEDS48');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","seo55convog");
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
