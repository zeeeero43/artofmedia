
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInterest?: string;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, selectedInterest }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: selectedInterest || 'Allgemeine Anfrage',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          interest: selectedInterest || 'Allgemeine Anfrage',
          message: '',
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
           />

           {/* Modal Content */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
           >
             <button
               onClick={onClose}
               className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-neutral-100 rounded-full transition-colors md:text-neutral-500 text-white"
             >
               <X size={24} />
             </button>

             {/* Left Side: Info (Dark) */}
             <div className="w-full md:w-2/5 bg-neutral-950 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
                {/* Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-10">
                    <span className="text-brand font-mono text-xs uppercase tracking-widest mb-2 block">Let's talk</span>
                    <h3 className="font-display font-bold text-3xl md:text-4xl mb-4">Kontakt</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Lassen Sie uns über Ihr Projekt sprechen.<br/>
                      Unverbindlich, direkt und auf Augenhöhe.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-white/5 rounded-lg text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Telefon</div>
                        <a href="tel:+491758000447" className="text-lg font-medium hover:text-brand transition-colors">+49 (0) 175 8000 447</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                       <div className="p-3 bg-white/5 rounded-lg text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">E-Mail</div>
                        <a href="mailto:info@artofmedia-marketing.de" className="text-lg font-medium hover:text-brand transition-colors">info@artofmedia-marketing.de</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                       <div className="p-3 bg-white/5 rounded-lg text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                        <MapPin size={20} />
                      </div>
                       <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Standort</div>
                        <p className="text-lg font-medium">Duisburg</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10">
                   <p className="text-xs text-neutral-500 uppercase tracking-widest">
                     Mo - Fr: 09:00 - 18:00 Uhr
                   </p>
                </div>
             </div>

             {/* Right Side: Form (Light) */}
             <div className="w-full md:w-3/5 p-8 md:p-12 bg-white">
                <h3 className="font-display font-bold text-2xl mb-8 text-neutral-950">Nachricht senden</h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-brand transition-colors bg-transparent placeholder-neutral-300 text-neutral-900 font-medium"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Firma</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-brand transition-colors bg-transparent placeholder-neutral-300 text-neutral-900 font-medium"
                        placeholder="Muster GmbH"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">E-Mail *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-brand transition-colors bg-transparent placeholder-neutral-300 text-neutral-900 font-medium"
                        placeholder="max@muster.de"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-brand transition-colors bg-transparent placeholder-neutral-300 text-neutral-900 font-medium"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Interesse</label>
                      <div className="relative">
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-brand transition-colors bg-transparent text-neutral-900 font-medium appearance-none cursor-pointer"
                        >
                            <option>Webdesign & E-Commerce</option>
                            <option>KI Automatisierungen</option>
                            <option>Werbetechnik & Print</option>
                            <option>Branding & Strategie</option>
                            <option>Allgemeine Anfrage</option>
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">▼</div>
                      </div>
                  </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Nachricht *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-brand transition-colors bg-transparent placeholder-neutral-300 text-neutral-900 font-medium resize-none h-24"
                        placeholder="Wie können wir helfen?"
                      />
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded text-red-700"
                    >
                      <AlertCircle size={20} />
                      <span className="text-sm">{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded text-green-700"
                    >
                      <CheckCircle size={20} />
                      <span className="text-sm">Nachricht erfolgreich gesendet!</span>
                    </motion.div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neutral-950 text-white py-4 font-display font-bold uppercase tracking-widest hover:bg-brand hover:text-neutral-950 transition-all flex items-center justify-center gap-3 group shadow-lg hover:shadow-[0_0_20px_rgba(0,255,41,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'} {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </form>
             </div>

           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
