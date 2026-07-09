'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

function CountUpStat({ 
  value, 
  prefix = '', 
  suffix = '', 
  formatComma = false 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  formatComma?: boolean; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  
  const rounded = useTransform(motionValue, (latest) => {
    const num = Math.round(latest);
    const str = formatComma ? num.toLocaleString('en-IN') : num.toString();
    return prefix + str + suffix;
  });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatsBar() {
  const stats = [
    { num: 10, suffix: '+', label: 'Happy Clients' },
    { num: 3, label: 'Live Projects' },
    { num: 1500, prefix: '₹', formatComma: true, label: 'Starting Price' },
    { num: 24, suffix: '/7', label: 'Online Presence' },
  ];

  return (
    <section className="w-full bg-[#111111] border-y border-[#1a1a1a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                flex flex-col items-center justify-center py-12 md:py-16
                ${index % 2 === 1 ? 'border-l border-[var(--gold)]/30' : ''} 
                ${index > 1 ? 'border-t border-[var(--gold)]/30 md:border-t-0' : ''}
                ${index > 0 ? 'md:border-l border-[var(--gold)]/30' : ''}
              `}
            >
              <div 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--gold)] mb-3 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <CountUpStat 
                  value={stat.num} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  formatComma={stat.formatComma} 
                />
              </div>
              <div className="text-white text-xs md:text-sm uppercase tracking-[0.2em] opacity-80 text-center font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
