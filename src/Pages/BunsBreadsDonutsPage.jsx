import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Components/ProductCard'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import bun from '../assets/bun-800w.webp'
import creamBun from '../assets/cream-bun-800w.webp'
import jamBun from '../assets/jam-bun-800w.webp'
import donut from '../assets/do-nut-800w.webp'
import breadSmall from '../assets/bread-small-800w.webp'
import breadBig from '../assets/bread-big-800w.webp'

export default function BunsBreadsDonutsPage() {
  const navigate = useNavigate();

  const bunsBreadsItems = [
    {
      id: 1,
      title: "Bun",
      desc: "Fresh and soft plain buns",
      price: 10,
      img: bun,
      category: "buns-breads"
    },
    {
      id: 2,
      title: "Cream Bun",
      desc: "Soft buns filled with fresh cream",
      price: 20,
      img: creamBun,
      category: "buns-breads"
    },
    {
      id: 3,
      title: "Jam Bun",
      desc: "Sweet buns with jam filling",
      price: 20,
      img: jamBun,
      category: "buns-breads"
    },
    {
      id: 4,
      title: "Do-Nut",
      desc: "Delicious fried ring donuts",
      price: 40,
      img: donut,
      category: "buns-breads"
    },
    {
      id: 5,
      title: "Bread Small",
      desc: "Small size fresh bread loaf",
      price: 40,
      img: breadSmall,
      category: "buns-breads"
    },
    {
      id: 6,
      title: "Bread Big",
      desc: "Large size fresh bread loaf",
      price: 60,
      img: breadBig,
      category: "buns-breads"
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
              Buns, Breads & Donuts
            </h1>
          </div>
        </div>
      </div>
      
      <div className="container my-5">
        <div className="row g-4">
          {bunsBreadsItems.map((item) => (
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