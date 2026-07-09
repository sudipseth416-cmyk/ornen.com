'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "a digital home.",
  "an online presence.",
  "a website that works."
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/flower-arc.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/flower-arc.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }} 
      />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full mt-16 md:mt-0">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 px-5 py-1.5 rounded-full border border-[var(--gold)]/50 text-[var(--gold)] text-xs md:text-sm tracking-[0.15em] uppercase backdrop-blur-sm"
        >
          Howrah, West Bengal &middot; Est. 2024
        </motion.div>

        {/* Heading */}
        <div className="mb-6 flex flex-col items-center w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We build restaurants
          </motion.h1>
          
          <div className="h-[48px] md:h-[80px] lg:h-[96px] relative w-full flex justify-center">
            <AnimatePresence>
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--gold)] absolute whitespace-nowrap w-full text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#888888] max-w-[500px] text-base md:text-lg mb-10 leading-relaxed font-light"
        >
          Professional websites for restaurants, cafes, hotels and bakeries across India &mdash; starting at &#8377;1,500.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a 
            href="#work" 
            className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-[var(--gold)] text-[#0a0a0a] font-semibold rounded hover:bg-[#b0913c] transition-colors tracking-wide text-sm md:text-base text-center"
          >
            View Our Work
          </a>
          <a 
            href="#pricing" 
            className="w-full sm:w-auto px-8 py-3.5 md:py-4 border border-[var(--gold)] text-[var(--gold)] font-semibold rounded hover:bg-[var(--gold)]/10 transition-colors tracking-wide text-sm md:text-base text-center"
          >
            Start at &#8377;1,500 &rarr;
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a 
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-3 text-[#888888]">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
