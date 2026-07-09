"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/flower-arc.jpg)' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/flower-arc.jpg"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        >
          <source src="/flower-arc.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(10,20,10,0.7) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-playfair text-foreground tracking-tight mb-6 drop-shadow-2xl"
        >
          Crafting <span className="text-accent italic">Luxury</span> Digital Experiences
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-10"
        >
          We are an ultra-premium international agency transforming bold visions into elegant, high-performance realities.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button className="px-8 py-4 bg-accent text-background font-semibold rounded-none tracking-wide hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Explore Our Work <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="px-8 py-4 border border-accent/50 text-accent font-semibold rounded-none tracking-wide hover:bg-accent/10 transition-colors">
            Start a Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
