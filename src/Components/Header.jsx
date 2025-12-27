import React, { useState, useEffect } from "react";
import image from "../assets/image.png";
import { FaSearch, FaShoppingBag, FaArrowLeft, FaPlus, FaMinus, FaWhatsapp } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { MessageCircle, ShoppingCart, Package, User, Phone, MapPin, Calendar } from "lucide-react";
import { searchProducts, getFormattedPrice } from "../data/allProducts";
import { StyledInput, StyledTextarea } from "./StyledInput";

// Mobile responsive styles for search
const mobileSearchStyles = `
  @media (max-width: 768px) {
    .search-container {
      width: 95% !important;
      min-width: 280px !important;
    }
    .search-results {
      width: 95% !important;
      min-width: 280px !important;
    }
    .search-item {
      padding: 0.75rem !important;
    }
    .search-item img,
    .search-item .image-placeholder {
      width: 2.5rem !important;
      height: 2.5rem !important;
      min-width: 35px !important;
      min-height: 35px !important;
    }
  }
  
  @media (max-width: 480px) {
    .search-container {
      width: 98% !important;
      min-width: 260px !important;
    }
    .search-results {
      width: 98% !important;
      min-width: 260px !important;
    }
    .search-item img,
    .search-item .image-placeholder {
      width: 2rem !important;
      height: 2rem !important;
      min-width: 32px !important;
      min-height: 32px !important;
    }
  }

  /* Fixed navbar styles */
  .navbar-red {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }
`;

export default function Header() {
  const [showSearch, setShowsearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cart, updateQuantity, removeFromCart } = useCart();

  const navigate = useNavigate();

  // Scroll behavior for navbar visibility
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down
        setIsVisible(false);
        // Close mobile menu when scrolling down
        setShowMobileMenu(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add event listener
    window.addEventListener('scroll', controlNavbar);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Increase qty
  const increaseQty = (item) => {
    updateQuantity(item.id, item.category, item.weight, item.quantity + 1);
  };

  // Decrease qty
  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.category, item.weight, item.quantity - 1);
    } else {
      removeFromCart(item.id, item.category, item.weight);
    }
  };

  // Remove item
  const removeItem = (item) => {
    removeFromCart(item.id, item.category, item.weight);
  };

  // Search functionality using centralized product data
  // Helper function to determine pricing display in search
  const getPricingDisplay = (item) => {
    return getFormattedPrice(item);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Use the centralized search function
    const filtered = searchProducts(query);
    
    // Sort results by relevance (exact title matches first, then partial matches)
    const sortedResults = filtered.sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      
      // Exact matches first
      if (aTitle === queryLower && bTitle !== queryLower) return -1;
      if (bTitle === queryLower && aTitle !== queryLower) return 1;
      
      // Then matches that start with the query
      if (aTitle.startsWith(queryLower) && !bTitle.startsWith(queryLower)) return -1;
      if (bTitle.startsWith(queryLower) && !aTitle.startsWith(queryLower)) return 1;
      
      // Finally alphabetical order
      return aTitle.localeCompare(bTitle);
    });
    
    setSearchResults(sortedResults);
  };

  const handleSearchItemClick = (item) => {
    navigate(`/product/${item.category}/${item.id}`);
    setShowsearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const closeSearch = () => {
    setShowsearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <>
      {/* Mobile responsive styles */}
      <style>{mobileSearchStyles}</style>
      
      {/* Spacer div to prevent content jump when navbar is fixed */}
      <div style={{ height: '102px' }}></div>
      
      {/* Tailwind CSS Navbar */}
      <nav 
        className={`navbar-red text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
        style={{ backgroundColor: '#B22222' }}
      >
        <div className="max-w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={image} 
              alt="Naveena Sweets & Bakery Logo" 
              className="h-[70px] w-[200px]"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.2)',
                transformOrigin: 'center'
              }}
            />
          </div>

          {/* Desktop Navigation Links - Centered */}
          <div className="desktop-nav items-center justify-center flex-1">
            <div className="flex items-center space-x-12">
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Home
              </Link>
              <Link 
                to="/sweet" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Sweets
              </Link>
              <Link 
                to="/sav" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Tiffin & Snacks
              </Link>
              <Link 
                to="/ghee" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Ghee Sweets
              </Link>
              <Link 
                to="/cake" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Cakes
              </Link>
              <Link 
                to="/milk" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Milk Sweets
              </Link>
              <Link 
                to="/namk" 
                className="text-white hover:text-gray-200 font-bold text-[16px] transition-colors duration-200 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
              >
                Namkeen
              </Link>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button
              className="text-white hover:text-gray-200 transition-colors duration-200 p-3 flex items-center justify-center icon-button"
              onClick={() => setShowsearch(true)}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <FaSearch size={20} />
            </button>

            {/* Cart Icon with Count */}
            <button
              className="text-white hover:text-gray-200 transition-colors duration-200 p-3 relative flex items-center justify-center icon-button"
              onClick={() => setShowCart(true)}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <FaShoppingBag size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                  style={{ fontSize: '11px' }}
                >
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn text-white hover:text-gray-200 transition-colors duration-200 p-3 items-center justify-center icon-button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="mobile-nav-menu mt-4 pb-4 border-t border-red-700 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link 
                to="/sweet" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Sweets
              </Link>
              <Link 
                to="/sav" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Tiffin & Snacks
              </Link>
              <Link 
                to="/ghee" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Ghee Sweets
              </Link>
              <Link 
                to="/cake" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Cakes
              </Link>
              <Link 
                to="/milk" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Milk Sweets
              </Link>
              <Link 
                to="/namk" 
                className="text-white hover:text-gray-200 font-bold text-base transition-colors duration-200 py-2 no-underline"
                style={{ fontFamily: 'Be Vietnam Pro', fontWeight: '700', textDecoration: 'none' }}
                onClick={() => setShowMobileMenu(false)}
              >
                Namkeen
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 🔹 Search Overlay */}
      {showSearch && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1050,
          }}
          onClick={closeSearch}
        >
          <div 
            className="d-flex flex-column align-items-center"
            style={{ paddingTop: "120px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar */}
            <div
              className="bg-white rounded-pill d-flex align-items-center px-3 shadow mb-3 search-container"
              style={{ 
                width: "90%", 
                maxWidth: "700px", 
                height: "60px",
                minWidth: "300px"
              }}
            >
              {/* Back Button */}
              <button
                className="btn p-2"
                onClick={closeSearch}
              >
                <FaArrowLeft />
              </button>

              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search a Product"
                style={{ fontSize: "18px" }}
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <FaSearch size={20} className="text-muted ms-2" />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div
                className="bg-white rounded-3 shadow-lg p-3 search-results"
                style={{ 
                  width: "90%", 
                  maxWidth: "700px", 
                  maxHeight: "400px", 
                  overflowY: "auto",
                  minWidth: "300px"
                }}
              >
                <div className="mb-2">
                  <small className="text-muted">
                    {searchResults.length > 0 
                      ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`
                      : searchQuery.trim() !== '' 
                        ? `No results found for "${searchQuery}"`
                        : 'Start typing to search products...'
                    }
                  </small>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                  <div
                    key={`${item.category}-${item.id}-${index}`}
                    className="d-flex align-items-center p-2 border-bottom search-item"
                    style={{ 
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      minHeight: "60px"
                    }}
                    onClick={() => handleSearchItemClick(item)}
                    onMouseEnter={(e) => e.target.closest('.search-item').style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.closest('.search-item').style.backgroundColor = 'transparent'}
                  >
                    <div className="me-3 flex-shrink-0">
                      {item.img ? (
                        <img 
                          src={item.img} 
                          alt={item.title}
                          className="rounded"
                          style={{ 
                            width: '3rem', 
                            height: '3rem', 
                            objectFit: 'cover',
                            minWidth: '40px',
                            minHeight: '40px'
                          }}
                        />
                      ) : (
                        <div 
                          className="bg-danger rounded d-flex align-items-center justify-content-center text-white flex-shrink-0 image-placeholder"
                          style={{ 
                            width: '3rem', 
                            height: '3rem', 
                            fontSize: '1rem', 
                            fontWeight: 'bold',
                            minWidth: '40px',
                            minHeight: '40px'
                          }}
                        >
                          {item.title.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                      <h6 className="mb-1 fw-bold text-truncate" style={{ fontSize: '0.95rem' }}>{item.title}</h6>
                      <p className="mb-1 text-muted small text-truncate" style={{ fontSize: '0.8rem' }}>{item.desc}</p>
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <span className="text-danger fw-bold" style={{ fontSize: '0.9rem' }}>{getPricingDisplay(item)}</span>
                        <span className="badge bg-light text-dark small mt-1" style={{ fontSize: '0.7rem' }}>
                          {item.category.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
                ) : searchQuery.trim() !== '' ? (
                  <div className="text-center py-4">
                    <div className="text-muted mb-2">
                      <i className="fas fa-search" style={{fontSize: '3rem', opacity: 0.3}}></i>
                    </div>
                    <h6 className="text-muted">No products found</h6>
                    <p className="small text-muted mb-3">Try searching for:</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      {['laddu', 'burfi', 'cake', 'chocolate', 'mixture', 'biscuits'].map(suggestion => (
                        <button
                          key={suggestion}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            handleSearchChange({target: {value: suggestion}});
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* No Results */}
            {searchQuery && searchResults.length === 0 && (
              <div
                className="bg-white rounded-3 shadow-lg p-4 text-center"
                style={{ width: "60%", maxWidth: "700px" }}
              >
                <div className="text-muted">
                  <FaSearch size={40} className="mb-3 opacity-50" />
                  <h6>No products found</h6>
                  <p className="small mb-0">
                    Try searching for "laddu", "burfi", "cake", "chocolate", "mixture", or "biscuits"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔹 Cart Overlay - New Design */}
      {showCart && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-light"
            style={{
              width: "400px",
              height: "100%",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white p-3 d-flex align-items-center border-bottom">
              <button
                className="btn p-0 me-3"
                onClick={() => setShowCart(false)}
                style={{ fontSize: '18px' }}
              >
                <FaArrowLeft />
              </button>
              <h5 className="mb-0 fw-bold">Cart</h5>
            </div>

            {/* Subtitle */}
            <div className="px-3 py-2 bg-white border-bottom">
              <div className="d-flex align-items-center">
                <div className="bg-danger rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                <small className="text-muted">
                  Add to Cart now - your box of sweetness is just a click away.
                </small>
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-3" style={{ minHeight: 'calc(100vh - 200px)' }}>
              {cart.items.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  {cart.items.map((item, index) => (
                    <div
                      key={`${item.id}-${item.category}-${item.weight}-${index}`}
                      className="bg-white rounded p-3 mb-3 shadow-sm"
                    >
                      <div className="d-flex align-items-center">
                        {/* Product Image with Subtle Logo */}
                        <div className="position-relative me-3">
                          <img 
                            src={item.img} 
                            alt={item.title}
                            className="rounded"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          {/* Subtle bottom banner with logo */}
                          <div 
                            className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white text-center rounded-bottom"
                            style={{ 
                              fontSize: '6px', 
                              fontWeight: 'bold', 
                              padding: '2px 0',
                              lineHeight: '1.2'
                            }}
                          >
                            Naveena SWEETS
                          </div>
                          {/* Optional: Small corner logo */}
                          <div 
                            className="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '16px', 
                              height: '16px', 
                              fontSize: '6px', 
                              fontWeight: 'bold',
                              transform: 'translate(25%, -25%)'
                            }}
                          >
                            N
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1 fw-bold">{item.title}</h6>
                              <small className="text-muted d-block">{item.weight}</small>
                              <span className="text-danger fw-bold">
                                ₹{item.price}
                                {(() => {
                                  // Function to determine if item should show /kg
                                  const title = item.title.toLowerCase();
                                  
                                  // Check if product has specific weight mentioned in title (gms, kg, etc.)
                                  const hasSpecificWeight = /\d+\s*(gms?|kgs?|g|kg|grams?|kilograms?)/i.test(title);
                                  
                                  // Check if product has parentheses (likely indicates unit/pack pricing)
                                  const hasParentheses = /\([^)]*\)/.test(title);
                                  
                                  // Check if product is per piece (pc)
                                  const isPerPiece = /\(pc[s]?\)/i.test(title);
                                  
                                  // Check if product is bun, bread, donut type (per unit items)
                                  const isPerUnitItem = /\b(bun|bread|donut|dilpasand|doughnut|roll|croissant|muffin|bagel|loaf)\b/i.test(title);
                                  
                                  // Check if it's cake pieces or individual items
                                  const isCakePiece = /cake.*piece|piece.*cake|cake.*\(pc[s]?\)/i.test(title);
                                  
                                  // Items that should NOT show /kg
                                  if (hasSpecificWeight || hasParentheses || isPerPiece || isPerUnitItem || isCakePiece || item.weight === 'standard') {
                                    return '';
                                  }
                                  
                                  // Show /kg for items sold by weight that don't have specific weights
                                  return ;
                                })()}
                              </span>
                            </div>
                            {/* Remove Button */}
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => removeItem(item)}
                              style={{ fontSize: '14px' }}
                            >
                              ✕
                            </button>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center mt-2">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => decreaseQty(item)}
                              style={{ width: '30px', height: '30px', fontSize: '14px' }}
                            >
                              −
                            </button>
                            <span className="mx-3 fw-semibold">{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => increaseQty(item)}
                              style={{ width: '30px', height: '30px', fontSize: '14px' }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Bottom Section - Total & Purchase */}
            {cart.items.length > 0 && (
              <div className="bg-white border-top p-3 position-sticky bottom-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-bold">Total</h5>
                  <h5 className="mb-0 fw-bold">₹ {cart.totalPrice}</h5>
                </div>
                <button 
                  className="btn btn-danger w-100 py-2 fw-bold"
                  onClick={() => {
                    setShowOrderDialog(true);
                    setShowCart(false);
                  }}
                >
                  Purchase
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔹 WhatsApp Order Dialog */}
      {showOrderDialog && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            overflowY: "auto"
          }}
          onClick={() => setShowOrderDialog(false)}
        >
          <div
            className="bg-white rounded-3 shadow-lg my-auto"
            style={{ 
              width: "100%", 
              maxWidth: "500px", 
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <OrderDialog 
              cart={cart}
              onClose={() => setShowOrderDialog(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

// WhatsApp Order Dialog Component
function OrderDialog({ cart, onClose }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: ''
  });

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const sendToWhatsApp = () => {
    // Validate required fields
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    // Format cart items for WhatsApp message
    const itemsList = cart.items.map(item => 
      `• ${item.title} (${item.weight}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');

    // Create WhatsApp message
    const message = `*New Order from Naveena Sweets & Bakery*

*Customer Details:*
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
${customerInfo.address ? `Address: ${customerInfo.address}` : ''}
${customerInfo.deliveryDate ? `Preferred Delivery: ${customerInfo.deliveryDate}` : ''}

*Order Items:*
${itemsList}

*Total Amount: ₹${cart.totalPrice}*

Thank you for choosing Naveena Sweets & Bakery!`;

    // Replace with your actual WhatsApp number
    const shopkeeperNumber = "919618335976"; // Replace with actual number
    const whatsappUrl = `https://wa.me/${shopkeeperNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close dialog
    onClose();
  };

  return (
    <div className="p-0" style={{ maxHeight: '85vh', overflowY: 'auto', width: '100%' }}>
      {/* Enhanced Header */}
      <div 
        className="d-flex justify-content-between align-items-center p-3 mb-0"
        style={{ 
          background: 'linear-gradient(135deg, #B22222 0%, #8B0000 100%)',
          color: 'white',
          borderRadius: '15px 15px 0 0',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <div>
          <h6 className="mb-1 fw-bold">Complete Your Order</h6>
          <p className="mb-0 small opacity-90">Review details and send via WhatsApp</p>
        </div>
        <button
          className="btn btn-sm p-2"
          onClick={onClose}
          style={{ 
            fontSize: '18px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
      </div>

      <div className="p-3">
        {/* Enhanced Order Summary */}
        <div className="mb-3">
          <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: '#333' }}>
            <div 
              style={{
                background: 'linear-gradient(135deg, #B22222, #8B0000)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Package size={16} color="white" />
            </div>
            Order Summary
          </h6>
          <div 
            className="rounded-3 p-4"
            style={{ 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              border: '1px solid #dee2e6',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
            }}
          >
            {cart.items.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center py-2">
                <div>
                  <span className="fw-semibold" style={{ color: '#333' }}>
                    {item.title}
                  </span>
                  <div className="small text-muted">
                    {item.weight} × {item.quantity}
                  </div>
                </div>
                <span className="fw-bold" style={{ color: '#B22222' }}>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '2px solid #dee2e6' }} />
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold" style={{ fontSize: '1.1rem', color: '#333' }}>Total Amount</span>
              <span className="fw-bold" style={{ fontSize: '1.3rem', color: '#B22222' }}>
                ₹{cart.totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Customer Information Form */}
        <div className="mb-3">
          <h6 className="fw-bold mb-2 d-flex align-items-center gap-2" style={{ color: '#333' }}>
            <div 
              style={{
                background: 'linear-gradient(135deg, #B22222, #8B0000)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={14} color="white" />
            </div>
            Your Information
          </h6>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); sendToWhatsApp(); }} className="mt-2">
          <div className="row g-3">
            <div className="col-12">
              <StyledInput
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
                label="Full Name *"
                icon={User}
              />
            </div>

            <div className="col-12">
              <StyledInput
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
                label="Phone Number *"
                icon={Phone}
              />
            </div>

            <div className="col-12">
              <StyledTextarea
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                label="Delivery Address (Optional)"
                icon={MapPin}
              />
            </div>

            <div className="col-12">
              <StyledInput
                type="date"
                name="deliveryDate"
                value={customerInfo.deliveryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                label="Preferred Delivery Date (Optional)"
                icon={Calendar}
              />
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={18} />
              Send to WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
