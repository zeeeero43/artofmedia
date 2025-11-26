
import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Review {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string; // Project Image
  avatar: string; // Person Image
  company: string;
  stats: { label: string; value: string }[];
  detailText: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    text: "Der Umsatz hat sich verdoppelt! Wahnsinn, was Branding ausmacht.",
    detailText: "Nach dem Relaunch der Corporate Identity und des Webshops konnten wir eine Conversion-Steigerung von 120% messen. Das neue Design transportiert endlich unsere Premium-Werte.",
    author: "Markus Weber",
    role: "CEO",
    image: "/images/testimonials/weber-logistik-project.webp",
    avatar: "/images/testimonials/weber-logistik-avatar.webp",
    company: "Weber Logistik",
    stats: [{ label: "Umsatz", value: "+100%" }, { label: "Leads", value: "3.5x" }]
  },
  {
    id: 2,
    text: "Endlich Platz 1 bei Google. Das Telefon steht nicht mehr still.",
    detailText: "Durch technisches SEO und eine gezielte Content-Offensive dominiert PureSkin nun die lokalen Suchergebnisse. Die Terminbuchungen sind komplett automatisiert.",
    author: "Sarah Lindner",
    role: "Inhaberin",
    image: "/images/testimonials/pureskin-project.webp",
    avatar: "/images/testimonials/pureskin-avatar.jpg",
    company: "PureSkin",
    stats: [{ label: "Ranking", value: "#1" }, { label: "Traffic", value: "+450%" }]
  },
  {
    id: 3,
    text: "Unsere Flotte ist jetzt der Hingucker der Stadt. Top Folierung.",
    detailText: "Komplettes Flottenbranding für 25 Fahrzeuge. Design, Produktion und Montage aus einer Hand. Das einheitliche Auftreten hat die Markenbekanntheit massiv gesteigert.",
    author: "Jonas K.",
    role: "Geschäftsführer",
    image: "/images/testimonials/urban-retail-project.webp",
    avatar: "/images/testimonials/urban-retail-avatar.webp",
    company: "Urban Retail",
    stats: [{ label: "Fahrzeuge", value: "25" }, { label: "Sichtkontakte", value: "1M+" }]
  }
];

interface TestimonialsProps {
  onSelectReview: (id: number) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onSelectReview }) => {

  return (
    <section className="py-32 w-full bg-white border-t border-neutral-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
                <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">
                    Success Stories
                </span>
                <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl uppercase text-neutral-950 leading-[0.9]">
                    Kunden lieben<br/>Ergebnisse
                </h2>
            </div>
            <div className="hidden md:block text-neutral-500 font-medium">
                Klicken für Details
            </div>
        </div>

        {/* Modernized Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review) => (
                <motion.div 
                    key={review.id}
                    layoutId={`card-${review.id}`}
                    onClick={() => onSelectReview(review.id)}
                    className="group cursor-pointer relative h-[380px] sm:h-[420px] md:h-[450px] rounded-sm overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                    {/* Background Image */}
                    <img
                        src={review.image}
                        alt={`${review.company} - Success story showcasing ${review.stats[0].value} improvement in business results`}
                        width="1920"
                        height="1080"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                    />
                    <div className="absolute inset-0 bg-neutral-950/60 group-hover:bg-neutral-950/40 transition-colors duration-500" />

                    {/* Card Overlay Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        {/* Top Badge */}
                        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-4 group-hover:translate-y-0">
                           <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                             Verified Case
                           </span>
                        </div>

                        {/* Bottom Info */}
                        <div className="translate-y-0 transition-transform duration-500">
                            <div className="flex gap-1 text-brand mb-4">
                               {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={14} />)}
                            </div>
                            <h3 className="text-white font-display font-bold text-2xl leading-tight mb-3 line-clamp-3">
                                "{review.text}"
                            </h3>
                            
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
                                <div className="flex items-center gap-3">
                                    <img
                                      src={review.avatar}
                                      alt={`${review.author} - ${review.role} at ${review.company}`}
                                      width="40"
                                      height="40"
                                      loading="lazy"
                                      className="w-10 h-10 rounded-full border border-white/30 object-cover"
                                    />
                                    <div>
                                      <span className="block text-white text-sm font-bold">{review.company}</span>
                                      <span className="block text-neutral-400 text-xs uppercase tracking-wider">Case Study</span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand group-hover:text-neutral-950 transition-all duration-300">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};

// Separate Modal Component to be rendered at App level
interface TestimonialModalProps {
  selectedId: number | null;
  onClose: () => void;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({ selectedId, onClose }) => {
  // Body scroll lock when modal is open
  React.useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedId]);

  return (
    <AnimatePresence>
      {selectedId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm"
          />

          {reviews.map(review => review.id === selectedId && (
            <motion.div
              layoutId={`card-${review.id}`}
              key={review.id}
              className="relative w-full max-w-6xl bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto lg:overflow-hidden"
            >
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-6 right-6 z-50 bg-white rounded-full p-2 text-neutral-950 hover:bg-brand transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full lg:w-5/12 h-64 lg:h-auto relative group">
                <img
                  src={review.image}
                  alt={`${review.company} project - Detailed view of successful implementation`}
                  width="1920"
                  height="1080"
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="inline-block bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    Case Study
                  </span>
                  <h3 className="font-display font-bold text-4xl mb-2">{review.company}</h3>
                  <div className="flex gap-4 mt-4">
                    <span className="flex items-center gap-2 text-sm bg-neutral-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <Globe size={14} className="text-brand" /> Website & Branding
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-7/12 p-8 md:p-16 bg-white flex flex-col justify-center relative">
                <div className="max-w-2xl">
                  <div className="flex gap-1 text-brand mb-8">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
                  </div>

                  <h4 className="font-display font-bold text-3xl md:text-4xl mb-8 leading-tight text-neutral-950">
                    "{review.text}"
                  </h4>

                  <p className="text-lg text-neutral-600 leading-relaxed mb-12">
                    {review.detailText}
                  </p>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12">
                    {review.stats.map((stat, idx) => (
                      <div key={idx} className="bg-neutral-50 p-6 rounded-lg border border-neutral-100">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">{stat.label}</div>
                        <div className="text-3xl md:text-4xl font-display font-bold text-brand">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
                    <img
                      src={review.avatar}
                      alt={`${review.author} - ${review.role} at ${review.company}`}
                      width="56"
                      height="56"
                      loading="eager"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-neutral-950 text-lg">{review.author}</div>
                      <div className="text-sm text-neutral-500 uppercase tracking-wider font-medium">{review.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
