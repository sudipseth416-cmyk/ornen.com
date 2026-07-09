'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Share Your Details",
    description: "Send us your business info, logo, menu and any references you like.",
  },
  {
    number: "02",
    title: "Design Direction",
    description: "We create a design direction and send you a preview for your approval.",
  },
  {
    number: "03",
    title: "We Build It",
    description: "Full custom website with all integrations, responsive design and your branding throughout.",
  },
  {
    number: "04",
    title: "Go Live",
    description: "Website launches in 3 to 7 business days. Domain setup, final testing and handover included.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="w-full bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
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
              04 &mdash; How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Simple process. Fast delivery.
          </motion.h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Horizontal Gold Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-[42px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent origin-left"
          />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Gold Number Circle */}
                <div className="relative mb-8">
                  <div className="w-[84px] h-[84px] rounded-full border-2 border-[var(--gold)]/40 group-hover:border-[var(--gold)] flex items-center justify-center bg-[#0a0a0a] transition-colors duration-500 relative z-10">
                    <span
                      className="text-3xl font-bold text-[var(--gold)]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-[var(--gold)]/0 group-hover:bg-[var(--gold)]/5 transition-all duration-500 blur-xl scale-150" />
                </div>

                {/* Title */}
                <h3
                  className="text-xl lg:text-2xl text-white font-bold mb-3 group-hover:text-[var(--gold)] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#888888] text-sm lg:text-base font-light leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Stack */}
        <div className="md:hidden relative max-w-sm mx-auto">
          {/* Vertical Gold Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 bottom-0 left-[30px] w-px bg-gradient-to-b from-[var(--gold)]/50 via-[var(--gold)]/30 to-transparent origin-top"
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-6 relative"
              >
                {/* Number Circle */}
                <div className="w-[60px] h-[60px] rounded-full border-2 border-[var(--gold)]/40 flex items-center justify-center bg-[#0a0a0a] flex-none relative z-10">
                  <span
                    className="text-xl font-bold text-[var(--gold)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text Content */}
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
