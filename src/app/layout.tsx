import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import logo from '../../public/logo.png'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brightedgeinteriors.com'),
  title: {
    default: "Best Interior Designers in Bangalore | Bright Edge Interiors",
    template: "%s | Bright Edge Interiors"
  },
  description: "Award-winning interior designers in Bangalore. Premium residential & commercial interior design, modern home renovation, and custom furniture. Transform your space with Bright Edge Interiors.",
  keywords: ["interior designers bangalore", "home interior design", "office interior design", "commercial interior designers", "residential interior designers", "modern home renovation", "custom furniture design", "luxury interior design", "best interior designers", "interior design company bangalore"],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Best Interior Designers in Bangalore | Bright Edge Interiors",
    description: "Transform your space with Bangalore's premium interior design services. Residential & commercial interiors, modern renovations, and custom furniture by expert designers.",
    siteName: "Bright Edge Interiors",
    images: [
      {
        url: logo.src,
        width: 1200,
        height: 630,
        alt: "Bright Edge Interiors - Luxury Interior Design Services",
      },
    ],
    locale: "en_IN",
    type: "website",
    url: 'https://brightedgeinteriors.com',
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Interior Designers in Bangalore | Bright Edge Interiors",
    description: "Transform your space with Bangalore's premium interior design services. Expert designers for homes & offices.",
    images: ["/hero.jpg"],
    creator: "@brightedgeint",
    site: "@brightedgeint",
  },
  verification: {
    google: "YOUR-GOOGLE-VERIFICATION-ID", // Add your Google Search Console verification ID
  },
  icons: {
    icon: logo.src,
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Bright Edge Interiors",
              "@id": "https://brightedgeinteriors.com",
              "url": "https://brightedgeinteriors.com",
              "logo": "https://brightedgeinteriors.com/logo.png",
              "image": "https://brightedgeinteriors.com/hero.jpg",
              "description": "Premium interior design services in Bangalore. Specializing in residential and commercial interiors, renovations, and custom furniture design.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "YOUR_STREET_ADDRESS",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "YOUR_POSTAL_CODE",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "YOUR_LATITUDE",
                "longitude": "YOUR_LONGITUDE"
              },
              "telephone": "+91-8431866567",
              "priceRange": "₹₹₹",
              "openingHours": "Mo-Sa 09:00-18:00",
              "sameAs": [
                "https://facebook.com/brightedgeinteriors",
                "https://instagram.com/brightedgeinteriors",
                "https://linkedin.com/company/brightedgeinteriors"
              ]
            })
          }}
        />
        {/* Explicit favicon links to improve browser compatibility and avoid caching issues */}
        {/* small tab icon */}
        <link rel="icon" href="/logo.png" sizes="32x32" />
        {/* android / large icons */}
        <link rel="icon" href="/bright.png" sizes="192x192" />
        {/* fallback / any-size */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="shortcut icon" href="/logo.png" />
        {/* apple touch (home screen) */}
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <meta name="theme-color" content="#ffffff" />
        {/* Additional SEO meta tags */}
        <meta name="author" content="Bright Edge Interiors" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="YOUR_LATITUDE;YOUR_LONGITUDE" />
        <meta name="ICBM" content="YOUR_LATITUDE, YOUR_LONGITUDE" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
