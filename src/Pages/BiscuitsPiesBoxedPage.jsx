import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Components/ProductCard'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import eggBiscuits from '../assets/egg-biscuits-800w.webp'
import cupCakes from '../assets/cup-cakes-800w.webp'
import datesPie from '../assets/dates-pie-800w.webp'
import datesPiePiece from '../assets/dates-pie-piece-800w.webp'
import saltBiscuits from '../assets/salt-biscuits-800w.webp'
import osmaniaBiscuits from '../assets/osmania-biscuits-800w.webp'
import roseCakes from '../assets/rose-cakes-1pkt-800w.webp'

export default function BiscuitsPiesBoxedPage() {
  const navigate = useNavigate();

  const biscuitsPiesItems = [
    {
      id: 1,
      title: "Biscuit Box",
      desc: "Assorted biscuits in a gift box",
      price: 70,
      img: osmaniaBiscuits,
      category: "biscuits-pies"
    },
    {
      id: 2,
      title: "Cup Cakes",
      desc: "Individual portion cupcakes",
      price: 60,
      img: cupCakes,
      category: "biscuits-pies"
    },
    {
      id: 3,
      title: "Egg Biscuits",
      desc: "Traditional egg-based biscuits",
      price: 50,
      img: eggBiscuits,
      category: "biscuits-pies"
    },
    {
      id: 4,
      title: "Dates Pie",
      desc: "Sweet dates filled pie",
      price: 100,
      img: datesPie,
      category: "biscuits-pies"
    },
    {
      id: 5,
      title: "Dates Pie (pc)",
      desc: "Individual dates pie piece",
      price: 30,
      img: datesPiePiece,
      category: "biscuits-pies"
    },
    {
      id: 6,
      title: "Salt Biscuits",
      desc: "Crispy salted biscuits",
      price: 60,
      img: saltBiscuits,
      category: "biscuits-pies"
    },
    {
      id: 7,
      title: "Osmania Biscuits",
      desc: "Famous Hyderabadi tea biscuits",
      price: 80,
      img: osmaniaBiscuits,
      category: "biscuits-pies"
    },
    {
      id: 8,
      title: "Rose Cakes (1 pkt)",
      desc: "Rose flavored cake packet",
      price: 60,
      img: roseCakes,
      category: "biscuits-pies"
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
              Biscuits, Pies & Boxed Items
            </h1>
          </div>
        </div>
      </div>
      
      <div className="container my-5">
        <div className="row g-4">
          {biscuitsPiesItems.map((item) => (
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