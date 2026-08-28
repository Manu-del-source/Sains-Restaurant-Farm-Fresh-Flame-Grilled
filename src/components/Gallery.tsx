import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
      alt: "Sains Restaurant Storefront"
    },
    {
      src: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=2080&auto=format&fit=crop",
      alt: "Signature Burger"
    },
    {
      src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop",
      alt: "Shared Ambiance"
    },
    {
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      alt: "Gourmet Flavors"
    },
    {
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
      alt: "Restaurant Seating"
    },
    {
      src: "https://images.unsplash.com/photo-1574676648729-d5964fdeda0d?q=80&w=2070&auto=format&fit=crop",
      alt: "Outdoor Patio Setup"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.section 
      id="gallery" 
      className="py-24 border-t border-white/5 relative z-10 bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16" variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
        }}>
          <span className="text-amber-500/80 font-sans text-xs uppercase tracking-[0.5em] mb-4 block">
            Atmosphere
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light italic text-stone-100 mb-6">Gallery</h2>
          <div className="w-12 h-[1px] bg-amber-500/40 mx-auto"></div>
        </motion.div>

        <motion.div 
          className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-sm border border-white/5 shadow-2xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={images[currentIndex].src} 
                alt={images[currentIndex].alt} 
                className="w-full h-full object-cover opacity-80 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-20">
                <span className="text-amber-400 font-sans text-sm md:text-base uppercase tracking-[0.2em] font-medium bg-black/50 px-4 py-2 rounded-sm backdrop-blur-sm border border-white/20">
                  {images[currentIndex].alt}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-4 p-3 bg-black/40 backdrop-blur-md border border-white/20 text-stone-100 rounded-full hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-4 p-3 bg-black/40 backdrop-blur-md border border-white/20 text-stone-100 rounded-full hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 border border-white/20 ${
                  idx === currentIndex 
                    ? 'w-8 bg-amber-500' 
                    : 'w-2 bg-stone-500/50 hover:bg-stone-400'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
