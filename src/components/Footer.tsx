import { motion } from 'motion/react';
import type { MouseEvent } from 'react';

export function Footer() {
  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#' || !href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 px-12 py-16 border-t border-white/5 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left"
      >
        
        <div>
          <h4 className="font-serif text-2xl tracking-[0.2em] font-light uppercase text-white mb-6">Sains Restaurant</h4>
          <p className="text-sm font-sans leading-relaxed mb-6 text-stone-400">
            A beautiful eatery. We pride ourselves on serving freshly grilled, rustic meals in the heart of Eldoret.
          </p>
          <p className="text-[10px] font-sans uppercase tracking-widest text-stone-600">© {new Date().getFullYear()} Sains Restaurant.</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <span className="text-[9px] uppercase tracking-widest text-stone-600 mb-6 font-sans">Quick Links</span>
          <nav className="flex flex-col gap-3 font-sans text-xs opacity-60">
            <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="hover:opacity-100 transition-opacity">Home</a>
            <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:opacity-100 transition-opacity">About</a>
            <a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')} className="hover:opacity-100 transition-opacity">Menu</a>
            <a href="#reservation" onClick={(e) => handleScrollTo(e, '#reservation')} className="hover:opacity-100 transition-opacity">Reserve Table</a>
            <a href="#gallery" onClick={(e) => handleScrollTo(e, '#gallery')} className="hover:opacity-100 transition-opacity">Gallery</a>
            <a href="#faq" onClick={(e) => handleScrollTo(e, '#faq')} className="hover:opacity-100 transition-opacity">FAQ</a>
          </nav>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <span className="text-[9px] uppercase tracking-widest text-stone-600 mb-6 font-sans">Contact Info</span>
          <div className="space-y-3 text-xs font-sans text-stone-400">
            <p>Uhuru St</p>
            <p>Eldoret, Kenya</p>
            <p className="text-amber-500/80 italic pt-2 tracking-widest">0722 699910</p>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
