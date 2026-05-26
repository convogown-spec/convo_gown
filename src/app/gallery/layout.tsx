import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Graduation Ceremony & Gown Gallery | Convo Gown",
  description: "Browse high-quality graduation ceremonies, custom academic stoles, hoods, and ceremony setups across Kerala's top engineering and arts institutions.",
  alternates: {
    canonical: "/gallery",
  },
  keywords: [
    "graduation ceremony photos",
    "convocation ceremony gallery",
    "graduation gowns photos Kerala",
    "academic regalia showcase",
    "CUSAT graduation photos",
    "Calicut University hooding",
    "mortarboard cap designs",
    "stole custom embroidery"
  ],
  openGraph: {
    title: "Official Graduation Ceremony & Gown Gallery | Convo Gown",
    description: "Browse premium academic gown rentals and ceremony highlights across Kerala.",
    url: "https://www.convogown.com/gallery",
    type: "website",
    images: [
      {
        url: "/assets/logo_v2.png",
        width: 512,
        height: 512,
        alt: "Convo Gown Gallery",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Graduation Ceremony & Gown Gallery | Convo Gown",
    description: "Premium academic gown rentals and graduation ceremony showcases in Kerala.",
    images: ["/assets/logo_v2.png"],
  }
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.convogown.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gallery",
        "item": "https://www.convogown.com/gallery"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
