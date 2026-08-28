import { useState } from 'react';
import { Clock, MapPin, Phone, Star, ChefHat, Sparkles, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function InfoSection() {
  const [isChefModalOpen, setIsChefModalOpen] = useState(false);

  return (
    <motion.section 
      id="location" 
      className="py-24 border-y border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm relative z-10"
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
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Details */}
          <motion.div className="space-y-10" variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}>
            <div>
              <h2 className="font-serif text-3xl font-light italic text-stone-100 mb-4">Visit Sains Restaurant</h2>
              <div className="w-12 h-[1px] bg-amber-500/40 mb-6"></div>
              <p className="text-stone-400 font-sans text-sm leading-relaxed">
                Located in the heart of Eldoret at Uhuru St. We offer a wonderful ambiance with a shared eating space, perfect for relaxing with friends and family over a delicious hot meal.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="border border-white/5 bg-[#080808] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.05)] text-amber-500/60 mt-1">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-stone-100 mb-1">Location</h3>
                  <p className="text-stone-400 font-sans text-sm">Uhuru St</p>
                  <p className="text-stone-400 font-sans text-sm">Eldoret, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border border-white/5 bg-[#080808] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.05)] text-amber-500/60 mt-1">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-stone-100 mb-1">Hours</h3>
                  <p className="text-stone-400 font-sans text-sm">Mon - Sat: 11:00 - 23:00</p>
                  <p className="text-stone-400 font-sans text-sm">Sun: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border border-white/5 bg-[#080808] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.05)] text-amber-500/60 mt-1">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-stone-100 mb-1">Contact</h3>
                  <p className="text-stone-400 font-sans text-sm italic">0722 699910</p>
                </div>
              </div>
            </div>

            {/* About the Chef Spotlight Teaser */}
            <div className="bg-[#0f0f0f] border border-amber-500/20 p-6 rounded-sm relative shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:border-amber-500/40 transition-all">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-500/30 flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                  alt="Executive Chef" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <ChefHat size={16} className="text-amber-500" />
                  <span className="text-[10px] text-amber-500 uppercase tracking-[0.2em] font-sans">Master Culinary Art</span>
                </div>
                <h3 className="font-serif text-xl text-stone-100 font-light">Chef Sain & Culinary Team</h3>
                <p className="text-stone-400 font-sans text-xs mt-1 line-clamp-2">
                  Bringing over 15 years of open-flame grilling passion and farm-fresh Kenyan ingredients to your table.
                </p>
                <button
                  type="button"
                  onClick={() => setIsChefModalOpen(true)}
                  className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 font-sans transition-colors group-hover:translate-x-1 duration-300 cursor-pointer"
                >
                  <span>Meet Our Culinary Team</span>
                  <Sparkles size={12} />
                </button>
              </div>
            </div>
            
            {/* Review Highlight */}
            <div className="bg-[#0a0a0a]/80 p-6 rounded-sm border border-white/5 relative shadow-2xl">
              <Star className="absolute top-6 right-6 text-amber-500/40 fill-amber-500/10" strokeWidth={1} size={24} />
              <div className="flex gap-1 text-amber-500/80 mb-4 opacity-80">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
              </div>
              <p className="italic text-stone-300 font-serif leading-relaxed">"Seriously good food at a greta price."</p>
              <p className="text-[10px] text-amber-500/60 font-sans uppercase tracking-[0.2em] mt-4">— Google Review</p>
            </div>

          </motion.div>

          {/* Picture Grid Layout */}
          <motion.div className="grid grid-cols-2 gap-4 h-[600px]" variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}>
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop" 
              alt="Restaurant entrance" 
              className="w-full h-full object-cover rounded-tl-[4rem] rounded-br-[4rem] shadow-lg opacity-80 mix-blend-overlay"
            />
            <div className="grid grid-rows-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2070&auto=format&fit=crop" 
                alt="Chicken and rice bowl" 
                className="w-full h-full object-cover rounded-tr-[4rem] shadow-lg opacity-80 mix-blend-overlay"
              />
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" 
                alt="Fresh salad side" 
                className="w-full h-full object-cover rounded-bl-[4rem] shadow-lg opacity-80 mix-blend-overlay"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Culinary Team Modal */}
      <AnimatePresence>
        {isChefModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChefModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-[#0f0f0f] border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl z-10 my-8 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setIsChefModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-stone-400 hover:text-white border border-white/10 hover:border-amber-500/50 rounded-full transition-colors bg-[#181818] cursor-pointer"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-amber-500 font-sans text-xs uppercase tracking-[0.3em] mb-2">
                <ChefHat size={16} />
                <span>Culinary Craftsmanship</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light italic mb-4">
                Meet Chef Sain & Culinary Team
              </h2>
              <div className="w-12 h-[1px] bg-amber-500/40 mb-6"></div>

              <div className="space-y-6 text-stone-300 font-sans text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid sm:grid-cols-3 gap-6 items-center">
                  <div className="sm:col-span-1 aspect-square rounded-sm overflow-hidden border border-amber-500/30 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                      alt="Chef Sain" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <h3 className="font-serif text-xl text-amber-300">Chef Sain</h3>
                    <p className="text-xs text-amber-500/80 uppercase tracking-widest font-sans">Executive Chef & Founder</p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      "Grilling isn't just cooking; it's an art of timing, temperature, and honoring honest ingredients. Every flame-seared cut tells a story of local heritage."
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="font-serif text-lg text-stone-200">Our Culinary Philosophy</h4>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    At Sains Restaurant, our kitchen is led by a passionate team of artisans dedicated to perfecting rustic flame-grilled delicacies. We source our produce directly from trusted local Eldoret farmers and select prime cuts to ensure exceptional quality in every bite.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="bg-[#141414] border border-white/5 p-4 rounded-sm">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Award size={16} />
                      <span className="font-serif text-sm">Flame-Grill Specialists</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Mastering open-wood embers and custom spice marinades refined over a decade.
                    </p>
                  </div>
                  <div className="bg-[#141414] border border-white/5 p-4 rounded-sm">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Sparkles size={16} />
                      <span className="font-serif text-sm">Farm-Fresh Commitment</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Daily organic harvests from Rift Valley suppliers delivered straight to our kitchen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsChefModalOpen(false)}
                  className="px-6 py-3 bg-amber-600/20 border border-amber-500/40 text-amber-200 text-xs uppercase tracking-widest hover:bg-amber-600/30 transition-all font-sans cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

