"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="w-full bg-black text-white relative z-10 overflow-hidden">
      {/* TOP: Marquee scrolling text strip */}
      <div className="bg-[#c9a84c] text-black overflow-hidden py-3">
        <div className="whitespace-nowrap flex" style={{ width: "200%" }}>
          <motion.div
            className="flex font-semibold tracking-wider text-sm"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            <span className="px-4">Ornen Creature ✦ Howrah, West Bengal ✦ Restaurant Websites ✦ Cafe Websites ✦ Hotel Websites ✦ Starting ₹1,599 ✦</span>
            <span className="px-4">Ornen Creature ✦ Howrah, West Bengal ✦ Restaurant Websites ✦ Cafe Websites ✦ Hotel Websites ✦ Starting ₹1,599 ✦</span>
            <span className="px-4">Ornen Creature ✦ Howrah, West Bengal ✦ Restaurant Websites ✦ Cafe Websites ✦ Hotel Websites ✦ Starting ₹1,599 ✦</span>
            <span className="px-4">Ornen Creature ✦ Howrah, West Bengal ✦ Restaurant Websites ✦ Cafe Websites ✦ Hotel Websites ✦ Starting ₹1,599 ✦</span>
          </motion.div>
        </div>
      </div>

      {/* MAIN FOOTER 3 columns */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-serif text-2xl md:text-3xl text-[#c9a84c]">Ornen Creature</h3>
            <p className="text-gray-300 italic text-lg">"We build restaurants a digital home."</p>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Specialized web design for the hospitality industry, crafted with precision and passion.
            </p>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-lg font-semibold tracking-wider text-[#c9a84c] uppercase mb-2">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {['About', 'Work', 'Services', 'Pricing', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const el = document.getElementById(link.toLowerCase());
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-left"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-lg font-semibold tracking-wider text-[#c9a84c] uppercase mb-2">Get In Touch</h4>
            <div className="flex flex-col gap-3 text-gray-300">
              <a href="mailto:ornencreature8725@gmail.com" className="hover:text-white transition-colors duration-300">
                ornencreature8725@gmail.com
              </a>
              <a href="tel:+919163009325" className="hover:text-white transition-colors duration-300">
                +91 91630 09325
              </a>
              <a href="https://www.instagram.com/ornen_creature_webdeveloper?igsh=NGVuZzBrc2JhM2g5" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                @ornen_creature_webdevoloper
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#c9a84c]/30">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-gray-500 text-sm tracking-wide">
            © 2026 Ornen Creature. Designed and built in Howrah, West Bengal, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
