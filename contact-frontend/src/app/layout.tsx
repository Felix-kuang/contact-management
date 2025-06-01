import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4'
      >
        {children}
      </body>
    </html>
  );
}
