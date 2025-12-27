import React from 'react'
import ProductCard from './ProductCard'
import ddhoodPeda from '../assets/dhood-peda-800w.webp'
import kovaSpecials from '../assets/kova-800w.webp'

export default function MilkSweets() {
    const milkSweets = [
        {
          id: 1,
          title: "Dhood Peda",
          desc: "Traditional milk fudge rounds made with pure milk",
          price: 520,
          img: ddhoodPeda,
          category: "milk-sweets"
        },
        {
          id: 2,
          title: "Kova Specials",
          desc: "Premium milk solid sweets with special flavoring",
          price: 520,
          img: kovaSpecials,
          category: "milk-sweets"
        },
      ];

  return (
      <div className="container my-5">
        {/* Grid Layout - 3 cards per row */}
        <div className="row g-4">
          {milkSweets.map((item) => (
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