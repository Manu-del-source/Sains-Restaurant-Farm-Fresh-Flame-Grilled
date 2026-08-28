import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Menu } from './components/Menu';
import { Reservation } from './components/Reservation';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { Chatbot } from './components/Chatbot';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen font-serif text-stone-200 bg-[#080808] overflow-x-hidden selection:bg-amber-500/30 relative flex flex-col">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Atmospheric Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-orange-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] rounded-full bg-amber-900/10 blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800/10 to-transparent opacity-50"></div>
      </div>

      {/* Global Shadow Overlay for Mood */}
      <div className="fixed inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-50 mix-blend-multiply opacity-40"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <InfoSection />
          <Menu />
          <Reservation />
          <Gallery />
          <FAQ />
        </main>
        <Footer />
        <WhatsAppFAB />
        <Chatbot />
      </div>
    </div>
  );
}
