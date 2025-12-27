import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../Context/CartContext";
import { getFeaturedProducts } from '../data/allProducts';
import { useToast } from "../Components/ui/toast";
import AnimatedAddToCartButton from "../Components/ui/animated-add-to-cart-button";




export default function CustomerFavs() {
  
  // Get featured products from centralized data
  const favorites = getFeaturedProducts(9)

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center fw-bold">Customer Favorites</h3>

      {/* Scrollable Row */}
      <div
        className="d-flex overflow-auto pb-3 custom-scroll"
        style={{ scrollSnapType: "x mandatory", gap: "20px" }}
      >
        {favorites.map((item, index) => (
          <ProductCard key={`${item.category}-${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

// ✅ Product Card Component with Counter and Navigation
function ProductCard({ item }) {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
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
    navigate(`/product/${item.category}/${item.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    
    try {
      // Simulate async operation for animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addToCart(item, count);
      
      // Show success toast
      toast.success({ 
        title: `Added ${count} ${item.title} to cart!`,
        description: "Item successfully added to your cart"
      });
      
      // Reset count after adding to cart
      setCount(1);
      
      // Return success for the animated button
      return Promise.resolve();
      
    } catch (error) {
      toast.error({ 
        title: "Failed to add item to cart",
        description: "Please try again"
      });
      
      // Return error for the animated button
      return Promise.reject(error);
    }
  };

  return (
    <div
      className="card shadow-sm flex-shrink-0"
      style={{
        width: "250px",
        scrollSnapAlign: "start",
        transition: "transform 0.3s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={handleCardClick}
    >
      <img
        src={item.img}
        className="card-img-top"
        alt={item.title}
        style={{ height: "155px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text text-muted">{item.desc}</p>

        {/* PRICE + COUNTER IN SAME ROW */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="card-text text-danger fw-bold mb-0">
            ₹{item.price} 
            <small className="text-muted">
              {item.category === 'namkeen' && item.price <= 70 ? '/piece' : 
               item.category === 'cakes-pastries' ? '/cake' : '/kg'}
            </small>
          </p>

          <div className="d-flex align-items-center border rounded px-2">
            <button
              className="btn btn-sm btn-light"
              onClick={decrement}
              style={{ fontWeight: "bold" }}
            >
              −
            </button>
            <span className="mx-2 fw-semibold">{count}</span>
            <button
              className="btn btn-sm btn-light"
              onClick={increment}
              style={{ fontWeight: "bold" }}
            >
              +
            </button>
          </div>
        </div>

        <AnimatedAddToCartButton 
          onAddToCart={handleAddToCart}
          className="w-100 fw-semibold"
        >
          Add to Cart
        </AnimatedAddToCartButton>
      </div>
    </div>
  );
}
