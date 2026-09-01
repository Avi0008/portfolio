import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avishek Chakraborty | AI Project Manager & Solution Owner",
  description: "AI Project Manager & Solution Owner transforming complex business needs into pragmatic, scalable Gen AI solutions. Specializing in GPT architectures, enterprise automation, and solution ownership.",
  keywords: ["AI Project Manager", "Solution Owner", "Generative AI", "Enterprise Automation", "PwC", "Avishek Chakraborty", "AI Strategy"],
  authors: [{ name: "Avishek Chakraborty" }],
  openGraph: {
    title: "Avishek Chakraborty | AI Project Manager & Solution Owner",
    description: "Transforming Business Vision Into AI-Powered Value. Leading Gen AI projects, ABAP/APEX automation, and enterprise solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Avishek Chakraborty Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avishek Chakraborty | AI Project Manager & Solution Owner",
    description: "Transforming Business Vision Into AI-Powered Value.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/sequence/frame_00_delay-0.062s.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased selection:bg-blue-500 selection:text-white`}
      >
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}

