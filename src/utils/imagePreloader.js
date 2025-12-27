/**
 * Image Preloader Utility
 * Preloads critical images for better performance
 */

import React from 'react';

class ImagePreloader {
  constructor() {
    this.preloadedImages = new Set();
    this.loadingPromises = new Map();
  }

  /**
   * Preload a single image
   * @param {string} src - Image source URL
   * @param {object} options - Preload options
   * @returns {Promise} - Promise that resolves when image is loaded
   */
  preloadImage(src, options = {}) {
    const { priority = false, crossOrigin = null } = options;

    // Return existing promise if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    // Return resolved promise if already preloaded
    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.preloadedImages.add(src);
        this.loadingPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = (error) => {
        this.loadingPromises.delete(src);
        console.warn(`Failed to preload image: ${src}`, error);
        reject(error);
      };

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = src;

      // For high priority images, add to document head
      if (priority && typeof document !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  /**
   * Preload multiple images
   * @param {Array} sources - Array of image sources or objects with src and options
   * @returns {Promise} - Promise that resolves when all images are loaded
   */
  preloadImages(sources) {
    const promises = sources.map(source => {
      if (typeof source === 'string') {
        return this.preloadImage(source);
      } else {
        return this.preloadImage(source.src, source.options || {});
      }
    });

    return Promise.allSettled(promises);
  }

  /**
   * Check if an image is already preloaded
   * @param {string} src - Image source URL
   * @returns {boolean} - True if image is preloaded
   */
  isPreloaded(src) {
    return this.preloadedImages.has(src);
  }

  /**
   * Clear preloaded images cache
   */
  clear() {
    this.preloadedImages.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get preload statistics
   * @returns {object} - Statistics about preloaded images
   */
  getStats() {
    return {
      preloaded: this.preloadedImages.size,
      loading: this.loadingPromises.size,
      total: this.preloadedImages.size + this.loadingPromises.size
    };
  }
}

// Create singleton instance
const imagePreloader = new ImagePreloader();

/**
 * Hook for React components to preload images
 * @param {Array} imageSources - Array of image sources to preload
 * @param {object} options - Preload options
 */
export const useImagePreloader = (imageSources = [], options = {}) => {
  const { immediate = true, priority = false } = options;

  const preloadImages = React.useCallback(() => {
    if (imageSources.length === 0) return Promise.resolve();

    const sources = imageSources.map(src => ({
      src,
      options: { priority }
    }));

    return imagePreloader.preloadImages(sources);
  }, [imageSources, priority]);

  React.useEffect(() => {
    if (immediate) {
      preloadImages();
    }
  }, [immediate, preloadImages]);

  return {
    preloadImages,
    isPreloaded: (src) => imagePreloader.isPreloaded(src),
    stats: imagePreloader.getStats()
  };
};

/**
 * Preload critical images on app initialization
 */
export const preloadCriticalImages = () => {
  // Add your critical images here
  const criticalImages = [
    // Logo and brand images
    '../assets/image-800w.webp',
    // Hero carousel images
    '../assets/pcake-800w.webp',
    '../assets/straw-800w.webp',
    '../assets/cc-800w.webp',
    // Above-fold product images
    '../assets/chocolatecakes-800w.webp',
    '../assets/vanilla-800w.webp'
  ];

  return imagePreloader.preloadImages(
    criticalImages.map(src => ({ src, options: { priority: true } }))
  );
};

/**
 * Preload images based on user interaction
 */
export const preloadOnHover = (imageSources) => {
  return (event) => {
    if (event.type === 'mouseenter' || event.type === 'focus') {
      imagePreloader.preloadImages(imageSources);
    }
  };
};

/**
 * Intelligent image preloading based on viewport and user behavior
 */
export const intelligentPreloader = {
  /**
   * Preload images that are likely to be viewed next
   */
  preloadNearbyImages: (currentImageIndex, allImages, range = 2) => {
    const start = Math.max(0, currentImageIndex - range);
    const end = Math.min(allImages.length, currentImageIndex + range + 1);
    const nearbyImages = allImages.slice(start, end);
    
    return imagePreloader.preloadImages(nearbyImages);
  },

  /**
   * Preload images based on scroll position
   */
  preloadOnScroll: (images, threshold = 500) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.boundingClientRect.top < threshold) {
            const img = entry.target.dataset.src;
            if (img) {
              imagePreloader.preloadImage(img);
            }
          }
        });
      },
      { rootMargin: `${threshold}px` }
    );

    return observer;
  }
};

export default imagePreloader;