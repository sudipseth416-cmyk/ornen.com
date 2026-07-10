'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/"
          className="text-2xl md:text-3xl font-bold text-[var(--gold)] tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
          onClick={closeMenu}
        >
          Ornen Creature
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-300 relative z-10 ${
                  hoveredIndex === index ? 'text-[var(--gold)]' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--gold)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none p-2 -mr-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-7 flex flex-col items-end justify-center gap-[6px]">
            <span className={`block h-[2px] bg-white transition-all duration-300 origin-center ${isMobileMenuOpen ? 'w-7 rotate-45 translate-y-[8px]' : 'w-7'}`} />
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-5'}`} />
            <span className={`block h-[2px] bg-white transition-all duration-300 origin-center ${isMobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[8px]' : 'w-6'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-y-0 right-0 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50"
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-6 gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/70 hover:text-[var(--gold)] transition-colors py-3 min-h-[44px] border-b border-white/10 text-lg flex items-center relative group"
                >
                  <span className="w-0 group-hover:w-1 h-full bg-[var(--gold)] absolute left-0 transition-all duration-300 mr-2 -ml-2" />
                  <span className="group-hover:ml-3 transition-all duration-300">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
