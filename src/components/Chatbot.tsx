import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm the Sains Restaurant assistant. How can I help you today?" }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input.trim() }] };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages([...newMessages, { role: 'model', parts: [{ text: data.text }] }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'model', parts: [{ text: "I'm sorry, I encountered an error. Please try again later." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex items-center justify-center p-4 bg-[#080808] border border-amber-500/50 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)] text-amber-400 hover:text-amber-300 hover:bg-[#181818] transition-colors cursor-pointer"
            aria-label="Open chat"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] flex flex-col bg-[#0f0f0f] border border-stone-800 rounded-xl shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50">
                  <MessageCircle size={16} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="font-serif text-stone-200 text-sm tracking-widest uppercase">Sains Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-200 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-amber-500/20 text-amber-50 border border-amber-500/30 rounded-br-sm'
                        : 'bg-[#181818] text-stone-200 border border-stone-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#181818] border border-stone-800 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 size={16} className="text-amber-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#080808] border-t border-stone-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our menu, hours..."
                className="flex-1 bg-[#141414] border border-stone-800 rounded-full px-4 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
