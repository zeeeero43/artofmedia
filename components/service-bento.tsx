
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Lightbulb, Monitor, ShoppingBag, Cpu,
  Printer, Layers, Zap, Maximize, Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ServiceItem, ServiceCategory } from '../types';

export const serviceData: Record<ServiceCategory, ServiceItem[]> = {
  digital: [
    {
      id: 'd-web',
      title: 'Webdesign & E-Commerce',
      description: 'Websites und Shops, die verkaufen. 24/7, ohne dass du am Telefon sein musst.',
      icon: Monitor,
      category: 'digital',
      cols: 1,
      image: '/images/services/webdesign-ecommerce-optimized.webp',
      srcSet: '/images/services/webdesign-ecommerce-640w.webp 640w, /images/services/webdesign-ecommerce-1024w.webp 1024w, /images/services/webdesign-ecommerce-1920w.webp 1920w',
      href: '/webdesign-ecommerce'
    },
    {
      id: 'd-google',
      title: 'Google Marketing',
      description: 'Google Ads, SEO & lokale Suchmaschinenoptimierung. Gefunden werden, wenn Kunden suchen.',
      icon: Search,
      category: 'digital',
      cols: 1,
      image: '/images/services/google-marketing-optimized.webp',
      srcSet: '/images/services/google-marketing-640w.webp 640w, /images/services/google-marketing-1024w.webp 1024w, /images/services/google-marketing-1920w.webp 1920w',
      href: '/google-marketing'
    },
    {
      id: 'd-ki',
      title: 'KI Automatisierungen',
      description: 'Intelligente Systeme, die für dich arbeiten. Automatisierung, die Zeit und Geld spart.',
      icon: Cpu,
      category: 'digital',
      cols: 1,
      image: '/images/services/ki-automatisierungen-optimized.webp',
      srcSet: '/images/services/ki-automatisierungen-640w.webp 640w, /images/services/ki-automatisierungen-1024w.webp 1024w, /images/services/ki-automatisierungen-1920w.webp 1920w',
      href: '/ki-automatisierungen'
    },
    {
      id: 'd-consulting',
      title: 'Beratung & Strategie',
      description: 'Strategie, die Geld bringt. Wir finden heraus, wo du Kunden verlierst.',
      icon: Lightbulb,
      category: 'digital',
      cols: 1,
      image: '/images/services/beratung-strategie-optimized.webp',
      srcSet: '/images/services/beratung-strategie-640w.webp 640w, /images/services/beratung-strategie-1024w.webp 1024w, /images/services/beratung-strategie-1920w.webp 1920w',
      href: '/beratung-strategie'
    }
  ],
  physical: [
    {
      id: 'p-print-werbe',
      title: 'Print, Folien-& Werbetechnik',
      description: 'Magazine, Aufkleber, Car-Wrapping, Schilder und Wandbilder. Die feine Art zu drucken.',
      icon: Printer,
      category: 'physical',
      cols: 2,
      image: '/images/services/print-folie-optimized.webp',
      srcSet: '/images/services/print-folie-640w.webp 640w, /images/services/print-folie-1024w.webp 1024w, /images/services/print-folie-1920w.webp 1920w',
      href: '/print-folie'
    },
    {
      id: 'p-light',
      title: 'Licht-& Leuchttechnik',
      description: 'Leuchtbuchstaben, LED-Videowände und Infowalls. Gestalte dein Logo in Licht-& Videokunst.',
      icon: Zap,
      category: 'physical',
      cols: 2,
      image: '/images/services/licht-leuchttechnik-optimized.webp',
      srcSet: '/images/services/licht-leuchttechnik-640w.webp 640w, /images/services/licht-leuchttechnik-1024w.webp 1024w, /images/services/licht-leuchttechnik-1920w.webp 1920w',
      href: '/licht-leuchttechnik'
    }
  ]
};

interface ServiceBentoProps {
  activeMode: ServiceCategory;
}

export const ServiceBento: React.FC<ServiceBentoProps> = ({ activeMode }) => {
  return (
    <section className="py-24 px-6 w-full flex flex-col items-center bg-neutral-50/50 border-b border-neutral-200">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 auto-rows-[320px] sm:auto-rows-[380px] md:auto-rows-[420px] gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {serviceData[activeMode].map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Card: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const MotionLink = motion.create(Link);

  const cardContent = (
    <>
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={item.image}
          srcSet={item.srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
          alt={`${item.title} - Professional service showcasing modern ${item.category === 'digital' ? 'digital solutions' : 'physical branding'}`}
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40 grayscale group-hover:grayscale-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10 z-10 flex flex-col items-start">
        <div className="mb-6 text-brand opacity-80 group-hover:opacity-100 transition-opacity">
           <item.icon className="w-10 h-10" strokeWidth={1} />
        </div>

        <h3 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4 group-hover:text-brand transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-neutral-400 text-sm md:text-base font-medium leading-relaxed max-w-[90%] group-hover:text-white transition-colors">
          {item.description}
        </p>

        <div className="absolute top-8 right-8 p-3 rounded-full border border-white/20 text-white opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-neutral-950/50 backdrop-blur-md">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </>
  );

  if (item.href) {
    return (
      <MotionLink
        to={item.href}
        layoutId={item.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(
          "group relative overflow-hidden bg-neutral-950 shadow-sm transition-all duration-500 hover:z-10 border-2 border-transparent hover:border-brand block",
          item.cols === 2 ? "md:col-span-2" : "md:col-span-1",
          "cursor-pointer"
        )}
      >
        {cardContent}
      </MotionLink>
    );
  }

  return (
    <motion.div
      layoutId={item.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "group relative overflow-hidden bg-neutral-950 shadow-sm transition-all duration-500 hover:z-10 border-2 border-transparent hover:border-brand block",
        item.cols === 2 ? "md:col-span-2" : "md:col-span-1"
      )}
    >
      {cardContent}
    </motion.div>
  );
};
