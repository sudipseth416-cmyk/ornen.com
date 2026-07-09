"use client";

import { Check } from "lucide-react";
import { SectionContainer } from "../SectionContainer";
import clsx from "clsx";

const plans = [
  {
    name: "Essential Presence",
    price: "₹1,500",
    description: "Perfect for establishing a premium digital footprint.",
    features: [
      "Custom 1-Page Design",
      "Mobile Responsive",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Week Delivery",
    ],
    highlighted: false,
  },
  {
    name: "Luxury Experience",
    price: "₹3,599",
    description: "The ultimate immersive digital platform for elite brands.",
    features: [
      "Up to 5 Pages",
      "3D Interactive Elements",
      "Advanced Animations",
      "CMS Integration",
      "Priority Support",
      "Analytics Dashboard",
    ],
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <SectionContainer id="pricing" className="py-32 bg-primary/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair mb-6">Investment</h2>
        <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Transparent pricing for unparalleled digital craftsmanship.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={clsx(
              "p-8 md:p-10 flex flex-col h-full border transition-transform hover:-translate-y-2",
              plan.highlighted 
                ? "bg-primary/20 border-accent relative" 
                : "bg-background/50 border-primary/30"
            )}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-playfair mb-2">{plan.name}</h3>
            <p className="text-muted text-sm mb-6 h-10">{plan.description}</p>
            
            <div className="mb-8">
              <span className="text-4xl font-playfair text-accent">{plan.price}</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={clsx(
                "w-full py-4 font-semibold tracking-wide uppercase text-sm transition-colors",
                plan.highlighted
                  ? "bg-accent text-background hover:bg-accent/90"
                  : "border border-accent text-accent hover:bg-accent/10"
              )}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
