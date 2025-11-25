import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string;
  structuredData?: object;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonical = 'https://artofmedia-marketing.de',
  ogType = 'website',
  ogImage = 'https://artofmedia-marketing.de/og-image.jpg',
  keywords,
  structuredData,
  noindex = false,
}) => {
  const fullTitle = title.includes('art.of.media') ? title : `${title} | art.of.media marketing`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'name') {
          element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        } else if (attribute === 'property') {
          element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic Meta Tags
    updateMetaTag('meta[name="description"]', 'name', description);
    updateMetaTag('meta[name="author"]', 'name', 'art.of.media marketing');

    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', keywords);
    }

    // Canonical URL
    updateLinkTag('canonical', canonical);

    // Robots
    const robotsContent = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    updateMetaTag('meta[name="robots"]', 'name', robotsContent);

    // Open Graph
    updateMetaTag('meta[property="og:type"]', 'property', ogType);
    updateMetaTag('meta[property="og:url"]', 'property', canonical);
    updateMetaTag('meta[property="og:title"]', 'property', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'property', description);
    updateMetaTag('meta[property="og:image"]', 'property', ogImage);
    updateMetaTag('meta[property="og:image:width"]', 'property', '1200');
    updateMetaTag('meta[property="og:image:height"]', 'property', '630');
    updateMetaTag('meta[property="og:locale"]', 'property', 'de_DE');
    updateMetaTag('meta[property="og:site_name"]', 'property', 'art.of.media marketing');

    // Twitter Card
    updateMetaTag('meta[name="twitter:card"]', 'name', 'summary_large_image');
    updateMetaTag('meta[name="twitter:url"]', 'name', canonical);
    updateMetaTag('meta[name="twitter:title"]', 'name', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', ogImage);

    // Additional Meta
    updateMetaTag('meta[name="format-detection"]', 'name', 'telephone=no');
    updateMetaTag('meta[name="theme-color"]', 'name', '#00FF29');

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, canonical, ogType, ogImage, keywords, structuredData, noindex]);

  return null;
};

// Structured Data Templates
export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://artofmedia-marketing.de/#organization",
  "name": "art.of.media marketing",
  "alternateName": "art.of.media",
  "url": "https://artofmedia-marketing.de",
  "logo": "https://artofmedia-marketing.de/logo.png",
  "image": "https://artofmedia-marketing.de/og-image.jpg",
  "description": "Marketing-Agentur in Duisburg für Webdesign, KI-Automatisierung, Werbetechnik und Branding. Digital und Physisch. Strategie und Umsetzung.",
  "telephone": "+491758000447",
  "email": "info@artofmedia-marketing.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Grabenstraße 39",
    "addressLocality": "Duisburg",
    "postalCode": "47057",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.4344",
    "longitude": "6.7623"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "€€",
  "sameAs": [
    "https://www.instagram.com/artofmedia.marketing",
    "https://www.linkedin.com/company/artofmedia-marketing"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "51.4344",
      "longitude": "6.7623"
    },
    "geoRadius": "100000"
  },
  "knowsAbout": [
    "Webdesign",
    "E-Commerce",
    "KI-Automatisierung",
    "Marketing Automation",
    "Werbetechnik",
    "Fahrzeugbeschriftung",
    "LED-Lichttechnik",
    "Branding",
    "Corporate Design"
  ]
});

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://artofmedia-marketing.de/#website",
  "url": "https://artofmedia-marketing.de",
  "name": "art.of.media marketing",
  "description": "Marketing-Agentur für digitale und physische Markenpräsenz",
  "publisher": {
    "@id": "https://artofmedia-marketing.de/#organization"
  },
  "inLanguage": "de-DE"
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createServiceSchema = (serviceName: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@id": "https://artofmedia-marketing.de/#organization"
  },
  "name": serviceName,
  "description": description,
  "url": url,
  "areaServed": {
    "@type": "Country",
    "name": "Deutschland"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": url
  }
});
