'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Ornen Creature built us a stunning website that perfectly captures the spirit of our cafe. Customers now find us easily online.",
    name: "Cafe Coutume Team",
    business: "Heritage Cafe, Konnagar",
  },
  {
    quote: "The website they built is clean, fast and looks incredibly premium. Our online bookings increased immediately.",
    name: "Cafe Adda Team",
    business: "Premium Restaurant, Howrah",
  },
  {
    quote: "Professional, responsive and delivered on time. They understood exactly what our restaurant needed online.",
    name: "Oro Cafe Team",
    business: "Pure Veg Restaurant, Kolkata",
  },
];

function GoldStars() {
  return (
    <div className="flex items-center gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full bg-[#0a0a0a] py-24 md:py-32">
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
              07 &mdash; Client Stories
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
            What our clients say.
          </motion.h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col bg-[#111111] border border-[#1a1a1a] rounded-xl p-8 md:p-10 border-t-2 border-t-transparent hover:border-t-[var(--gold)] transition-all duration-500 group"
            >
              <GoldStars />

              {/* Quote */}
              <p className="text-[#999999] text-base md:text-lg font-light leading-relaxed italic mb-8 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-auto pt-6 border-t border-[#1a1a1a]">
                <p className="text-white font-semibold text-base mb-1">
                  {item.name}
                </p>
                <p className="text-[var(--gold)] text-sm font-medium tracking-wide">
                  {item.business}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
