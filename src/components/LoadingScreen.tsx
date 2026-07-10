"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEM");

  useEffect(() => {
    // Cinematic sequence steps
    const t1 = setTimeout(() => setLoadingText("ESTABLISHING CONNECTION"), 900);
    const t2 = setTimeout(() => setLoadingText("PREPARING INTERFACE"), 1800);
    const t3 = setTimeout(() => setLoadingText("READY"), 2700);
    const t4 = setTimeout(() => setIsLoading(false), 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#030303]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cinematic Moving Spotlight Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {/* Much larger, softer glow on mobile for atmospheric fill */}
            <div className="absolute w-[120vw] h-[120vw] sm:w-[80vw] sm:h-[80vw] md:w-[50vw] md:h-[50vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00f0ff]/15 via-transparent to-transparent opacity-50 mix-blend-screen" />
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute w-[200%] h-[200%] md:w-[150%] md:h-[150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#c9a84c05_50%,#00000000_100%)]"
            />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-8">
            {/* Cinematic Logo Reveal */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.2, opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-10 sm:mb-16"
            >
              {/* Complex Orbital Rings - scaled for mobile */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute inset-[-5%] rounded-full border-[0.5px] border-[#00f0ff]/30 opacity-70"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute inset-[-15%] rounded-full border-[1px] border-dashed border-[#c9a84c]/20"
              />
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-[5%] rounded-full border-t border-[#00f0ff]/30 mix-blend-screen filter blur-[1px] sm:blur-[2px]"
              />

              {/* The WebP Logo */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="w-[90%] h-[90%] relative z-10"
              >
                <Image
                  src="/ornen logo.webp"
                  alt="Ornen Creature Logo"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] sm:drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                />
              </motion.div>
            </motion.div>

            {/* Premium Typography & Progress indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center w-[85vw] max-w-[320px] sm:max-w-md"
            >
              <div className="h-4 sm:h-5 overflow-hidden relative mb-4 sm:mb-6 w-full flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadingText}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#c9a84c] tracking-[0.2em] sm:tracking-[0.5em] uppercase text-[9px] sm:text-[10px] md:text-[11px] font-semibold whitespace-nowrap drop-shadow-[0_0_8px_rgba(201,168,76,0.6)]"
                  >
                    {loadingText}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Ultra Sleek Cinematic Loader Line */}
              <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 3.1, ease: [0.85, 0, 0.15, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff] to-[#c9a84c]"
                />
                <motion.div
                  initial={{ left: "-10%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 3.1, ease: [0.85, 0, 0.15, 1] }}
                  className="absolute top-0 w-6 sm:w-10 h-full bg-white shadow-[0_0_8px_2px_#fff] sm:shadow-[0_0_15px_2px_#fff] blur-[1px] sm:blur-[2px]"
                />
              </div>
            </motion.div>
          </div>

          {/* Cinematic Letterbox (Black Bars Opening) */}
          <motion.div
            initial={{ height: "15vh" }}
            exit={{ height: "0vh" }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            className="absolute top-0 left-0 w-full bg-black z-50 pointer-events-none"
          />
          <motion.div
            initial={{ height: "15vh" }}
            exit={{ height: "0vh" }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            className="absolute bottom-0 left-0 w-full bg-black z-50 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
