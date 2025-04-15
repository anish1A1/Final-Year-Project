// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../utils/auth";
import { EquipProvider } from "../utils/equip";
import { ProductProvider } from "../utils/prod";
import {CartProvider} from "../utils/cart";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "@/ImpComponent/homePages/Footer";


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
              <CartProvider>

              
              <Navbar />
                  <main className="flex-grow mb-2">
                  <Toaster position="top-center" />
            {children}
                
                  </main>
                  <footer className="bg-gray-800 py-3 rounded-sm">
                  <Footer />

                  </footer>

                  </CartProvider>
                </ProductProvider>
              </EquipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
