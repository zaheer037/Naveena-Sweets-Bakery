import React from 'react'
import ProductCard from './ProductCard'
import goldenLaddo from "../assets/golden-laddo-800w.webp"
import gheeMysoorPak from "../assets/ghee-mysoor-pak-800w.webp"
import butterBurfi from "../assets/butter-burfi-800w.webp"

export default function GheeSweets() {
    const gheeSweets = [
        {
          id: 1,
          title: "Ghee Mysoor Pak",
          desc: "Traditional South Indian sweet made with pure ghee",
          price: 600,
          img: gheeMysoorPak,
          category: "ghee-sweets"
        },
        {
          id: 2,
          title: "Besan Laddoo",
          desc: "Traditional gram flour balls with ghee",
          price: 280,
          img: goldenLaddo,
          category: "ghee-sweets"
        },
        {
          id: 3,
          title: "Butter Burfi",
          desc: "Soft and creamy butter-flavored burfi made with ghee",
          price: 600,
          img: butterBurfi,
          category: "ghee-sweets"
        },
      ];

  return (
      <div className="container my-5">
        {/* Grid Layout - 3 cards per row */}
        <div className="row g-4">
          {gheeSweets.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
        
        {/* <div className="text-center my-4">
          <button type="button" className="btn btn-dark px-5" style={{width:'250px'}}>
            Take a Look
          </button>
        </div> */}
      </div>
    );
  }