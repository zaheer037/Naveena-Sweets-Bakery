import React, { useEffect } from 'react'
import './App.css'
import MainLayout from './Layout/MainLayout'
import { CartProvider } from './Context/CartContext'
import { preloadCriticalImages } from './utils/imagePreloader'

function App() {
  useEffect(() => {
    // Preload critical images when app loads
    preloadCriticalImages().then(() => {
      console.log('Critical images preloaded');
    }).catch(error => {
      console.warn('Some critical images failed to preload:', error);
    });
  }, []);

  return (
    <CartProvider>
     <MainLayout/>
    </CartProvider>
  )
}

export default App
