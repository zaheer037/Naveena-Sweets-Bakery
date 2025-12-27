import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Sweets from '../Pages/Sweets'
import Home from '../Pages/Home'
import Saviours from '../Pages/Saviours'
import Gheesweets from '../Pages/Gheesweets'
import MilkSweets from '../Pages/MilkSweets'
import Namkeen from '../Pages/Namkeen'
import Cakes from '../Pages/Cakes'
import BunsBreadsDonutsPage from '../Pages/BunsBreadsDonutsPage'
import CakesPastriesPage from '../Pages/CakesPastriesPage'
import BiscuitsPiesBoxedPage from '../Pages/BiscuitsPiesBoxedPage'
import CoolCakesPage from '../Pages/CoolCakesPage'
import ProductDetailPage from '../Pages/ProductDetailPage'

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function AppRouting() {
  return (
   <>
   <ScrollToTop />
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sweet' element={<Sweets/>} />
    <Route path='/sav' element={<Saviours/>}/>
    <Route path='/ghee' element={<Gheesweets/>}/>
    <Route path='/cake' element={<Cakes/>}/>
    <Route path='/buns-breads-donuts' element={<BunsBreadsDonutsPage/>}/>
    <Route path='/cakes-pastries' element={<CakesPastriesPage/>}/>
    <Route path='/biscuits-pies-boxed' element={<BiscuitsPiesBoxedPage/>}/>
    <Route path='/cool-cakes' element={<CoolCakesPage/>}/>
    <Route path='/product/:category/:id' element={<ProductDetailPage/>}/>
    <Route path='/milk' element={<MilkSweets/>}/>
    <Route path='/namk' element={<Namkeen/>}/>
   </Routes>
   </>
  )
}
