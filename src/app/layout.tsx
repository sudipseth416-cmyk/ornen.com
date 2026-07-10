import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Ornen Creature — Restaurant Website Design Howrah | Starting ₹1,500",
  description: "Professional websites for restaurants, cafes, hotels and bakeries across India. Starting at ₹1,500. Contact Ornen Creature in Howrah, West Bengal.",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased text-white selection:bg-[#c9a84c] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
