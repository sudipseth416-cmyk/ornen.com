"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "../SectionContainer";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Ornen Creature transformed our brand's digital presence into a true luxury experience. Their attention to detail and 3D integration is unmatched.",
    name: "Eleanor Vance",
    role: "Marketing Director, Luxe Hotels",
  },
  {
    quote: "Working with Sudip and Pritam was seamless. The bespoke QR system they developed for our lounges increased our order efficiency by 40%.",
    name: "James Sterling",
    role: "Operations Manager, Sterling Dining",
  },
  {
    quote: "An agency that truly understands premium aesthetics. The tilt cards and fluid animations made our portfolio stand out in a saturated market.",
    name: "Sophia Rossi",
    role: "Founder, Rossi Architecture",
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <SectionContainer id="testimonials" className="py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair mb-6">Client Experiences</h2>
        <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
      </div>

      <div className="max-w-4xl mx-auto relative px-12">
        <Quote className="absolute top-0 left-0 w-16 h-16 text-primary/30 -z-10" />
        
        <div className="min-h-[250px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-xl md:text-2xl font-playfair italic leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </p>
              <div className="w-12 h-px bg-accent mb-4"></div>
              <h4 className="font-semibold text-foreground tracking-wide uppercase text-sm">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                {testimonials[currentIndex].role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-12">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}
