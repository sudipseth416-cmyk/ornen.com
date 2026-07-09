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
    <section className="py-16 glass bg-animated-gradient border-y border-glass-border relative overflow-hidden bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className={`text-center relative ${
                index !== 0 ? 'md:before:content-[""] md:before:absolute md:before:left-0 md:before:top-1/4 md:before:bottom-1/4 md:before:w-px md:before:bg-gradient-to-b md:before:from-transparent md:before:via-[var(--gold)]/40 md:before:to-transparent' : ''
              } ${
                index === 2 || index === 3 ? 'before:content-[""] before:absolute before:top-0 before:left-1/4 before:right-1/4 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--gold)]/40 before:to-transparent md:before:hidden' : ''
              } ${
                index === 1 ? 'before:content-[""] before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-px before:bg-gradient-to-b before:from-transparent before:via-[var(--gold)]/40 before:to-transparent md:before:hidden' : ''
              } ${
                index === 3 ? 'before:content-[""] before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-px before:bg-gradient-to-b before:from-transparent before:via-[var(--gold)]/40 before:to-transparent md:before:hidden' : ''
              }`}
            >
              <div className="relative inline-block mb-2">
                <div className="absolute inset-0 animate-pulse rounded-full blur-xl bg-[var(--gold)]/20"></div>
                <div 
                  className="text-4xl md:text-5xl font-bold text-[var(--gold)] relative z-10"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <CountUpStat 
                    value={stat.num} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                    formatComma={stat.formatComma} 
                  />
                </div>
              </div>
              <div className="text-sm text-white/70 tracking-widest uppercase font-medium mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
