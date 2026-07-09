import { SectionContainer } from "../SectionContainer";
import { ArrowRight } from "lucide-react";

export function AboutUs() {
  return (
    <SectionContainer id="about" className="py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Side */}
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">
            Pioneering the <span className="text-accent italic">Future</span> of Digital Luxury
          </h2>
          <div className="w-20 h-1 bg-accent mb-8"></div>
          
          <p className="text-muted text-lg mb-6 leading-relaxed">
            Ornen Creature was founded on the belief that digital presence should be an immersive experience. We don't just build websites; we craft digital luxury that speaks volumes about your brand's prestige.
          </p>
          
          <p className="text-muted text-lg mb-10 leading-relaxed">
            Led by visionaries Sudip Seth and Pritam Shyam Chowdhury, our agency merges cutting-edge technology like 3D web rendering with timeless design principles to deliver unparalleled results for international clients.
          </p>
          
          <button className="flex items-center gap-3 text-accent hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold group">
            Meet the Founders 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Image/Visual Side */}
        <div className="relative">
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-primary/50 translate-x-4 translate-y-4 -z-10"></div>
          <div className="absolute -inset-4 border border-accent/20 -translate-x-4 -translate-y-4 -z-10"></div>
          
          <div className="bg-primary/30 aspect-[4/5] relative overflow-hidden flex flex-col justify-end p-8 border border-white/5 group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 z-10" />
            
            {/* Placeholder for founders image, currently just a stylized box */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay transition-opacity duration-700 group-hover:opacity-40" />
            
            <div className="relative z-20">
              <h3 className="text-2xl font-playfair mb-2">Sudip Seth & Pritam Shyam Chowdhury</h3>
              <p className="text-accent uppercase tracking-widest text-xs">Founders, Ornen Creature</p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
