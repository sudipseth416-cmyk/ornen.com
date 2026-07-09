"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is domain included in the package?",
    answer: "Domain is not included in either package. \nA custom domain such as .com or .in costs ₹1,000 \nfor the first year and ₹800 for annual renewal."
  },
  {
    question: "How long does it take to build?",
    answer: "Most websites are delivered within 3 to 7 \nbusiness days after we receive all your content."
  },
  {
    question: "Can I update my menu or content later?",
    answer: "Yes. We provide content update support \nafter delivery for all our clients."
  },
  {
    question: "Do you work with businesses outside Kolkata?",
    answer: "Yes. We work with clients across India remotely."
  },
  {
    question: "What if I need extra features?",
    answer: "Custom features can be added at additional \ncost based on the scope of work."
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. Basic support is included after delivery."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full py-24 bg-transparent text-white relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-3 font-semibold">08 — FAQ</p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#c9a84c]">
            Questions clients usually ask.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-[#c9a84c]/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <h3 className="text-lg md:text-xl font-medium pr-8 group-hover:text-[#c9a84c] transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="text-[#c9a84c] text-2xl font-light transition-transform duration-300 w-6 h-6 flex items-center justify-center">
                    {isOpen ? "−" : "+"}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-8 text-gray-300 whitespace-pre-line text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
