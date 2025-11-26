import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-6">
      <ol className="flex items-center gap-2 text-sm text-neutral-500 max-w-7xl mx-auto">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-brand transition-colors"
            aria-label="Startseite"
          >
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-neutral-400" />
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="hover:text-brand transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-neutral-700 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
