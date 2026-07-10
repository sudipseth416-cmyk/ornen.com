'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Scan",
    description: "Customer scans the QR code placed at their table.",
  },
  {
    number: "02",
    title: "Browse",
    description: "Full digital menu opens on their phone instantly.",
  },
  {
    number: "03",
    title: "Order",
    description: "Customer places order without waiting for a waiter.",
  },
];

export default function QRSection() {
  return (
    <section id="qr" className="w-full bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-[var(--gold)] text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
              06 &mdash; QR Ordering
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Smart QR Ordering System.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#888888] text-lg md:text-xl font-light max-w-xl"
          >
            Let your customers scan, browse and order &mdash; right from their table.
          </motion.p>
        </div>

        {/* Steps — Desktop */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Gold Connecting Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute top-[48px] left-[18%] right-[18%] h-px origin-left"
          >
            {/* Dashed line via repeating dots */}
            <div className="w-full h-full border-t border-dashed border-[var(--gold)]/40" />
          </motion.div>

          {/* Gold Dots on the line */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
              className="absolute top-[44px] w-2 h-2 rounded-full bg-[var(--gold)]"
              style={{ left: `${16.66 + i * 33.33}%`, transform: 'translateX(-50%)' }}
            />
          ))}

          <div className="grid grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Number Circle */}
                <div className="relative mb-10">
                  <div className="w-24 h-24 rounded-full border-2 border-[var(--gold)]/30 group-hover:border-[var(--gold)] flex items-center justify-center bg-[#0a0a0a] transition-all duration-500 relative z-10">
                    <span
                      className="text-3xl font-bold text-[var(--gold)]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-[var(--gold)]/0 group-hover:bg-[var(--gold)]/5 transition-all duration-500 blur-2xl scale-[1.8]" />
                </div>

                {/* Title */}
                <h3
                  className="text-2xl lg:text-3xl text-white font-bold mb-4 group-hover:text-[var(--gold)] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#888888] text-base font-light leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps — Mobile */}
        <div className="md:hidden relative max-w-sm mx-auto">
          {/* Vertical Gold Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 bottom-0 left-[30px] w-px bg-gradient-to-b from-[var(--gold)]/40 via-[var(--gold)]/20 to-transparent origin-top"
          />

          <div className="flex flex-col gap-14">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="flex items-start gap-6 relative"
              >
                {/* Number Circle */}
                <div className="w-[60px] h-[60px] rounded-full border-2 border-[var(--gold)]/30 flex items-center justify-center bg-[#0a0a0a] flex-none relative z-10">
                  <span
                    className="text-xl font-bold text-[var(--gold)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col pt-2">
                  <h3
                    className="text-xl text-white font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#888888] text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
