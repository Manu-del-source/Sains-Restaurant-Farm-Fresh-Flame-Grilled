import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuCategories, formatPrice } from '../data/menu';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filterCategories = ["All", "Burgers", "Grilled", "Drinks", "Sides"];

  const filteredCategories = activeCategory === "All" 
    ? menuCategories 
    : menuCategories.filter(cat => cat.id === activeCategory);

  return (
    <motion.section 
      id="menu" 
      className="py-24 bg-transparent border-t border-white/5 relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
        }
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center mb-16" variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
        }}>
          <span className="text-amber-500/80 font-sans text-xs uppercase tracking-[0.5em] mb-4 block">
            Freshly Prepared
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light italic text-stone-100 mb-6">Our Menu</h2>
          <div className="w-12 h-[1px] bg-amber-500/40 mx-auto mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-2" role="group" aria-label="Filter menu by category">
            {filterCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-6 py-2 text-xs uppercase tracking-widest font-sans transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
                    : 'border-white/10 text-stone-400 hover:border-white/30 hover:text-stone-200 bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-x-12 gap-y-16 min-h-[400px]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                key={category.id} 
                className={activeCategory === "All" && category.id === "Burgers" ? "md:col-span-2 max-w-2xl mx-auto w-full text-center mb-4" : (filteredCategories.length === 1 ? "md:col-span-2 max-w-2xl mx-auto w-full text-center" : "")}
              >
                 <h3 className="font-serif text-2xl font-light italic text-amber-500/90 mb-2">
                  {category.title}
                </h3>
                <p className={`text-stone-400 font-sans text-sm mb-8 ${(activeCategory === "All" && category.id === "Burgers") || filteredCategories.length === 1 ? 'max-w-md mx-auto' : 'max-w-md mx-auto md:mx-0'}`}>
                  {category.description}
                </p>
                <div className="space-y-4 mt-8">
                  {category.items.map((item) => (
                    <motion.div 
                      key={item.name} 
                      className="flex flex-col p-4 -mx-4 rounded-lg cursor-pointer"
                      whileHover={{ 
                        scale: 1.02, 
                        x: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex justify-between items-baseline mb-2 gap-2">
                        <h4 className="text-lg text-stone-200 group-hover:text-amber-400 transition-colors">{item.name}</h4>
                        <div className="flex-grow border-b border-white/5 mx-4 relative top-[-6px]"></div>
                        <span className="text-amber-500/80 font-sans text-sm uppercase tracking-widest whitespace-nowrap">{formatPrice(item.price)}</span>
                      </div>
                      <p className="text-xs text-stone-500 font-sans leading-tight italic text-left">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="mt-20 flex justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
        >
             <div className="relative w-full max-w-4xl h-[400px]">
               <div className="absolute inset-0 rounded-sm border border-white/5 shadow-[0_0_80px_rgba(212,175,55,0.05)] overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1999&auto=format&fit=crop" 
                   alt="Our Signature Burger" 
                   className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
               </div>
               
               <div className="absolute bottom-1/4 right-0 md:-right-8 bg-[#0a0a0a]/80 backdrop-blur-md p-6 border-l border-amber-500/50 w-64 shadow-2xl">
                 <div className="text-[10px] text-amber-500 uppercase tracking-widest mb-2 font-sans">Craftsmanship</div>
                 <div className="text-lg italic mb-2 text-stone-100 font-serif">Signature Boards</div>
                 <div className="text-xs text-stone-500 font-sans leading-tight italic">
                   Served perfectly to complement the rich flavors.
                 </div>
               </div>
             </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
