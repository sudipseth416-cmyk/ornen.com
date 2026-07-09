import { SectionContainer } from "../SectionContainer";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Portfolio() {
  return (
    <SectionContainer id="work" className="py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Selected Work</h2>
          <div className="w-20 h-1 bg-accent mb-0"></div>
        </div>
        <button className="flex items-center gap-2 text-muted hover:text-accent transition-colors uppercase tracking-widest text-sm font-semibold">
          View All Projects <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative group cursor-pointer block overflow-hidden border border-primary/30">
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-video md:aspect-auto overflow-hidden bg-primary/20">
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            {/* Placeholder Image for Oro Cafe */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
          </div>

          {/* Content Side */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-background/80 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/5 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Hospitality & Dining</span>
              <h3 className="text-3xl md:text-4xl font-playfair mb-6">Oro Cafe & Lounge</h3>
              
              <p className="text-muted mb-8 leading-relaxed">
                A comprehensive digital reimagining for a luxury dining establishment. We crafted an immersive web experience that mirrors the physical ambiance of Oro Cafe, complete with an integrated digital menu and seamless reservation system.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {["Next.js", "Tailwind CSS", "Framer Motion", "UI/UX Design"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 border border-primary/50 text-xs text-muted tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="inline-flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                <span className="font-playfair italic text-lg">View Case Study</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
