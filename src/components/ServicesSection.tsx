'use client';

import { motion } from 'framer-motion';

const services = [
  {
    number: "01",
    title: "Restaurant & Cafe Websites",
    description: "Built to look premium, load fast and convert visitors into customers."
  },
  {
    number: "02",
    title: "Digital Menu Integration",
    description: "A full digital menu your customers can browse from any device, any time."
  },
  {
    number: "03",
    title: "QR Code Ordering System",
    description: "Customers scan a QR code at their table, browse the menu and place orders instantly."
  },
  {
    number: "04",
    title: "Zomato & Swiggy Integration",
    description: "Connect your website directly to your food delivery platform listings."
  },
  {
    number: "05",
    title: "Google Maps & WhatsApp Button",
    description: "One tap to call, WhatsApp and get directions — all on your website."
  },
  {
    number: "06",
    title: "SEO & Social Media Setup",
    description: "Basic SEO optimization and full social media links so customers can find and follow you."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full bg-[#0a0a0a] py-24 md:py-32">
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
              03 &mdash; What We Do
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
            Everything your restaurant needs online.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#888888] text-lg md:text-xl font-light max-w-2xl"
          >
            Built and delivered by our team. Never outsourced.
          </motion.p>
        </div>

        {/* Services List */}
        <div className="max-w-4xl mx-auto flex flex-col border-t border-[var(--gold)]/20">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col py-8 md:py-12 border-b border-[var(--gold)]/20 border-l-4 border-transparent hover:border-l-[var(--gold)] hover:bg-[#111111]/50 transition-all duration-300 pl-6 md:pl-10 cursor-default"
            >
              <div className="flex items-center gap-4 mb-3 md:mb-4">
                <span 
                  className="text-[var(--gold)] text-xl md:text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.number}
                </span>
                <span className="text-[var(--gold)] opacity-50">&mdash;</span>
                <h3 
                  className="text-2xl md:text-3xl text-white font-bold transition-colors duration-300 group-hover:text-[var(--gold)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>
              </div>
              <p className="text-[#888888] text-base md:text-lg font-light leading-relaxed max-w-2xl pl-0 md:pl-[68px] transition-colors duration-300 group-hover:text-[#aaaaaa]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
