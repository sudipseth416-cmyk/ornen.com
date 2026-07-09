"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "../SectionContainer";
import { Code, Layers, Smartphone, Sparkles } from "lucide-react";
import React, { useRef, useState } from "react";

const services = [
  {
    title: "Web Development",
    description: "High-performance, scalable web architectures tailored for luxury brands.",
    icon: <Code className="w-8 h-8" />,
  },
  {
    title: "UI/UX Design",
    description: "Immersive, conversion-optimized interfaces that captivate and engage.",
    icon: <Layers className="w-8 h-8" />,
  },
  {
    title: "Mobile Experiences",
    description: "Seamless cross-platform applications delivering premium mobility.",
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    title: "3D & Motion",
    description: "Interactive WebGL and fluid animations that elevate your digital presence.",
    icon: <Sparkles className="w-8 h-8" />,
  },
];

// 3D Tilt Card Component
function TiltCard({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-15 to 15 degrees max)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="bg-primary/20 border border-primary/50 p-8 h-full flex flex-col items-start hover:border-accent/50 group"
    >
      <div className="p-4 bg-background border border-primary/50 text-accent mb-6 rounded-none group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      <h3 className="text-2xl font-playfair mb-4">{service.title}</h3>
      <p className="text-muted leading-relaxed">{service.description}</p>
    </motion.div>
  );
}

export function Services() {
  return (
    <SectionContainer id="services" className="bg-background relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair mb-6">Our Expertise</h2>
        <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Comprehensive digital solutions engineered to dominate the modern landscape.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <TiltCard key={index} service={service} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}
