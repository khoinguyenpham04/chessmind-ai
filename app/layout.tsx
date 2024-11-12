import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChessMind AI - Master Chess with AI",
  description: "Elevate your chess game with personalized lessons, real-time analysis, and an AI opponent that adapts to your skill level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-gray-900 text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
