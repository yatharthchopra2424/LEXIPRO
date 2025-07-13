import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LexiPro - AI-Powered Legal OS & Client-Lawyer Marketplace",
  description:
    "The world's most advanced AI-powered legal operating system and marketplace. Transform legal practice with intelligent automation, blockchain technology, and seamless client-lawyer connections.",
  keywords:
    "legal AI, lawyer marketplace, legal documents, blockchain notarization, legal automation, AI assistant, legal tech",
  authors: [{ name: "LexiPro Team" }],
  creator: "LexiPro",
  publisher: "LexiPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lexipro.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LexiPro - AI-Powered Legal OS & Client-Lawyer Marketplace",
    description:
      "Transform legal practice with AI automation, blockchain technology, and seamless client-lawyer connections.",
    url: "https://lexipro.ai",
    siteName: "LexiPro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LexiPro - AI-Powered Legal Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LexiPro - AI-Powered Legal OS & Client-Lawyer Marketplace",
    description:
      "Transform legal practice with AI automation, blockchain technology, and seamless client-lawyer connections.",
    images: ["/og-image.jpg"],
    creator: "@lexipro_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'kavyansh'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FCD34D" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased bg-[#0B0F19] text-white`}>{children}</body>
    </html>
  )
}
