import React from 'react'
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "../lib/utils";
import chocolateCake from '../assets/chocolate-cake-800w.webp'
import coolCake from '../assets/cool-cake-800w.webp'
import goldenLaddo from '../assets/golden-laddo-800w.webp'
import mixture from '../assets/mixture-800w.webp'
import jamBun from '../assets/jam-bun-800w.webp'
import jangri from '../assets/jangri-800w.webp'
import mysoorPak from '../assets/mysoor-pak-800w.webp'

export default function Carousel() {
  // Bakery images data - representing different categories
  const images = [
    {
      src: chocolateCake,
      alt: "Premium Chocolate Cakes - Rich, decadent chocolate cakes perfect for celebrations",
      title: "Premium Chocolate Cakes",
      description: "Indulge in our rich, moist chocolate cakes",
      category: "Cakes"
    },
    {
      src: coolCake,
      alt: "Cool Cakes & Celebrations - Fresh and delicious celebration cakes",
      title: "Cool Cakes & Celebrations", 
      description: "Perfect for birthdays and special occasions",
      category: "Cool Cakes"
    },
    {
      src: goldenLaddo,
      alt: "Traditional Indian Sweets - Authentic golden laddos made with love",
      title: "Traditional Golden Laddo",
      description: "Authentic sweets made with traditional recipes",
      category: "Milk Sweets"
    },
    {
      src: mysoorPak,
      alt: "Mysoor Pak - Classic ghee-rich sweet delicacy",
      title: "Classic Mysoor Pak",
      description: "Rich, melt-in-mouth ghee sweet",
      category: "Ghee Sweets"
    },
    {
      src: mixture,
      alt: "Spicy Mixture - Crunchy and flavorful namkeen snack",
      title: "Special Mixture",
      description: "Crispy, spicy traditional snack mix",
      category: "Namkeen"
    },
    {
      src: jamBun,
      alt: "Jam Bun - Soft, sweet buns with fruity jam filling",
      title: "Fresh Jam Buns",
      description: "Soft, fluffy buns with sweet jam center",
      category: "Buns & Breads"
    },
    {
      src: jangri,
      alt: "Jangri - Crispy, syrupy traditional sweet spirals",
      title: "Traditional Jangri",
      description: "Crispy spirals soaked in sugar syrup",
      category: "Fried Sweets"
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <BakeryCarousel 
        className="max-w-6xl" 
        images={images} 
        showPagination={true}
        showNavigation={true}
        loop={true}
        autoplay={true}
        spaceBetween={30}
      />
    </div>
  );
}

const BakeryCarousel = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}) => {
  const css = `
  .BakeryCarousel {
    width: 100%;
    height: 450px;
    padding-bottom: 50px !important;
  }
  
  .BakeryCarousel .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
    height: 400px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
  }

  .BakeryCarousel .swiper-slide:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  }

  .BakeryCarousel .swiper-slide img {
    border-radius: 20px;
    transition: transform 0.4s ease;
  }

  .BakeryCarousel .swiper-slide:hover img {
    transform: scale(1.08);
  }

  .swiper-pagination-bullet {
    background-color: #B22222 !important;
    width: 14px !important;
    height: 14px !important;
    opacity: 0.4 !important;
    transition: all 0.3s ease !important;
  }

  .swiper-pagination-bullet-active {
    opacity: 1 !important;
    transform: scale(1.3);
    background-color: #8B0000 !important;
  }

  /* Enhanced Arrow Styling */
  .swiper-button-next,
  .swiper-button-prev {
    background: linear-gradient(135deg, rgba(178, 34, 34, 0.9), rgba(139, 0, 0, 0.9)) !important;
    border-radius: 50% !important;
    width: 60px !important;
    height: 60px !important;
    margin-top: -30px !important;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    box-shadow: 0 8px 25px rgba(178, 34, 34, 0.3) !important;
    border: 3px solid rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: linear-gradient(135deg, rgba(178, 34, 34, 1), rgba(139, 0, 0, 1)) !important;
    transform: scale(1.15) !important;
    box-shadow: 0 12px 35px rgba(178, 34, 34, 0.5) !important;
    border: 3px solid rgba(255, 255, 255, 0.3) !important;
  }

  .swiper-button-next:active,
  .swiper-button-prev:active {
    transform: scale(1.05) !important;
  }

  /* Arrow Icons Enhancement */
  .swiper-button-next .lucide-chevron-right,
  .swiper-button-prev .lucide-chevron-left {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
  }

  .swiper-button-next:hover .lucide-chevron-right,
  .swiper-button-prev:hover .lucide-chevron-left {
    transform: scale(1.1);
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
  }

  /* Positioning adjustments */
  .swiper-button-next {
    right: 10px !important;
  }

  .swiper-button-prev {
    left: 10px !important;
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
    color: white;
    padding: 25px 20px 20px;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(5px);
  }

  .BakeryCarousel .swiper-slide:hover .image-overlay {
    transform: translateY(0);
  }

  .category-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(178, 34, 34, 0.9);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .BakeryCarousel .swiper-slide:hover .category-badge {
    background: rgba(139, 0, 0, 1);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .BakeryCarousel .swiper-slide {
      width: 280px;
      height: 350px;
    }
    
    .BakeryCarousel {
      height: 400px;
    }

    .swiper-button-next,
    .swiper-button-prev {
      width: 45px !important;
      height: 45px !important;
      margin-top: -22px !important;
    }

    .swiper-button-next {
      right: 5px !important;
    }

    .swiper-button-prev {
      left: 5px !important;
    }
  }

  @media (max-width: 480px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 40px !important;
      height: 40px !important;
      margin-top: -20px !important;
    }
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="BakeryCarousel"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <img
                className="h-full w-full object-cover"
                src={image.src}
                alt={image.alt}
              />
              <div className="category-badge">
                {image.category}
              </div>
              <div className="image-overlay">
                <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                <p className="text-sm opacity-90">{image.description}</p>
              </div>
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-7 w-7 text-white drop-shadow-lg" strokeWidth={3} />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-7 w-7 text-white drop-shadow-lg" strokeWidth={3} />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};
