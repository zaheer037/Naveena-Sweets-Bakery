import React from 'react'
import ProductCard from './ProductCard'
import { getProductsByCategory } from '../data/allProducts'

export default function Saviours() {
    // Get all products from multiple categories and combine them
    const namkeenData = getProductsByCategory('namkeen');
    const bunsData = getProductsByCategory('buns-breads');
    const biscuitsData = getProductsByCategory('biscuits-pies');
    
    // Convert objects to arrays and combine
    const namkeenItems = Object.values(namkeenData);
    const bunsItems = Object.values(bunsData);
    const biscuitsItems = Object.values(biscuitsData);
    
    // Combine all categories into one array
    const saviours = [...namkeenItems, ...bunsItems, ...biscuitsItems];

  return (
      <div className="container my-5">
        {/* Grid Layout - 3 cards per row */}
        <div className="row g-4">
          {saviours.map((item, index) => (
            <div key={`saviour-${item.category}-${item.id}-${index}`} className="col-lg-4 col-md-6 col-sm-12">
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