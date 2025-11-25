import React from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

/**
 * Optimized Image Component for PageSpeed
 * Features:
 * - Lazy loading by default
 * - Width and height attributes to prevent CLS
 * - Support for priority loading (eager)
 * - Proper alt text for SEO and accessibility
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  onLoad,
}) => {
  // Use eager loading for priority images (hero images, above-the-fold)
  const loadingStrategy = priority ? 'eager' : loading;

  // For WebP images, provide fallback to JPG if needed
  const isSrcSet = src.includes('.webp') || src.includes('.jpg') || src.includes('.png');

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loadingStrategy}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      sizes={sizes}
      onLoad={onLoad}
      // Fetch priority hint for priority images
      fetchpriority={priority ? 'high' : 'auto'}
    />
  );
};

/**
 * Optimized Background Image Component
 * For decorative images that don't need to be in the DOM
 */
export const OptimizedBackground: React.FC<{
  src: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ src, className = '', children }) => {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
};
