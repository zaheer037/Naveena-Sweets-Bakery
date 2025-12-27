import React from 'react'
import { useNavigate } from 'react-router-dom'
import c1 from '../assets/cakes-c1-800w.webp'
import c2 from '../assets/cakes-c2-800w.webp'
import c3 from '../assets/cakes-c3-800w.webp'
import c4 from '../assets/cakes-c4-800w.webp'

export default function Cakes({ scrollable = false }){
    const cakes = [
        {
          id: 1,
          title: "Buns, Breads & Donuts",
          desc: "Fresh baked buns, breads and donuts",
          varieties: "15+ Varieties",
          route: "/buns-breads-donuts",
          img: c1, // Placeholder
        },
        {
          id: 2,
          title: "Cakes & Pastries",
          desc: "Delicious cakes and fresh pastries",
          varieties: "20+ Varieties",
          route: "/cakes-pastries",
          img: c2,
        },
        {
          id: 3,
          title: "Biscuits, Pies & Boxed Items",
          desc: "Assorted biscuits, pies and gift boxes",
          varieties: "25+ Varieties",
          route: "/biscuits-pies-boxed",
          img: c3,
        },
        {
         id: 4,
         title: "Cool Cakes",
         desc: "Refreshing layered birthday cakes",
         varieties: "10+ Varieties",
         route: "/cool-cakes",
         img: c4,
       },
      ];

  if (scrollable) {
    // Responsive layout for home page
    return (
      <div className="container my-5">
        {/* Desktop: 4 cards in a row, Mobile: Scrollable */}
        <div className="d-none d-lg-block">
          {/* Desktop Grid Layout */}
          <div className="row g-4">
            {cakes.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6">
                <CakeCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Scrollable Layout */}
        <div className="d-lg-none">
          <div
            className="d-flex overflow-auto pb-3 custom-scroll"
            style={{ scrollSnapType: "x mandatory", gap: "20px" }}
          >
            {cakes.map((item) => (
              <div key={item.id} className="flex-shrink-0" style={{ width: "280px" }}>
                <CakeCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Grid layout for category pages
  return (
      <div className="container my-5">
        {/* Page Title */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold" style={{ color: '#333', fontFamily: 'serif' }}>
            The Bake Boutique
          </h2>
        </div>

        {/* Grid Layout - 2x2 grid for 4 cake categories */}
        <div className="row g-4">
          {cakes.map((item) => (
            <div key={item.id} className="col-lg-6 col-md-6 col-sm-12">
              <CakeCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Custom Cake Card Component to show varieties
  function CakeCard({ item }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(item.route);
    };

    return (
      <div
        className="card shadow-sm h-100"
        style={{
          transition: "all 0.3s ease",
          cursor: "pointer",
          border: "none",
          borderRadius: "15px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        onClick={handleCardClick}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={item.img}
            className="card-img-top"
            alt={item.title}
            style={{ 
              height: "220px", 
              objectFit: "cover",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
          <div 
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "rgba(178, 34, 34, 0.9)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "600",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            {item.varieties}
          </div>
        </div>
        <div className="card-body text-center p-4">
          <h5 className="card-title fw-bold mb-2" style={{ fontSize: "1.1rem", color: "#333" }}>
            {item.title}
          </h5>
          <p className="card-text text-muted small mb-3" style={{ fontSize: "0.9rem" }}>
            {item.desc}
          </p>
          <div 
            className="btn btn-outline-danger btn-sm"
            style={{
              borderRadius: "25px",
              padding: "8px 20px",
              fontSize: "0.85rem",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            Explore →
          </div>
        </div>
      </div>
    );
  }
