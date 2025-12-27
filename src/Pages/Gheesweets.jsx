import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import GheeSweets from '../Components/GheeSweets'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function GheesweetsPage() {
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
            Ghee Sweets
          </h1>
        </div>
      </div>
    </div>
    <GheeSweets/>
    <Footer/>
    </>
  )
}
