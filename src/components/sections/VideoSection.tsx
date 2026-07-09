import { SectionContainer } from "../SectionContainer";
import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <SectionContainer className="py-32 bg-primary/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair mb-6">Visual Storytelling</h2>
        <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Immersive brand narratives captured through the lens.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Slot 1 */}
        <div className="relative group aspect-video bg-primary/20 overflow-hidden cursor-pointer border border-primary/30 hover:border-accent/50 transition-colors">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-background/30" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm border border-accent flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-background transition-all duration-300 mb-4">
              <Play className="w-6 h-6 ml-1" />
            </div>
            <span className="font-playfair text-xl tracking-wide">Brand Anthem</span>
          </div>
        </div>

        {/* Video Slot 2 */}
        <div className="relative group aspect-video bg-primary/20 overflow-hidden cursor-pointer border border-primary/30 hover:border-accent/50 transition-colors">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2089&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-background/30" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm border border-accent flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-background transition-all duration-300 mb-4">
              <Play className="w-6 h-6 ml-1" />
            </div>
            <span className="font-playfair text-xl tracking-wide">Behind the Scenes</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
