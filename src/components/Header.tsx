import { Menu, Phone, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { scrollToElement } from '../utils/scroll';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'menu', 'reservation', 'gallery', 'faq'];
      const scrollPosition = window.scrollY + 200; // Offset for header height

      setIsScrolled(window.scrollY > 24);

      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    scrollToElement(e, href);
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reserve', href: '#reservation' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 text-stone-200 backdrop-blur-md transition-colors duration-300 ${
      isScrolled ? 'bg-[#080808]/95 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-[#080808]/70 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="font-serif text-xl md:text-2xl tracking-[0.2em] font-light uppercase flex items-center gap-2">
          Sains Restaurant
        </a>
        
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] font-sans">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)} 
              className={`relative transition-all duration-300 py-2 ${
                activeSection === item.href.slice(1) 
                  ? 'text-amber-500 opacity-100 font-medium' 
                  : 'text-stone-200 opacity-60 hover:opacity-100'
              }`}
            >
              {item.name}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-amber-500"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a 
            href="tel:0722699910" 
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-amber-600/20 border border-amber-500/30 text-amber-200 text-xs uppercase tracking-widest hover:bg-amber-600/30 transition-all font-sans"
          >
            <Phone size={14} className="opacity-80" />
            <span>0722 699910</span>
          </a>
          <div className="hidden lg:block w-12 h-[1px] bg-amber-500/40"></div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2.5 -mr-2.5 text-stone-300 hover:text-white opacity-80 hover:opacity-100 transition-opacity z-50"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 md:top-24 left-0 right-0 bg-[#080808]/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col shadow-2xl md:hidden"
          >
            <nav className="flex flex-col gap-6 text-sm uppercase tracking-[0.3em] font-sans text-center py-4">
              {navItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)} 
                  className={`transition-colors py-2 ${
                    activeSection === item.href.slice(1)
                      ? 'text-amber-500 opacity-100 font-medium'
                      : 'text-stone-200 opacity-80 hover:text-amber-500'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="w-full h-[1px] bg-white/5 my-4"></div>
            <a 
              href="tel:0722699910" 
              className="flex items-center justify-center gap-2 px-6 py-4 bg-amber-600/20 border border-amber-500/30 text-amber-200 text-xs uppercase tracking-widest hover:bg-amber-600/30 transition-all font-sans text-center mb-2"
            >
              <Phone size={16} className="opacity-80" />
              <span>Call 0722 699910</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
