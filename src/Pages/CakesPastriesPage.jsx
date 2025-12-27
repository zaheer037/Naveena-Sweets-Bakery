import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Components/ProductCard'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import milkMadeCake from '../assets/milk-made-cake-800w.webp'
import plainCake from '../assets/plain-cake-800w.webp'
import pineappleCake from '../assets/pineapple-cake-800w.webp'
import chocolateCake from '../assets/chocolate-cake-800w.webp'
import creamCakePiece from '../assets/cream-cake-piece-800w.webp'
import normalCake1kg from '../assets/normal-cake-1kg-800w.webp'
import normalCakeHalfKg from '../assets/normal-cake-0.5kg-800w.webp'
import plumCakeSmall from '../assets/plum-cake-small-800w.webp'
import plumCakeBig from '../assets/plum-cake-big-800w.webp'
import dilpasand from '../assets/dilpasand-800w.webp'

export default function CakesPastriesPage() {
  const navigate = useNavigate();

  const cakesPastriesItems = [
    {
      id: 1,
      title: "Milk Made Cake(pcs)",
      desc: "Rich cake made with fresh milk",
      price: 60,
      img: milkMadeCake,
      category: "cakes-pastries"
    },
    {
      id: 2,
      title: "Plain Cake(pcs)",
      desc: "Classic vanilla sponge cake",
      price: 60,
      img: plainCake,
      category: "cakes-pastries"
    },
    {
      id: 3,
      title: "Pineapple Cake(pcs)",
      desc: "Fresh pineapple flavored cake",
      price: 60,
      img: pineappleCake,
      category: "cakes-pastries"
    },
    {
      id: 4,
      title: "Chocolate Cake(pcs)",
      desc: "Rich chocolate sponge cake",
      price: 60,
      img: chocolateCake,
      category: "cakes-pastries"
    },
    {
      id: 5,
      title: "Cream Cake (pcs)",
      desc: "Individual cream cake pieces",
      price: 20,
      img: creamCakePiece,
      category: "cakes-pastries"
    },
    {
      id: 6,
      title: "Normal Cake",
      desc: "Standard size celebration cake",
      price: 280,
      img: normalCake1kg,
      category: "cakes-pastries"
    },
    {
      id: 7,
      title: "Normal Cake (1/2kg)",
      desc: "Half kg celebration cake",
      price: 140,
      img: normalCakeHalfKg,
      category: "cakes-pastries"
    },
    {
      id: 8,
      title: "Plum Cake (Small)",
      desc: "Small size traditional plum cake",
      price: 30,
      img: plumCakeSmall,
      category: "cakes-pastries"
    },
    {
      id: 9,
      title: "Plum Cake (Big)",
      desc: "Large size traditional plum cake",
      price: 70,
      img: plumCakeBig,
      category: "cakes-pastries"
    },
    {
      id: 10,
      title: "Dilpasand",
      desc: "Traditional Indian sweet cake",
      price: 70,
      img: dilpasand,
      category: "cakes-pastries"
    }
  ];

  return (
    <>
      <Header/>
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-light me-3"
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
            <h1 className="mb-0" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              Cakes & Pastries
            </h1>
          </div>
        </div>
      </div>
      
      <div className="container my-5">
        <div className="row g-4">
          {cakesPastriesItems.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
      
      <Footer/>
    </>
  )
}