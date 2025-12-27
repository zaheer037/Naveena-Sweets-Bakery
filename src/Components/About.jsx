import React from 'react'
import Frame from '../assets/frame-800w.webp'

export default function About() {
  return (
    <>
    <div className="container my-5 d-flex justify-content-center">
  <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: '900px' }}>
    <div className="row g-0">
      
      {/* Image Section */}
      <div className="col-md-4">
        <img 
          src={Frame} 
          className="img-fluid rounded-start h-100 object-fit-cover" 
          alt="..." 
        />
      </div>
      
      {/* Text Section */}
      <div className="col-md-8">
        <div className="card-body">
          {/* <h5 className="card-title fw-bold">Card title</h5> */}
          <p className="card-text mt-5">
           We've been dedicated to the art of creating unforgettable sweets, snacks, and treats. At <b>Naveena Sweets & Bakery</b>, we believe that true excellence lies in quality, not quantity. Every bite is a reflection of our passion, tradition, and unwavering commitment to purity and taste.
          </p>
          {/* <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p> */}
        </div>
      </div>

    </div>
  </div>
</div>


    </>
  )
}
