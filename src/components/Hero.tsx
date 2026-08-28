import { motion } from 'motion/react';
import { scrollToElement } from '../utils/scroll';

export function Hero() {

  return (
    <section id="about" className="relative h-screen min-h-[600px] flex items-center justify-center pt-24 border-b border-white/5">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2065&auto=format&fit=crop")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center px-12 max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-amber-500/80 font-sans text-xs uppercase tracking-[0.5em] mb-4 block">
          Uhuru St, Eldoret
        </span>
        <h1 className="font-serif text-6xl md:text-8xl leading-none mb-6 italic font-light">
          Farm Fresh. <br/>
          <span className="not-italic font-bold text-stone-100">Flame Grilled.</span>
        </h1>
        <p className="text-stone-400 leading-relaxed max-w-sm mx-auto mb-10 font-sans text-sm">
          Experience the finest rustic dining in a beautiful shared eating space. 
          Serving our signature gourmet burgers perfectly crafted to satisfy your cravings.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="#menu" 
            onClick={(e) => scrollToElement(e, '#menu')}
            className="px-8 py-4 bg-amber-600/20 border border-amber-500/30 text-amber-200 text-xs uppercase tracking-widest hover:bg-amber-600/30 transition-all font-sans min-w-[200px]"
          >
            View Menu
          </a>
          <a 
            href="#location" 
            onClick={(e) => scrollToElement(e, '#location')}
            className="px-8 py-4 border border-white/10 text-stone-300 text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center text-center font-sans min-w-[200px]"
          >
            Find Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
