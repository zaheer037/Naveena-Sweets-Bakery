import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Saviours from '../Components/Saviours'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function SavioursPage() {
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
          <h1 className="mb-0" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            Tiffins & Snacks
          </h1>
        </div>
      </div>
    </div>
    <Saviours/>
    <Footer/>
    </>
  )
}
