"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "../SectionContainer";

const stats = [
  { label: "Projects Completed", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 95, suffix: "%" },
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Global Partners", value: 15, suffix: "" },
];

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = from;
      const duration = 2000;
      const increment = (to - from) / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, from, to]);

  return (
    <div ref={ref} className="text-4xl md:text-6xl font-playfair text-accent mb-2">
      {count}{suffix}
    </div>
  );
}

export function StatsCounter() {
  return (
    <SectionContainer className="bg-primary/20 border-y border-primary/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center relative z-10">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col items-center justify-center p-6 border border-accent/10 bg-background/50 backdrop-blur-sm hover:border-accent/30 transition-colors"
          >
            <Counter from={0} to={stat.value} suffix={stat.suffix} />
            <div className="text-sm md:text-base text-muted uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
