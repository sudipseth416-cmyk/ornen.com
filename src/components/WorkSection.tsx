'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    number: "01",
    category: "Premium Restaurant",
    name: "Cafe Adda",
    description: "A premium multi-page restaurant website in Howrah with full menu, table booking, gallery, reviews and WhatsApp integration.",
    tags: ["Multi-Page", "Booking System", "Menu", "Gallery", "Google Rating", "WhatsApp CTA"],
    link: "https://cafe-adda-psi.vercel.app/",
    video: "https://media.githubusercontent.com/media/sudipseth416-cmyk/ornen.com/main/public/cafeadda.mp4"
  },
  {
    number: "02",
    category: "Pure Veg Restaurant",
    name: "Oro Café & Lounge",
    description: "A clean premium website for a pure veg restaurant in Girish Park, Kolkata with menu, location and brand showcase.",
    tags: ["Restaurant Website", "Menu Display", "Brand Design", "Mobile Responsive"],
    link: "https://oro-cafe-lounge-fcld.vercel.app/",
    video: "https://media.githubusercontent.com/media/sudipseth416-cmyk/ornen.com/main/public/orocafe.mp4"
  },
  {
    number: "03",
    category: "Heritage Cafe",
    name: "Café Coutume",
    description: "A Bengali heritage cafe in Konnagar, Hooghly. Built with table reservation system, Swiggy and Zomato integration, menu showcase, customer reviews and Google Maps.",
    tags: ["Web Design", "Table Reservation", "Swiggy & Zomato", "Menu Display", "Mobile Responsive"],
    link: "https://cafe-coutume.vercel.app/",
    video: "https://media.githubusercontent.com/media/sudipseth416-cmyk/ornen.com/main/public/cafecoutume.mp4"
  }
];

export default function WorkSection() {
  return (
    <section id="work" className="w-full bg-[#0a0a0a] py-24 md:py-32">
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
              02 &mdash; Selected Work
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Real websites, shipped and live.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#888888] text-lg md:text-xl font-light max-w-2xl"
          >
            A selection of websites we have built for hospitality businesses.
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="w-full bg-[#111111] p-8 md:p-12 lg:p-16 rounded-xl border border-transparent border-b-2 hover:border-b-[var(--gold)] transition-all duration-500 group flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
            >
              
              {/* Large Muted Number */}
              <div className="hidden lg:block flex-none">
                <span 
                  className="text-8xl xl:text-9xl font-bold text-[#1a1a1a] leading-none select-none transition-colors duration-500 group-hover:text-[#222222]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {project.number}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex-1 flex flex-col w-full">
                
                {/* Header (Mobile Number, Category, Live Badge) */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span 
                    className="lg:hidden text-5xl font-bold text-[#222222] mr-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.number}
                  </span>
                  <span className="text-[var(--gold)] text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-green-500 text-[10px] font-bold tracking-widest uppercase">Live</span>
                  </div>
                </div>
                
                {/* Video Preview */}
                {project.video && (
                  <div className="w-full aspect-video mb-8 rounded-lg overflow-hidden border border-[var(--gold)]/20 relative group/video">
                    <video 
                      src={project.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/video:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </div>
                )}

                {/* Body (Title, Desc, Button) */}
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8 mb-8">
                  <div className="flex flex-col gap-4 max-w-3xl">
                    <h3 
                      className="text-3xl md:text-4xl text-white font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-[#888888] text-base md:text-lg leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex-none">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0a0a0a] transition-colors rounded tracking-wide font-semibold text-sm w-full xl:w-auto"
                    >
                      View Live Site &rarr;
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-2 rounded-full border border-[var(--gold)]/30 text-[#aaaaaa] text-xs font-medium uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
