import React from 'react'
import Header from '../Components/Header'
import Carousel from '../Components/Carousel'
import About from '../Components/About'
import CustomerFavs from '../Components/CustomerFavs'
import Gifts from '../Components/SweetItems'
import Namkeen from '../Components/NamekeenItems'
import Cakes from '../Components/Cakes'
import Footer from '../Components/Footer'


export default function Home() {
  return (
    <>
    <Header/>
    <Carousel/>
    <h2>Crafting Sweet Moments Since 1995</h2>
    <About/>
    <CustomerFavs/>
    <h2 className='font-poppins font-bold text-2xl'>Gifting Moments That Melt in Every Bite</h2>
    {/* <p className='text-center mx-auto my-4' style={{ maxWidth: "700px", lineHeight: "1.7", fontSize: "1.05rem" }}>Each gift box is a curated blend of tradition and taste, designed to elevate every occasion. From festive gatherings to heartfelt moments, our sweets bring joy that’s meant to be shared. Beautifully packed, freshly made it’s more than a gift, it’s a memory in the making</p> */}
    <Gifts scrollable={true} />
    <h2 className='font-poppins font-bold text-2xl'>Namkeen</h2>
    {/* <p className='text-center mx-auto my-5' style={{ maxWidth: "700px", lineHeight: "1.7", fontSize: "1.05rem" }}>Everyday Crunch, Elevated  Our namkeen's range blends classic recipes with premium ingredients to deliver the perfect balance of flavor and freshness. Whether you prefer spicy, tangy, or subtly salted, these timeless snacks are crafted to keep you coming back for more.</p> */}
    <Namkeen scrollable={true}/>
    <h2 className='font-poppins font-bold text-2xl'>Freshly Baked Items</h2>
    {/* <p className='text-center mx-auto my-5' style={{ maxWidth: "700px", lineHeight: "1.7", fontSize: "1.05rem" }}>From soft sponge cakes to rich layered indulgences, our bakery is where tradition meets creativity. Every bite is a celebration — made with premium ingredients, perfected recipes, and a touch of sweetness that lingers. Whether it's a birthday, a milestone, or just a moment of joy, our cakes are crafted to make it unforgettable.</p> */}
    <Cakes scrollable={true} />
    <Footer/>
    </>
  )
}
