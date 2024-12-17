import React from 'react'
import Card from '../components/ProductCard/Card'
import watchImage from '../assets/shopping.png'
function HomePage() {
    const demoProduct = {
        name: "Smart Watch Series 6",
        description: "Track your fitness, health, and notifications with the latest Smart Watch Series 6. Lightweight and water-resistant.",
        price: 249.99,
        image:watchImage ,
    };
      
  return(
    <>
    <div className='grid gap-4 grid-cols-3'>
        <Card product = { demoProduct}/>
        <Card product = { demoProduct} />
        <Card product = { demoProduct} />
        <Card product = { demoProduct} />
        <Card product = { demoProduct} />
        <Card product = { demoProduct} />
    </div>
    </>
  )
   
}

export default HomePage
