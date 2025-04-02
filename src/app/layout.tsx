"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AnimatedBackground1 from "./components/AnimatedBackground1";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Toaster position="top-right" reverseOrder={false} />
          {pathname === "/login" && (
            <div className="absolute inset-0 z-0">
              <AnimatedBackground1 />
            </div>
          )}
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
