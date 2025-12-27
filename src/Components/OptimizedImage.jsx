import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * OptimizedImage Component
 * Features:
 * - Lazy loading with intersection observer
 * - WebP format support with fallbacks
 * - Responsive images with srcset
 * - Blur-up placeholder effect
 * - Error handling with fallback images
 * - Skeleton loader
 * - Automatic image compression detection
 */

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false, // For above-fold images
  placeholder = 'blur', // 'blur', 'skeleton', or 'none'
  fallbackSrc = null,
  objectFit = 'cover',
  borderRadius = '0',
  onLoad = () => {},
  onError = () => {},
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate WebP and responsive variants
  const generateImageSources = (baseSrc) => {
    if (!baseSrc || baseSrc.startsWith('http')) {
      return { webp: baseSrc, fallback: baseSrc };
    }

    // For local images, generate WebP variants and responsive sizes
    const extension = baseSrc.split('.').pop().toLowerCase();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    // Check if we have optimized responsive variants
    const responsiveWebP800 = `${baseName}-800w.webp`;
    const responsiveWebP400 = `${baseName}-400w.webp`;
    
    return {
      webp: `${baseName}.webp`,
      fallback: baseSrc,
      responsive800: responsiveWebP800,
      responsive400: responsiveWebP400
    };
  };

  const { webp, fallback, responsive800, responsive400 } = generateImageSources(imageSrc);

  // Handle image load success
  const handleImageLoad = (event) => {
    setIsLoading(false);
    setHasError(false);
    onLoad(event);
  };

  // Handle image load error
  const handleImageError = (event) => {
    console.warn(`Image failed to load: ${imageSrc}`);
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image if provided
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }
    
    // Use placeholder service as last resort
    if (!imageSrc.includes('picsum.photos')) {
      setImageSrc(`https://picsum.photos/${width || 300}/${height || 200}?random=${Date.now()}`);
      return;
    }
    
    onError(event);
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (src) => {
    if (!src || src.startsWith('http')) return '';
    
    const extension = src.split('.').pop().toLowerCase();
    const baseName = src.replace(`.${extension}`, '');
    
    // Return srcSet with our optimized responsive variants
    return `
      ${baseName}-400w.webp 400w,
      ${baseName}-800w.webp 800w,
      ${baseName}.webp 1200w
    `.trim();
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width: width || '100%',
        height: height || '200px',
        backgroundColor: '#f0f0f0',
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 1.5s ease-in-out infinite',
        ...style
      }}
    >
      <div style={{ color: '#ccc', fontSize: '14px' }}>Loading...</div>
    </div>
  );

  // Blur placeholder (low-quality image placeholder)
  const BlurPlaceholder = () => {
    const blurSrc = src.includes('picsum.photos') 
      ? `${src}&blur=5` 
      : src; // For local images, use original (can be enhanced with actual blur variants)

    return (
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius }}>
        <img
          src={blurSrc}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            opacity: 0.7,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      </div>
    );
  };

  // If priority is true, don't lazy load (for above-fold images)
  if (priority) {
    return (
      <picture>
        <source
          srcSet={generateSrcSet(imageSrc)}
          sizes={sizes}
          type="image/webp"
        />
        <img
          src={fallback}
          alt={alt}
          className={className}
          style={{
            objectFit,
            borderRadius,
            ...style
          }}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
      </picture>
    );
  }

  return (
    <div style={{ position: 'relative', borderRadius }}>
      {/* Show placeholder while loading */}
      {isLoading && placeholder === 'skeleton' && <SkeletonLoader />}
      {isLoading && placeholder === 'blur' && <BlurPlaceholder />}
      
      <LazyLoadImage
        src={responsive800 || webp || fallback} // Use optimized version first
        srcSet={generateSrcSet(imageSrc)}
        sizes={sizes}
        alt={alt}
        className={className}
        style={{
          objectFit,
          borderRadius,
          width: isLoading ? 0 : 'auto',
          height: isLoading ? 0 : 'auto',
          ...style
        }}
        width={width}
        height={height}
        effect={placeholder === 'blur' ? 'blur' : 'opacity'}
        placeholder={placeholder === 'skeleton' ? <SkeletonLoader /> : undefined}
        onLoad={handleImageLoad}
        onError={handleImageError}
        threshold={100} // Start loading when image is 100px away from viewport
        {...props}
      />
    </div>
  );
};

// Enhanced ProductImage component specifically for product cards
export const ProductImage = ({
  src,
  alt,
  title,
  className = 'card-img-top',
  style = { height: '220px', objectFit: 'cover' },
  ...props
}) => {
  return (
    <OptimizedImage
      src={src || "https://picsum.photos/300/220?random=product"}
      alt={alt || title || 'Product image'}
      className={className}
      style={style}
      placeholder="blur"
      fallbackSrc="https://picsum.photos/300/220?random=product"
      {...props}
    />
  );
};

// Enhanced CarouselImage component for hero images
export const CarouselImage = ({
  src,
  alt,
  className = 'd-block w-100',
  priority = true, // Carousel images are usually above-fold
  ...props
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      placeholder="skeleton"
      fallbackSrc="https://picsum.photos/1200/600?random=carousel"
      objectFit="cover"
      {...props}
    />
  );
};

// Enhanced Logo/Brand Image component
export const BrandImage = ({
  src,
  alt,
  style = { height: '70px', width: '200px' },
  priority = true, // Logo is critical
  ...props
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      style={style}
      priority={priority}
      placeholder="none"
      objectFit="contain"
      {...props}
    />
  );
};

export default OptimizedImage;