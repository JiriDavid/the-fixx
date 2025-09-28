"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SiteHeader from "@/components/SiteHeader";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-space text-foreground antialiased`}
      >
        <SmoothScrollProvider>
          <SiteHeader />
          <main className={pathname === "/" ? "" : "pt-10 sm:pt-12"}>
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
