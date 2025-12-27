import React from 'react'
import ProductCard from './ProductCard'
import goldenLaddo from '../assets/golden-laddo-800w.webp'
import mysoorPak from '../assets/mysoor-pak-800w.webp'
import kaja from '../assets/kaja-800w.webp'
import kajjikaya from '../assets/kajjikaya-800w.webp'
import jangri from '../assets/jangri-800w.webp'
import sunnundaBellam from '../assets/sullunda-800w.webp'
import sunnundaSugar from '../assets/sullunda-800w.webp'
import motichurLaddu from '../assets/motichur-laddo-800w.webp'
import bombayHalwa from '../assets/bombay-halwa-800w.webp'
import ddhoodPeda from '../assets/dhood-peda-800w.webp'
import kalakan from '../assets/kalakan-800w.webp'
import dryFruitHalwa from '../assets/dry-fruit-halwa-800w.webp'
import butterBurfi from '../assets/butter-burfi-800w.webp'
import dryFruitLaddu from '../assets/dry-fruit-laddu-800w.webp'
import kajuBurfi from '../assets/kaju-burfi-800w.webp'
import kajuPakam from '../assets/kaju-pakam-800w.webp'
import mithai from '../assets/mithai-800w.webp'
import plainPutarekulu from '../assets/plain-putharekulu-800w.webp'
import dryFruitPutarekulu from '../assets/dry-fruit-putharekulu-800w.webp'
import bobbatlu from '../assets/bobbatlu-800w.webp'

export default function SweetItems({ scrollable = false }) {
    const SweetItems = [
        {
          id: 1,
          title: "Laddu",
          desc: "Traditional sweet made with gram flour and ghee",
          price: 280,
          img: goldenLaddo,
          category: "sweets"
        },
        {
          id: 2,
          title: "Mysoor Pak",
          desc: "Classic South Indian sweet with ghee and gram flour",
          price: 280,
          img: mysoorPak,
          category: "sweets"
        },
        {
          id: 3,
          title: "Kaja",
          desc: "Crispy layered sweet with sugar syrup",
          price: 280,
          img: kaja,
          category: "sweets"
        },
        {
         id: 4,
         title: "Kovakajjikaya",
         desc: "Traditional Andhra sweet with coconut and jaggery",
         price: 280,
         img: kajjikaya,
         category: "sweets"
       },
       {
         id: 5,
         title: "Jangri",
         desc: "Spiral shaped sweet soaked in sugar syrup",
         price: 280,
         img: jangri,
         category: "sweets"
       },
       {
         id: 6,
         title: "Sunnunda (Bellam)",
         desc: "Traditional jaggery-based sweet balls",
         price: 440,
         img: sunnundaBellam,
         category: "sweets"
       },
       {
         id: 7,
         title: "Sunnunda (Sugar)",
         desc: "Sweet balls made with sugar and gram flour",
         price: 400,
         img: sunnundaSugar,
         category: "sweets"
       },
       {
         id: 8,
         title: "Motichur Laddu",
         desc: "Fine gram flour pearls formed into sweet balls",
         price: 400,
         img: motichurLaddu,
         category: "sweets"
       },
       {
         id: 9,
         title: "Bombay Halwa",
         desc: "Translucent sweet made with corn flour and ghee",
         price: 400,
         img: bombayHalwa,
         category: "sweets"
       },
       {
         id: 10,
         title: "Bengali",
         desc: "Traditional Bengali milk-based sweet",
         price: 520,
         img: ddhoodPeda,
         category: "sweets"
       },
       {
         id: 11,
         title: "Kalakan Items",
         desc: "Special mixed sweet varieties",
         price: 560,
         img: kalakan,
         category: "sweets"
       },
       {
         id: 12,
         title: "Dry Fruit Halwa",
         desc: "Rich halwa loaded with mixed dry fruits",
         price: 600,
         img: dryFruitHalwa,
         category: "sweets"
       },
       {
         id: 13,
         title: "Butter Burfi",
         desc: "Soft and creamy butter-flavored burfi",
         price: 600,
         img: butterBurfi,
         category: "sweets"
       },
       {
         id: 14,
         title: "Dry Fruit Laddu",
         desc: "Nutritious laddu packed with dry fruits",
         price: 600,
         img: dryFruitLaddu,
         category: "sweets"
       },
       {
         id: 15,
         title: "Kaju Burfi",
         desc: "Premium cashew sweet with silver foil",
         price: 1000,
         img: kajuBurfi,
         category: "sweets"
       },
       {
         id: 16,
         title: "Kaju Pakam",
         desc: "Traditional cashew sweet delicacy",
         price: 1000,
         img: kajuPakam,
         category: "sweets"
       },
       {
         id: 17,
         title: "Kaju Specials",
         desc: "Special variety of cashew-based sweets",
         price: 1000,
         img: kajuBurfi,
         category: "sweets"
       },
       {
         id: 18,
         title: "Mithai",
         desc: "Assorted traditional Indian sweets",
         price: 280,
         img: mithai,
         category: "sweets"
       },
       {
         id: 19,
         title: "Plain Putarekulu (5pcs)",
         desc: "Traditional Andhra paper-thin sweet (5 pieces)",
         price: 70,
         img: plainPutarekulu,
         category: "sweets"
       },
       {
         id: 20,
         title: "Dry Fruit Putarekulu (5pcs)",
         desc: "Paper-thin sweet with dry fruits (5 pieces)",
         price: 120,
         img: dryFruitPutarekulu,
         category: "sweets"
       },
       {
         id: 21,
         title: "Bobbatlu",
         desc: "Traditional Andhra festival sweet with jaggery",
         price: 60,
         img: bobbatlu,
         category: "sweets"
       },
      ];
  if (scrollable) {
    // Scrollable layout for home page
    return (
      <div className="container my-5">
        {/* Scrollable Row */}
        <div
          className="d-flex overflow-auto pb-3 custom-scroll"
          style={{ scrollSnapType: "x mandatory", gap: "20px" }}
        >
          {SweetItems.map((item) => (
            <div key={item.id} className="flex-shrink-0" style={{ width: "250px" }}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grid layout for category pages
  return (
      <div className="container my-5">
        {/* Grid Layout - 3 cards per row */}
        <div className="row g-4">
          {SweetItems.map((item) => (
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
