import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../Context/CartContext'
import { getFormattedPrice } from '../data/allProducts'
import AnimatedAddToCartButton from './ui/animated-add-to-cart-button'
import { useToast } from './ui/toast'

// ✅ Reusable Product Card Component with Counter
export default function ProductCard({ item }) {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    
    const category = getCategoryFromPath();
    navigate(`/product/${category}/${item.id}`);
  };

  const getCategoryFromPath = () => {
    // Use category from item data if available, otherwise extract from current path
    if (item.category) {
      return item.category;
    }
    
    // Extract category from current path as fallback
    const currentPath = location.pathname;
    
    // Cake categories
    if (currentPath.includes('cool-cake')) return 'cool-cake';
    else if (currentPath.includes('chocolate-cake')) return 'chocolate-cake';
    else if (currentPath.includes('butter-cake')) return 'butter-cake';
    else if (currentPath.includes('cheese-cake')) return 'cheese-cake';
    else if (currentPath.includes('sponge-cake')) return 'sponge-cake';
    else if (currentPath.includes('foam-cake')) return 'foam-cake';
    else if (currentPath.includes('mini-cup-cakes')) return 'mini-cup-cakes';
    else if (currentPath.includes('layered-cake')) return 'layered-cake';
    // Other categories
    else if (currentPath.includes('/sweet')) return 'sweets';
    else if (currentPath.includes('/ghee')) return 'ghee-sweets';
    else if (currentPath.includes('/milk')) return 'milk-sweets';
    else if (currentPath.includes('/sav')) return 'saviours';
    else if (currentPath.includes('/namk')) return 'namkeen';
    
    return 'general';
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    
    const category = getCategoryFromPath();
    
    // Ensure item has category for cart functionality
    const itemWithCategory = {
      ...item,
      category: category
    };
    
    // Add to cart with default weight (1kg for weightable items, standard for others)
    addToCart(itemWithCategory, count, 'standard');
    
    // Show success toast
    toast.success({
      title: "Added to Cart!",
      description: `${count} ${item.title} added to your cart`,
      duration: 3000
    });
    
    // Reset count after adding to cart
    setCount(1);
    
    // Small delay to show the animation
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  // Helper function to determine pricing unit
  const getPricingDisplay = (item) => {
    return getFormattedPrice(item);
  };

  return (
    <div
      className="card shadow-sm h-100"
      style={{
        transition: "transform 0.3s ease",
        cursor: "pointer",
        border: "1px solid #e0e0e0"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={handleCardClick}
    >
      <img
        src={item.img || "https://picsum.photos/300/220?random=default"}
        alt={item.title}
        className="card-img-top"
        style={{ 
          height: "220px", 
          objectFit: "cover",
          backgroundColor: "#fafafa"
        }}
        width={300}
        height={220}
        loading="lazy"
      />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text text-muted">{item.desc}</p>

        {/* PRICE + COUNTER IN SAME ROW */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="card-text text-danger fw-bold mb-0">
            {getPricingDisplay(item)}
          </p>

          <div className="d-flex align-items-center border rounded px-2">
            <button
              className="btn btn-sm btn-light"
              onClick={(e) => {
                e.stopPropagation();
                decrement();
              }}
              style={{ fontWeight: "bold" }}
            >
              −
            </button>
            <span className="mx-2 fw-semibold">{count}</span>
            <button
              className="btn btn-sm btn-light"
              onClick={(e) => {
                e.stopPropagation();
                increment();
              }}
              style={{ fontWeight: "bold" }}
            >
              +
            </button>
          </div>
        </div>

        <AnimatedAddToCartButton 
          onAddToCart={handleAddToCart}
          className="btn btn-danger w-100 fw-semibold"
        />
      </div>
    </div>
  );
}