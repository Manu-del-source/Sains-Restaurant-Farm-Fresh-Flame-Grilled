import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "What are your opening hours?",
      answer: "We are open from Monday to Saturday, 11:00 AM to 11:00 PM. We are closed on Sundays. Please note that our kitchen closes at 10:30 PM."
    },
    {
      question: "Where exactly are you located?",
      answer: "We are located at Uhuru St in Eldoret, Kenya."
    },
    {
      question: "Do I need to make a reservation?",
      answer: "While we always welcome walk-in guests, we highly recommend making a reservation for weekends and large groups to ensure you get a table. You can book easily by calling us or sending a message on WhatsApp."
    },
    {
      question: "Do you cater to specific dietary requirements?",
      answer: "Yes, we offer a variety of options and can usually accommodate most dietary requirements, including vegetarian preferences. Please inform our staff of any allergies when you place your order."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section 
      id="faq" 
      className="py-24 border-t border-white/5 relative z-10 bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-amber-500/80 font-sans text-xs uppercase tracking-[0.5em] mb-4 block">
            Information
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light italic text-stone-100 mb-6">Frequently Asked Questions</h2>
          <div className="w-12 h-[1px] bg-amber-500/40 mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 rounded-sm bg-[#0a0a0a]/50 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-300 group"
              >
                <span className={`font-serif text-lg tracking-wide transition-colors ${openIndex === index ? 'text-amber-400' : 'text-stone-200 group-hover:text-amber-400'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-amber-500/80 flex-shrink-0 ml-4"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-stone-400 font-sans font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
