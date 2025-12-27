import React from 'react'
import ProductCard from './ProductCard'
import coolCake from '../assets/cool-cake-800w.webp'
import chocolateCoolCake from '../assets/chocolate-cool-cake-800w.webp'
import blackForestCoolCake from '../assets/black-forest-cool-cake-800w.webp'
import redVelvetCoolCake from '../assets/red-velvet-cool-cake-800w.webp'
import coolCakeHalfKg from '../assets/cool-cake-0.5kg-800w.webp'
import chocolateCoolCakeHalfKg from '../assets/chocolate-cool-cake-0.5kg-800w.webp'
import blackForestCoolCakeHalfKg from '../assets/black-forest-cool-cake-0.5kg-800w.webp'
import redVelvetCoolCakeHalfKg from '../assets/red-velvet-cool-cake-0.5kg-800w.webp'
import coolCakePiece from '../assets/cool-cake-piece-800w.webp'

export default function CoolCakes() {
    const coolCakes = [
        {
          id: 1,
          title: "Cool Cake",
          desc: "Refreshing layered birthday cake",
          price: 550,
          img: coolCake,
          category: "cool-cakes"
        },
        {
          id: 2,
          title: "Chocolate Cool Cake",
          desc: "Rich chocolate flavored cool cake",
          price: 650,
          img: chocolateCoolCake,
          category: "cool-cakes"
        },
        {
          id: 3,
          title: "Black Forest Cool Cake",
          desc: "Classic black forest cool cake",
          price: 650,
          img: blackForestCoolCake,
          category: "cool-cakes"
        },
        {
         id: 4,
         title: "Red Velvet Cool Cake",
         desc: "Premium red velvet cool cake",
         price: 750,
         img: redVelvetCoolCake,
         category: "cool-cakes"
       },
       {
         id: 5,
         title: "Cool (1/2kg)",
         desc: "Half kg cool cake",
         price: 250,
         img: coolCakeHalfKg,
         category: "cool-cakes"
       },
       {
         id: 6,
         title: "Chocolate Cool Cake (1/2kg)",
         desc: "Half kg chocolate cool cake",
         price: 300,
         img: chocolateCoolCakeHalfKg,
         category: "cool-cakes"
       },
       {
         id: 7,
         title: "Black Forest Cool Cake (1/2kg)",
         desc: "Half kg black forest cool cake",
         price: 300,
         img: blackForestCoolCakeHalfKg,
         category: "cool-cakes"
       },
       {
         id: 8,
         title: "Red Velvet Cool Cake (1/2kg)",
         desc: "Half kg red velvet cool cake",
         price: 350,
         img: redVelvetCoolCakeHalfKg,
         category: "cool-cakes"
       },
       {
         id: 9,
         title: "Cool Cake (pc) - Regular",
         desc: "Individual cool cake piece",
         price: 40,
         img: coolCakePiece,
         category: "cool-cakes"
       },
       {
         id: 10,
         title: "Cool Cake (pc) - Premium",
         desc: "Premium individual cool cake piece",
         price: 50,
         img: coolCakePiece,
         category: "cool-cakes"
       },
      ];

  return (
      <div className="container my-5">
        {/* Grid Layout - 3 cards per row */}
        <div className="row g-4">
          {coolCakes.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
        
        {/* <div className="text-center my-4">
          <button type="button" className="btn btn-dark px-5" style={{width:'250px'}}>
            Order Now
          </button>
        </div> */}
      </div>
    );
  }