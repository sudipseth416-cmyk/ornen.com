import { SectionContainer } from "../SectionContainer";
import { QrCode, ScanLine, Utensils } from "lucide-react";

const steps = [
  {
    icon: <ScanLine className="w-8 h-8" />,
    title: "1. Scan",
    description: "Guests simply point their smartphone camera at the elegant QR code placed on their table.",
  },
  {
    icon: <QrCode className="w-8 h-8" />,
    title: "2. Browse",
    description: "An immersive, beautifully designed digital menu opens instantly without downloading any app.",
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "3. Order",
    description: "Seamless ordering and payment experience directly from their personal device.",
  }
];

export function QRSystem() {
  return (
    <SectionContainer className="py-32 bg-primary/10 border-y border-primary/20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Mockup Side */}
        <div className="order-2 lg:order-1 flex justify-center relative">
          <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full -z-10" />
          
          <div className="relative w-64 h-[500px] bg-background border-4 border-primary/50 rounded-[3rem] overflow-hidden shadow-2xl p-2 flex flex-col items-center justify-center">
            {/* Phone Notch */}
            <div className="absolute top-0 w-32 h-6 bg-primary/50 rounded-b-xl z-20" />
            
            <div className="w-full h-full bg-primary/10 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center justify-center border border-white/5">
              <QrCode className="w-32 h-32 text-accent mb-6" />
              <div className="text-center px-6">
                <h4 className="font-playfair text-xl mb-2 text-foreground">Oro Digital Menu</h4>
                <p className="text-xs text-muted">Scan to view our curated selection</p>
              </div>
              
              {/* Scan animation line */}
              <div className="absolute top-1/4 left-0 w-full h-1 bg-accent/50 shadow-[0_0_15px_rgba(201,168,76,0.5)] animate-[bounce_3s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="order-1 lg:order-2">
          <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Restaurant Solutions</span>
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">
            Smart QR Ordering
          </h2>
          <div className="w-20 h-1 bg-accent mb-8"></div>
          
          <p className="text-muted text-lg mb-12 leading-relaxed">
            Elevate your dining experience with our bespoke QR code ordering systems. We combine stunning digital design with frictionless functionality to modernize hospitality.
          </p>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-full bg-background border border-primary/50 flex items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-playfair mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
