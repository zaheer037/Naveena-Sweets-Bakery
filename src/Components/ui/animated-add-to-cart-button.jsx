import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const AnimatedAddToCartButton = ({ 
  onAddToCart, 
  className, 
  children = "Add to Cart",
  disabled = false,
  ...props 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = async (e) => {
    if (disabled || isAdding) return;
    
    setIsAdding(true);
    
    try {
      await onAddToCart(e);
      
      // Show success state
      setIsAdded(true);
      
      // Reset after animation
      setTimeout(() => {
        setIsAdding(false);
        setIsAdded(false);
      }, 2000);
      
    } catch (error) {
      setIsAdding(false);
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <button
      className={cn(
        "relative overflow-hidden transition-all duration-300 ease-in-out",
        "bg-red-600 hover:bg-red-700 text-white font-semibold",
        "py-2 px-4 rounded-md w-full",
        "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isAdding && "bg-red-500 hover:bg-red-500 shadow-lg",
        isAdded && "bg-red-400 hover:bg-red-400 shadow-lg",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isAdding}
      {...props}
    >
      <span 
        className={cn(
          "flex items-center justify-center gap-2 transition-all duration-300",
          isAdding && "scale-110",
          isAdded && "scale-100"
        )}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Adding...
          </>
        ) : isAdded ? (
          <>
            <Check size={16} className="animate-bounce" />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            {children}
          </>
        )}
      </span>
      
      {/* Success confetti effect */}
      {isAdded && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '600ms',
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
};

export default AnimatedAddToCartButton;