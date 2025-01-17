import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
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
    <ClerkProvider appearance={{ baseTheme: undefined }} dynamic>
      <html lang="en" className="dark">
        <body className="antialiased min-h-screen bg-gray-900 text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
