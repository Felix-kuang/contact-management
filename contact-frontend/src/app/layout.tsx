import "./globals.css";
import {ReactNode} from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='bg-gradient-to-br from-gray-900 to-gray-800'
      >
        {children}
      </body>
    </html>
  );
}
