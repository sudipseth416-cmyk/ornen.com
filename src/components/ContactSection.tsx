"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-24 bg-transparent text-white relative z-10">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4 font-semibold">09 — CONTACT</p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#c9a84c] mb-6 leading-tight">
            Have a restaurant or cafe that needs <br className="hidden md:block" /> a better online presence?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Reach out and we will help you build something you are proud to share.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href="https://wa.me/919330019587"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-block bg-[#c9a84c] text-black font-bold text-lg py-4 px-10 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          >
            Start a Project on WhatsApp &rarr;
          </a>
          
          <a
            href="mailto:ornencreature8725@gmail.com"
            className="text-gray-400 hover:text-[#c9a84c] transition-colors duration-300"
          >
            Or email us: ornencreature8725@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-[#c9a84c]/20 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 text-left md:text-center text-gray-300"
        >
          <div className="flex flex-col gap-2 items-start md:items-center">
            <span className="text-[#c9a84c] text-2xl mb-2">📍</span>
            <p className="leading-relaxed">Howrah, Jagadishpur,<br />West Bengal, India</p>
          </div>
          
          <div className="flex flex-col gap-2 items-start md:items-center">
            <span className="text-[#c9a84c] text-2xl mb-2">📞</span>
            <p className="leading-relaxed">+91 74397 57068<br />+91 91630 09325</p>
          </div>
          
          <div className="flex flex-col gap-2 items-start md:items-center">
            <span className="text-[#c9a84c] text-2xl mb-2">💬</span>
            <p className="leading-relaxed">WhatsApp:<br />+91 93300 19587 / +91 91630 09325</p>
          </div>
          
          <div className="flex flex-col gap-2 items-start md:items-center">
            <span className="text-[#c9a84c] text-2xl mb-2">📸</span>
            <p className="leading-relaxed">Instagram:<br />@ornen_creature</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
