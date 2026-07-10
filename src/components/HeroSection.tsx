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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
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
          className="mb-8 px-5 py-2 rounded-full border border-glass-border bg-glass backdrop-blur-md text-[var(--gold)] text-xs md:text-sm tracking-[0.15em] uppercase relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-animated-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse-glow"></span>
            Howrah, West Bengal &middot; Est. 2025
          </span>
        </motion.div>

        {/* Heading */}
        <div className="mb-6 flex flex-col items-center w-full relative">
          <div className="absolute -inset-10 bg-[var(--gold)]/5 rounded-full blur-3xl animate-pulse-glow -z-10"></div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 md:mb-4 drop-shadow-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We build restaurants
          </motion.h1>
          
          <div className="h-[60px] md:h-[96px] lg:h-[112px] relative w-full flex justify-center">
            <AnimatePresence>
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--gold)] via-[#e8d48b] to-[var(--gold)] absolute whitespace-nowrap w-full text-center"
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
          className="text-white/70 max-w-[600px] text-lg md:text-xl mb-12 leading-relaxed font-light tracking-wide backdrop-blur-sm p-4 rounded-xl"
        >
          Professional websites for restaurants, cafes, hotels and bakeries across India &mdash; starting at <span className="text-[var(--gold)] font-medium">&#8377;1,500</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto"
        >
          <a 
            href="#work" 
            className="relative group w-full sm:w-auto overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-[#e8d48b] to-[var(--gold)] opacity-100 group-hover:scale-105 transition-transform duration-500"></div>
            <div className="relative px-10 py-4 text-[#0a0a0a] font-bold tracking-widest text-sm md:text-base text-center uppercase flex items-center justify-center gap-2">
              View Our Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
          <a 
            href="#pricing" 
            className="w-full sm:w-auto px-10 py-4 glass border border-glass-border text-white font-semibold rounded-full hover:bg-glass-hover hover:border-[var(--gold)]/50 transition-all duration-300 tracking-widest text-sm md:text-base text-center uppercase group flex items-center justify-center gap-2"
          >
            Start Project
            <span className="text-[var(--gold)] group-hover:translate-x-1 transition-transform">&rarr;</span>
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
