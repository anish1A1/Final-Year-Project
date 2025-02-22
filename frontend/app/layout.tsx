// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../utils/auth";
import { EquipProvider } from "../utils/equip";
import { ProductProvider } from "../utils/prod";

import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmSajilo",
  description: "FarmSajilo is a app were you can purchase, rent and trade products from farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title?.toString()}</title>
        <meta name="description" content={metadata.description?.toString()} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
        <EquipProvider>
            <ProductProvider>
              <Navbar />
                  <main className="flex-grow">
                  <Toaster position="top-center" />
            {children}
                
                  </main>
                </ProductProvider>
              </EquipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
