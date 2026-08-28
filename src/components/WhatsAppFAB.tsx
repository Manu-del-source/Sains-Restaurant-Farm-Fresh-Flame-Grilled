import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppFAB() {
  const whatsappUrl = "https://wa.me/254722699910?text=Hello%2C%20I%20would%20like%20to%20make%20an%20inquiry%20at%20Sains%20Restaurant.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center gap-3 px-4 py-3 md:px-6 md:py-4 bg-[#0a0a0a]/90 backdrop-blur-md border border-emerald-500/30 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.15)] text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all group cursor-pointer"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={20} strokeWidth={1.5} className="relative z-10" />
        <span className="absolute h-full w-full rounded-full bg-emerald-500/40 opacity-0 group-hover:animate-ping"></span>
      </div>
      <span className="font-sans text-[10px] uppercase tracking-[0.2em] hidden sm:block">WhatsApp</span>
    </motion.a>
  );
}
