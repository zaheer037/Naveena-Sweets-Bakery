import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Cakes from '../Components/Cakes'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function CakesPage() {
  const navigate = useNavigate();

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
        </div>
      </div>
    </div>
    <Cakes/>
    <Footer/>
    </>
  )
}