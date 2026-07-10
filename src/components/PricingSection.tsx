'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    label: "Most Affordable",
    name: "Single Page Website",
    price: "₹1,599",
    badge: null,
    features: [
      "All content on one page",
      "Mobile and desktop friendly",
      "WhatsApp and call button",
      "Google Maps integration",
      "Social media links",
      "Photo gallery",
      "Fast loading design",
    ],
    highlighted: false,
  },
  {
    label: "Most Complete",
    name: "Professional Website",
    price: "₹3,599",
    badge: "POPULAR",
    features: [
      "Everything in Single Page plus:",
      "QR code ordering system",
      "Digital menu listings",
      "Customer reviews section",
      "Zomato and Swiggy integration",
      "Basic SEO friendly setup",
      "Brand photo showcase",
      "Multi section layout",
    ],
    highlighted: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-transparent py-24 md:py-32">
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
              05 &mdash; Pricing
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
            Simple, honest pricing.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#888888] text-lg md:text-xl font-light max-w-xl"
          >
            No hidden fees. No long contracts. Just a clean website at a fair price.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`relative flex flex-col rounded-2xl p-8 md:p-10 lg:p-12 transition-all duration-500 overflow-hidden group ${
                plan.highlighted
                  ? 'glass border border-[var(--gold)]/50 shadow-[0_0_30px_rgba(201,168,76,0.15)]'
                  : 'glass border border-glass-border hover:border-[var(--gold)]/30 hover:bg-glass-hover'
              }`}
            >
              {/* Highlight Background Glow */}
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-transparent opacity-50 z-0 pointer-events-none"></div>
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-12 -right-12 md:-right-14 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-2xl z-0 pointer-events-none"></div>
                )}
                {plan.badge && (
                  <div className="self-end mb-4 px-5 py-1.5 bg-gradient-to-r from-[var(--gold)] to-[#e8d48b] text-[#0a0a0a] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(201,168,76,0.4)]">
                    {plan.badge}
                  </div>
                )}

                {/* Label */}
                <span className="text-[var(--gold)] text-xs uppercase tracking-[0.2em] font-medium mb-4">
                  {plan.label}
                </span>

                {/* Plan Name */}
                <h3
                  className="text-3xl md:text-4xl text-white font-bold mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-8 relative">
                  <span
                    className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[#e8d48b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-white/50 text-sm ml-3 uppercase tracking-widest font-medium">one-time</span>
                </div>

                {/* Divider */}
                <div className={`w-full h-px mb-8 ${plan.highlighted ? 'bg-gradient-to-r from-[var(--gold)]/50 to-transparent' : 'bg-glass-border'}`} />

                {/* Features */}
                <ul className="flex flex-col gap-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5 text-[var(--gold)] flex-none mt-0.5 drop-shadow-[0_0_5px_rgba(201,168,76,0.5)]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="https://wa.me/919163009325?text=Hi,%20I%20am%20interested%20in%20building%20a%20website%20with%20Ornen%20Creature.%20Please%20provide%20more%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase text-center transition-all duration-500 block relative overflow-hidden ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[var(--gold)] via-[#e8d48b] to-[var(--gold)] text-[#0a0a0a] hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                      : 'glass border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0a0a0a]'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started 
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-[#555555] text-xs md:text-sm font-light mt-12 max-w-xl mx-auto leading-relaxed"
        >
          Domain not included. Custom domain .in for ₹800 and .com for ₹1,000 first time &middot; Annual renewal ₹800 for both per year. Additional features available at extra cost.
        </motion.p>

      </div>
    </section>
  );
}
