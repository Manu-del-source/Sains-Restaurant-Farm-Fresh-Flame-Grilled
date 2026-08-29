import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, User, CheckCircle2, Phone, Sparkles, Trash2, AlertCircle } from 'lucide-react';

interface ReservationItem {
  id: string;
  name: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
  createdAt: string;
}

export function Reservation() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [submittedReservation, setSubmittedReservation] = useState<ReservationItem | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [reservationsList, setReservationsList] = useState<ReservationItem[]>(() => {
    try {
      const saved = localStorage.getItem('sains_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    try {
      localStorage.setItem('sains_reservations', JSON.stringify(reservationsList));
    } catch (err) {
      console.error('Failed to save reservations to local storage:', err);
    }
  }, [reservationsList]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!date) {
      newErrors.date = 'Please select a date';
    }

    if (!time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      const newReservation: ReservationItem = {
        id: Date.now().toString(),
        name,
        phone,
        date,
        time,
        partySize: parseInt(partySize, 10),
        specialRequests,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setReservationsList(prev => [newReservation, ...prev]);
      setSubmittedReservation(newReservation);
      setIsSuccess(true);
      setIsSubmitting(false);

      // Reset form
      setName('');
      setPhone('');
      setDate('');
      setTime('');
      setPartySize('2');
      setSpecialRequests('');
      setErrors({});
    }, 1200);
  };

  const handleCancelReservation = (id: string) => {
    setReservationsList(prev => prev.filter(res => res.id !== id));
    if (submittedReservation?.id === id) {
      setSubmittedReservation(null);
      setIsSuccess(false);
    }
  };

  const handleBookAnother = () => {
    setIsSuccess(false);
    setSubmittedReservation(null);
  };

  return (
    <motion.section 
      id="reservation" 
      className="py-24 border-t border-white/5 relative z-10 bg-[#0a0a0a]/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-amber-500/80 font-sans text-xs uppercase tracking-[0.5em] mb-4 block">
            Table Booking
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light italic text-stone-100 mb-6">
            Reserve a Table
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/40 mx-auto mb-6"></div>
          <p className="text-stone-400 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Join us for an unforgettable dining experience at Sains Restaurant. Select your party details below.
          </p>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {isSuccess && submittedReservation ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                role="status"
                aria-live="polite"
                className="bg-[#0f0f0f] border border-amber-500/30 p-8 sm:p-12 shadow-2xl text-center absolute inset-0 flex flex-col justify-center items-center"
              >
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  >
                    <CheckCircle2 size={40} className="text-amber-500" />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-amber-500/50"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                </div>
                
                <h3 className="font-serif text-3xl font-light italic text-stone-100 mb-6">
                  Request Received
                </h3>
                
                <div className="space-y-3 mb-6 font-sans text-stone-300 text-sm max-w-sm mx-auto bg-[#181818] p-6 rounded-lg border border-white/5">
                  <p>Thank you, <strong className="text-white">{submittedReservation.name}</strong>.</p>
                  <p>We've noted your request for a party of <strong className="text-amber-400">{submittedReservation.partySize}</strong>.</p>
                  <p>Preferred time: <strong className="text-white">{submittedReservation.date}</strong> at <strong className="text-white">{submittedReservation.time}</strong>.</p>
                </div>

                <p className="text-stone-500 font-sans text-xs max-w-sm mx-auto mb-10 leading-relaxed">
                  This confirms we've received your request &mdash; a member of our team will call or WhatsApp you at{' '}
                  <strong className="text-stone-300">{submittedReservation.phone}</strong> shortly to finalize your table.
                </p>
                
                <button
                  onClick={handleBookAnother}
                  className="px-8 py-4 bg-amber-600/30 border border-amber-500/50 text-amber-200 text-xs uppercase tracking-[0.25em] font-sans font-medium hover:bg-amber-600/40 hover:border-amber-400 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Book Another Table
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="bg-[#0f0f0f] border border-white/10 p-8 md:p-12 shadow-2xl relative"
                noValidate
              >
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="res-name" className="block text-xs uppercase tracking-widest font-sans text-stone-400 mb-2 flex items-center gap-2">
                      <User size={14} className={errors.name ? "text-red-400" : "text-amber-500/80"} />
                      <span className={errors.name ? "text-red-400" : ""}>Full Name *</span>
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="John Doe"
                      className={`w-full bg-[#181818] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} px-4 py-3 text-stone-200 text-sm font-sans focus:outline-none focus:border-amber-500/60 transition-colors`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 flex items-center gap-1.5 text-xs font-sans mt-2">
                          <AlertCircle size={12} /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="res-phone" className="block text-xs uppercase tracking-widest font-sans text-stone-400 mb-2 flex items-center gap-2">
                      <Phone size={14} className={errors.phone ? "text-red-400" : "text-amber-500/80"} />
                      <span className={errors.phone ? "text-red-400" : ""}>Phone Number *</span>
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="0722 000000"
                      className={`w-full bg-[#181818] border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} px-4 py-3 text-stone-200 text-sm font-sans focus:outline-none focus:border-amber-500/60 transition-colors`}
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 flex items-center gap-1.5 text-xs font-sans mt-2">
                          <AlertCircle size={12} /> {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="res-date" className="block text-xs uppercase tracking-widest font-sans text-stone-400 mb-2 flex items-center gap-2">
                      <Calendar size={14} className={errors.date ? "text-red-400" : "text-amber-500/80"} />
                      <span className={errors.date ? "text-red-400" : ""}>Date *</span>
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                      }}
                      className={`w-full bg-[#181818] border ${errors.date ? 'border-red-500/50' : 'border-white/10'} px-4 py-3 text-stone-200 text-sm font-sans focus:outline-none focus:border-amber-500/60 transition-colors [color-scheme:dark]`}
                    />
                    <AnimatePresence>
                      {errors.date && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 flex items-center gap-1.5 text-xs font-sans mt-2">
                          <AlertCircle size={12} /> {errors.date}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="res-time" className="block text-xs uppercase tracking-widest font-sans text-stone-400 mb-2 flex items-center gap-2">
                      <Clock size={14} className={errors.time ? "text-red-400" : "text-amber-500/80"} />
                      <span className={errors.time ? "text-red-400" : ""}>Time *</span>
                    </label>
                    <select
                      id="res-time"
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                      }}
                      className={`w-full bg-[#181818] border ${errors.time ? 'border-red-500/50' : 'border-white/10'} px-4 py-3 text-stone-200 text-sm font-sans focus:outline-none focus:border-amber-500/60 transition-colors`}
                    >
                      <option value="">Select Time</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:30 PM">09:30 PM</option>
                    </select>
                    <AnimatePresence>
                      {errors.time && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 flex items-center gap-1.5 text-xs font-sans mt-2">
                          <AlertCircle size={12} /> {errors.time}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Party Size */}
                  <div className="md:col-span-2">
                    <label htmlFor="res-party" className="block text-xs uppercase tracking-widest font-sans text-stone-400 mb-2 flex items-center gap-2">
                      <Users size={14} className="text-amber-500/80" />
                      <span>Party Size *</span>
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {['1', '2', '3', '4', '5', '6', '8', '10+'].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setPartySize(num)}
                          className={`py-3 text-sm font-sans uppercase border transition-all ${
                            partySize === num
                              ? 'border-amber-500/60 bg-amber-500/10 text-amber-300 font-semibold shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                              : 'border-white/10 bg-[#181818] text-stone-400 hover:text-stone-200 hover:border-white/20 hover:bg-[#202020]'
                          }`}
                        >
                          {num} {num === '1' ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="md:col-span-2">
                    <label htmlFor="res-requests" className="block text-xs uppercase tracking-widest font-sans text-stone-400 mb-2 flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-500/80" />
                      <span>Special Requests (Optional)</span>
                    </label>
                    <textarea
                      id="res-requests"
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Dietary requirements, birthday celebration, high chair needed, etc."
                      className="w-full bg-[#181818] border border-white/10 px-4 py-3 text-stone-200 text-sm font-sans focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
                    ></textarea>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-4 bg-amber-600/30 border border-amber-500/50 text-amber-200 text-xs uppercase tracking-[0.25em] font-sans font-medium hover:bg-amber-600/40 hover:border-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-amber-200/30 border-t-amber-200 rounded-full animate-spin"></div>
                      Sending Request...
                    </>
                  ) : (
                    'Send Reservation Request'
                  )}
                </button>

                <p className="text-center text-[11px] text-stone-500 font-sans mt-4 leading-relaxed">
                  This sends a request, not a guaranteed table &mdash; our team will call or WhatsApp you to confirm.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Local Saved Reservations List */}
        {reservationsList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-20 border-t border-white/5 pt-12"
          >
            <h3 className="font-serif text-2xl font-light italic text-stone-200 mb-2 text-center">
              Your Requests ({reservationsList.length})
            </h3>
            <p className="text-center text-xs text-stone-500 font-sans mb-8">
              Saved on this device only &mdash; not yet confirmed by the restaurant.
            </p>
            <div className="space-y-4">
              {reservationsList.map((res) => (
                <div 
                  key={res.id} 
                  className="bg-[#0f0f0f] border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-amber-500/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg text-amber-400">{res.name}</span>
                      <span className="text-[10px] font-sans text-stone-500 uppercase tracking-widest px-2 py-0.5 border border-white/10 rounded-full bg-[#181818]">
                        Party of {res.partySize}
                      </span>
                    </div>
                    <p className="text-sm font-sans text-stone-300 flex items-center gap-2">
                      <Calendar size={12} className="text-amber-500/50" /> {res.date} at {res.time}
                    </p>
                    {res.phone && (
                      <p className="text-xs font-sans text-stone-500 flex items-center gap-2">
                        <Phone size={12} className="text-amber-500/50" /> {res.phone}
                      </p>
                    )}
                    {res.specialRequests && (
                      <p className="text-xs font-sans text-stone-400 italic mt-2 border-l-2 border-amber-500/30 pl-2">
                        "{res.specialRequests}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleCancelReservation(res.id)}
                    className="self-start md:self-center flex items-center gap-2 px-3 py-2 border border-red-500/20 text-red-400/70 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10 text-[10px] uppercase tracking-widest transition-all rounded-sm"
                    title="Cancel Reservation"
                  >
                    <Trash2 size={12} />
                    <span>Cancel</span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}
