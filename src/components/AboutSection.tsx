'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-[var(--gold)] text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
            01 &mdash; About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Howrah-based web agency for the hospitality world.
            </h2>
            
            <div className="flex flex-col gap-6 text-[#888888] text-base md:text-lg font-light leading-relaxed">
              <p>
                We are Ornen Creature &mdash; a freelancing agency founded by Sudip Seth and Pritam Shyam Chowdhury in Howrah, West Bengal.
              </p>
              <p>
                We focus on one thing: building clean, professional websites for restaurants, cafes, hotels and bakeries that want to be found online, attract more customers and make it easy for people to contact them.
              </p>
              <p>
                Every website we build is custom designed, mobile friendly and delivered with full integration &mdash; from WhatsApp buttons to Zomato and Swiggy links.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="px-5 py-2 rounded-full border border-[var(--gold)]/50 text-[var(--gold)] text-xs tracking-[0.15em] uppercase">
                Howrah, West Bengal
              </span>
              <span className="px-5 py-2 rounded-full border border-[var(--gold)]/50 text-[var(--gold)] text-xs tracking-[0.15em] uppercase">
                Est. 2024
              </span>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full relative"
          >
            <div className="w-full aspect-[4/5] bg-[#111111] border border-[var(--gold)]/30 rounded-lg p-8 flex flex-col items-center justify-center relative overflow-hidden">
              
              <img 
                src="/founder.jpg" 
                alt="Sudip Seth & Pritam Shyam Chowdhury - Founders of Ornen Creature" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col items-center text-center">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sudip &amp; Pritam
                </h3>
                <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-medium">
                  Founders
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
