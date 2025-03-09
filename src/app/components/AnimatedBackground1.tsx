"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground1() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component only renders on the client
  }, []);

  if (!isClient) return null; // Avoids mismatches during SSR

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Pulsing blobs */}
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-500 opacity-20 rounded-full filter blur-2xl"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1.2,
              y: -50,
              transition: {
                opacity: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
                scale: { duration: 6, repeat: Infinity, repeatType: "mirror" },
                y: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              },
            }}
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
          />
        ))}

      {/* Floating Bubbles */}
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-300 opacity-30 rounded-full"
            initial={{ opacity: 0.5, scale: 0.5, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: -50,
              transition: {
                opacity: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
                scale: { duration: 7, repeat: Infinity, repeatType: "mirror" },
                y: {
                  duration: 9,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              },
            }}
            style={{
              width: `${40}px`,
              height: `${40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
    </div>
  );
}
