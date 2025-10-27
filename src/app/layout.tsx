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
  title: "Bright Edge Interiors",
  description: "Premium interior design services — residential and commercial interiors, renovations, and custom furniture.",
  openGraph: {
    title: "Bright Edge Interiors",
    description: "Premium interior design services — residential and commercial interiors, renovations, and custom furniture.",
    siteName: "Bright Edge Interiors",
    images: [
      {
        url: logo.src,
        width: 1200,
        height: 630,
        alt: "Bright Edge Interiors - Hero",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright Edge Interiors",
    description: "Premium interior design services — residential and commercial interiors.",
    images: ["/hero.jpg"],
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
