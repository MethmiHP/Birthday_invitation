import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Birthday Invitation | You're Invited!",
  description: "Join us for a special birthday celebration. RSVP now to save your spot!",
  openGraph: {
    title: "Birthday Invitation",
    description: "Join us for my birthday celebration!",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-pink-500/30 selection:text-pink-200`}
      >
        {children}
      </body>
    </html>
  );
}
