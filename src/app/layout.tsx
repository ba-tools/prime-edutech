import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { WebVitals } from "@/components/WebVitals";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Prime Edutech - Your Path to Study Abroad",
    template: "%s | Prime Edutech"
  },
  description: "Expert education consultancy helping students find, apply, and enroll in top universities worldwide. 24/7 AI counselor, course finder, and complete admission support.",
  keywords: ["study abroad", "education consultancy", "international education", "university admission", "MBBS abroad", "student counseling", "course finder"],
  authors: [{ name: "Prime Edutech" }],
  creator: "Prime Edutech",
  publisher: "Prime Edutech",
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
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Prime Edutech - Your Path to Study Abroad",
    description: "Expert education consultancy helping students find, apply, and enroll in top universities worldwide. 24/7 AI counselor and complete admission support.",
    siteName: "Prime Edutech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Edutech - Your Path to Study Abroad",
    description: "Expert education consultancy helping students find, apply, and enroll in top universities worldwide.",
    creator: "@primeedutech",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased">
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
