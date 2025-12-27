import React from 'react'
import ProductCard from './ProductCard'
import mixture from '../assets/mixture-800w.webp'
import boondi from '../assets/boondhi-800w.webp'
import chekodi from '../assets/chekodi-800w.webp'
import dallmudi from '../assets/dallmudi-800w.webp'
import multiGrainMixture from '../assets/multi-grain-mixture-800w.webp'
import sannapusa from '../assets/sannapusa-800w.webp'
import vampusa from '../assets/vam-pusa-800w.webp'
import ribbonPakodi from '../assets/ribbon-pakodi-800w.webp'
import murukulu from '../assets/murukulu-800w.webp'
import chekkalu from '../assets/chekkalu-800w.webp'
import cornflakes from '../assets/cornflakes-800w.webp'
import atukulaMixture from '../assets/atukula-mixture-800w.webp'
import palliPakodi from '../assets/palli-pakodi-800w.webp'
import senagalu from '../assets/sanagalu-800w.webp'
import chips from '../assets/potato-chips-800w.webp'
import kajuFry from '../assets/kaju-fry-800w.webp'

export default function Namkeen({ scrollable = false }) {
  const namkeenItems = [
    {
      id: 1,
      title: "Mixture",
      desc: "Traditional mixed namkeen with nuts and spices",
      price: 280,
      img: mixture,
      category: "namkeen"
    },
    {
      id: 2,
      title: "Boondi",
      desc: "Crispy gram flour balls seasoned with spices",
      price: 280,
      img: boondi,
      category: "namkeen"
    },
    {
      id: 3,
      title: "Chekodi",
      desc: "Traditional Andhra rice crackers",
      price: 280,
      img: chekodi,
      category: "namkeen"
    },
    {
      id: 4,
      title: "Dallmudi",
      desc: "Spiced lentil mixture with herbs",
      price: 300,
      img: dallmudi,
      category: "namkeen"
    },
    {
      id: 5,
      title: "Multi Grain Mixture",
      desc: "Healthy mixed grains namkeen snack",
      price: 300,
      img: multiGrainMixture,
      category: "namkeen"
    },
    {
      id: 6,
      title: "Sannapusa (250gms)",
      desc: "Traditional steamed rice cakes (250gms pack)",
      price: 60,
      img: sannapusa,
      category: "namkeen"
    },
    {
      id: 7,
      title: "Vam Pusa (250gms)",
      desc: "Crispy rice puffs snack (250gms pack)",
      price: 60,
      img: vampusa,
      category: "namkeen"
    },
    {
      id: 8,
      title: "Ribbon Pakodi (250gms)",
      desc: "Twisted gram flour ribbons (250gms pack)",
      price: 60,
      img: ribbonPakodi,
      category: "namkeen"
    },
    {
      id: 9,
      title: "Murukulu (250gms)",
      desc: "Spiral shaped rice flour snack (250gms pack)",
      price: 60,
      img: murukulu,
      category: "namkeen"
    },
    {
      id: 10,
      title: "Chekkalu (250gms)",
      desc: "Thin rice wafer crisps (250gms pack)",
      price: 60,
      img: chekkalu,
      category: "namkeen"
    },
    {
      id: 11,
      title: "Chekralu (250gms)",
      desc: "Traditional rice flour spirals (250gms pack)",
      price: 60,
      img: chekkalu,
      category: "namkeen"
    },
    {
      id: 12,
      title: "Cornflakes (250gms)",
      desc: "Spiced corn flakes mixture (250gms pack)",
      price: 60,
      img: cornflakes,
      category: "namkeen"
    },
    {
      id: 13,
      title: "Atukula Mixture (250gms)",
      desc: "Flattened rice mixture snack (250gms pack)",
      price: 60,
      img: atukulaMixture,
      category: "namkeen"
    },
    {
      id: 14,
      title: "Palli Pakodi (200gms)",
      desc: "Peanut coated gram flour snack (200gms pack)",
      price: 60,
      img: palliPakodi,
      category: "namkeen"
    },
    {
      id: 15,
      title: "Senagalu",
      desc: "Roasted chickpeas with spices",
      price: 60,
      img: senagalu,
      category: "namkeen"
    },
    {
      id: 16,
      title: "Chips (100gms)",
      desc: "Crispy potato chips (100gms pack)",
      price: 40,
      img: chips,
      category: "namkeen"
    },
    {
      id: 17,
      title: "Kaju Fry",
      desc: "Premium fried cashews with spices",
      price: 1400,
      img: kajuFry,
      category: "namkeen"
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
          {namkeenItems.map((item) => (
            <div key={item.id} className="flex-shrink-0" style={{ width: "250px" }}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container my-5">
      {/* Grid Layout - 3 cards per row */}
      <div className="row g-4">
        {namkeenItems.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
            <ProductCard item={item} />
          </div>
        ))}
      </div>

      {/* <div className="text-center my-4">
        <button type="button" className="btn btn-dark px-5" style={{ width: '250px' }}>
          Take a Look
        </button>
      </div> */}
    </div>
  );
}