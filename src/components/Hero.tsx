import { motion } from 'motion/react';
import { scrollToElement } from '../utils/scroll';

export function Hero() {

  return (
    <section id="about" className="relative h-screen min-h-[600px] flex items-center justify-center pt-24 border-b border-white/5">
      {/* Background Image */}
      <div
        aria-hidden="true"
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
        className="relative z-10 text-center px-6 sm:px-8 md:px-12 max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-amber-500/80 font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 block">
          Sains Restaurant · Uhuru St, Eldoret
        </span>
        <h1 className="font-serif text-[2.75rem] leading-[1.05] sm:text-6xl sm:leading-none md:text-7xl lg:text-8xl mb-6 italic font-light">
          Farm Fresh. <br/>
          <span className="not-italic font-bold text-stone-100">Flame Grilled.</span>
        </h1>
        <p className="text-stone-400 leading-relaxed max-w-sm mx-auto mb-10 font-sans text-sm px-2">
          Rustic, open-flame dining in a beautiful shared eating space &mdash;
          serving our signature gourmet burgers, crafted to satisfy your cravings.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
          <a
            href="#reservation"
            onClick={(e) => scrollToElement(e, '#reservation')}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-[#1a1206] text-xs uppercase tracking-widest font-sans font-semibold hover:bg-amber-400 transition-all sm:min-w-[200px] text-center shadow-[0_0_30px_rgba(212,175,55,0.15)]"
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            onClick={(e) => scrollToElement(e, '#menu')}
            className="w-full sm:w-auto px-8 py-4 border border-white/15 text-stone-200 text-xs uppercase tracking-widest hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center text-center font-sans sm:min-w-[200px]"
          >
            View Menu
          </a>
        </div>
      </motion.div>
    </section>
  );
}
