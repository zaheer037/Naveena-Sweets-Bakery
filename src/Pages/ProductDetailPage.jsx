import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FaArrowLeft, FaHeart, FaLeaf, FaGift } from 'react-icons/fa'
import { useCart } from '../Context/CartContext'
import { getProductById, getFeaturedProducts } from '../data/allProducts'
import { useToast } from "../Components/ui/toast"
import AnimatedAddToCartButton from "../Components/ui/animated-add-to-cart-button"

export default function ProductDetailPage() {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedWeight, setSelectedWeight] = useState('1') // Default to 1kg
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Get product data from centralized data file
  const product = getProductById(category, id)

  // Weight options for weightable items
  const weightOptions = [
    { value: '0.25', label: '1/4 kg (250 grams)', multiplier: 0.25 },
    { value: '0.5', label: '1/2 kg (500 grams)', multiplier: 0.5 },
    { value: '1', label: '1 kg (1000 grams)', multiplier: 1 }
  ]

  // Function to determine if item should show weight dropdown
  const shouldShowWeightDropdown = (item) => {
    if (!item) return false
    
    const title = item.title.toLowerCase()
    
    // Check if product has specific weight mentioned in title (gms, kg, etc.)
    const hasSpecificWeight = /\d+\s*(gms?|kgs?|g|kg|grams?|kilograms?)/i.test(title)
    
    // Check if product has parentheses (likely indicates unit/pack pricing)
    const hasParentheses = /\([^)]*\)/.test(title)
    
    // Check if product is per piece (pc)
    const isPerPiece = /\(pc[s]?\)/i.test(title)
    
    // Check if product is bun, bread, donut type (per unit items)
    const isPerUnitItem = /\b(bun|bread|donut|dilpasand|doughnut|roll|croissant|muffin|bagel|loaf)\b/i.test(title)
    
    // Check if it's cake pieces or individual cake items
    const isCakePiece = /cake.*piece|piece.*cake|cake.*\(pc[s]?\)/i.test(title)
    
    // Check if it's from categories that are typically sold as individual items
    const isIndividualItemCategory = ['cakes-pastries', 'buns-breads', 'biscuits-pies', 'cool-cakes'].includes(item.category)
    
    // Items that should NOT show weight dropdown
    if (hasSpecificWeight || hasParentheses || isPerPiece || isPerUnitItem || isCakePiece || isIndividualItemCategory) {
      return false
    }
    
    // Show weight dropdown for items sold by weight (mainly sweets, ghee-sweets, namkeen without specific weights)
    return ['sweets', 'ghee-sweets', 'namkeen', 'milk-sweets'].includes(item.category)
  }

  // Function to get price display
  const getPriceDisplay = () => {
    if (!product) return '₹0'
    
    if (shouldShowWeightDropdown(product)) {
      const weightMultiplier = parseFloat(selectedWeight)
      return `₹${Math.round(product.price * weightMultiplier * quantity)}`
    } else {
      return `₹${product.price * quantity}`
    }
  }

  // Function to get price unit display
  const getPriceUnit = () => {
    if (!product) return ''
    
    if (shouldShowWeightDropdown(product)) {
      const selectedOption = weightOptions.find(option => option.value === selectedWeight)
      return `per ${selectedOption?.label || '1 kg'}`
    } else {
      const title = product.title.toLowerCase()
      const isPerPiece = /\(pc[s]?\)/i.test(title)
      const hasSpecificWeight = /\d+\s*(gms?|kgs?|g|kg|grams?|kilograms?)/i.test(title)
      const isPerUnitItem = /\b(bun|bread|donut|dilpasand|doughnut|roll|croissant|muffin|bagel|loaf)\b/i.test(title)
      const isCakePiece = /cake.*piece|piece.*cake|cake.*\(pc[s]?\)/i.test(title)
      
      if (isPerPiece || isCakePiece) return 'per piece'
      if (hasSpecificWeight) return 'per pack'
      if (isPerUnitItem) return 'per unit'
      if (product.category === 'cool-cakes') return 'per cake'
      if (product.category === 'cakes-pastries') return 'per cake'
      if (product.category === 'buns-breads') return 'per unit'
      if (product.category === 'biscuits-pies') return 'per item'
      return 'per item'
    }
  }

  // Scroll to top when component mounts or product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [category, id])

  // If product not found, show error
  if (!product) {
    return (
      <>
        <Header />
        <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <div className="container py-4">
            <div className="text-center">
              <h2>Product Not Found</h2>
              <p>The product you're looking for doesn't exist.</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Go Back Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Get recommendations from featured products
  const recommendations = getFeaturedProducts(6)

  const handleRecommendationClick = (item) => {
    // Scroll to top immediately for better user experience
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Navigate to the new product
    navigate(`/product/${item.category}/${item.id}`)
  }

  const handleAddToCart = async (e) => {
    try {
      // Simulate async operation for animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const weightLabel = shouldShowWeightDropdown(product) ? 
        weightOptions.find(option => option.value === selectedWeight)?.label || '1 kg' : 
        'standard'
      
      const itemWithCategory = {
        ...product,
        category: category,
        id: parseInt(id),
        // Calculate the actual price based on weight for weightable items
        price: shouldShowWeightDropdown(product) ? 
          Math.round(product.price * parseFloat(selectedWeight)) : 
          product.price
      }
      
      addToCart(itemWithCategory, quantity, weightLabel)
      
      // Show success toast
      toast.success({ 
        title: `Added ${quantity} ${product.title} to cart!`,
        description: shouldShowWeightDropdown(product) ? 
          `Weight: ${weightLabel}` :
          "Item successfully added to your cart"
      });
      
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
  }

  return (
    <>
      <Header />
      <style>
        {`
          /* Mobile dropdown fixes */
          @media (max-width: 576px) {
            .weight-dropdown {
              max-width: 100% !important;
              width: 100% !important;
              font-size: 14px !important;
              padding: 8px 12px !important;
            }
            
            .weight-dropdown option {
              padding: 8px !important;
              font-size: 14px !important;
            }
          }

          @media (max-width: 480px) {
            .weight-dropdown {
              font-size: 13px !important;
              padding: 6px 10px !important;
            }
            
            .weight-dropdown option {
              padding: 6px !important;
              font-size: 13px !important;
            }
          }
        `}
      </style>
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div className="container py-4">
          {/* Back Button */}
          <button
            className="btn btn-light mb-4"
            onClick={() => navigate(-1)}
            style={{
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FaArrowLeft />
          </button>

          <div className="row">
            {/* Product Image */}
            <div className="col-md-6 mb-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <img
                  src={product.img}
                  alt={product.title}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                {/* Product Title */}
                <h2 className="fw-bold mb-3">{product.title}</h2>
                
                {/* Product Description */}
                <p className="text-muted mb-4">{product.desc}</p>
                
                {/* Weight Selection - Only for weightable items */}
                {shouldShowWeightDropdown(product) && (
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Weight:</label>
                    <select 
                      className="form-select weight-dropdown"
                      value={selectedWeight}
                      onChange={(e) => setSelectedWeight(e.target.value)}
                      style={{ 
                        maxWidth: '200px',
                        fontSize: '14px',
                        padding: '8px 12px'
                      }}
                    >
                      {weightOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Quantity */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Quantity:</label>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-3 py-2 border rounded">{quantity}</span>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <h3 className="text-danger fw-bold">{getPriceDisplay()}</h3>
                  <small className="text-muted">{getPriceUnit()}</small>
                </div>

                {/* Add to Cart Button */}
                <AnimatedAddToCartButton 
                  onAddToCart={handleAddToCart}
                  className="w-100 py-3 mb-4 fw-semibold"
                >
                  Add to cart
                </AnimatedAddToCartButton>

                {/* Features */}
                <div 
                  className="mb-4 p-3 rounded"
                  style={{ backgroundColor: '#FEFEF4' }}
                >
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#dc3545',
                        borderRadius: '50%'
                      }}
                    >
                      <FaHeart className="text-white" size={16} />
                    </div>
                    <span className="small fw-medium">Freshly Made To Order</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#dc3545',
                        borderRadius: '50%'
                      }}
                    >
                      <FaLeaf className="text-white" size={16} />
                    </div>
                    <span className="small fw-medium">Preservative-Free</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div 
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#dc3545',
                        borderRadius: '50%'
                      }}
                    >
                      <FaGift className="text-white" size={16} />
                    </div>
                    <span className="small fw-medium">Premium And Safe Packaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="fw-bold text-center mb-4">You Might Also Like</h3>
                <div className="row g-3">
                  {recommendations.map((item, index) => (
                    <div key={`rec-${item.category}-${item.id}-${index}`} className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <div 
                        className="text-center p-2 rounded"
                        style={{ 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: '1px solid transparent'
                        }}
                        onClick={() => handleRecommendationClick(item)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8f9fa'
                          e.currentTarget.style.border = '1px solid #dee2e6'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.border = '1px solid transparent'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          className="img-fluid rounded mb-2"
                          style={{ 
                            height: '120px', 
                            width: '100%', 
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                        <h6 className="small fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>
                          {item.title}
                        </h6>
                        <p className="small text-danger fw-bold mb-1" style={{ fontSize: '0.8rem' }}>
                          ₹{item.price}
                        </p>
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                          Click to view
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
