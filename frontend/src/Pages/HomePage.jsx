import React, { useEffect, useState } from 'react'
import Card from '../components/ProductCard/Card'
import axios from 'axios';
import { Car } from 'lucide-react';
function HomePage() {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
      const response = await axios.get('http://localhost:8080/product/get-products');
      setProducts(response.data.data);  
    }

    useEffect(()=>{
      const callProducts = async () => {
        await getProducts();
      }
      callProducts();
    },[]);    
    
      
  return(
    <>
    <div className='grid gap-4 grid-cols-4'>
        {products.map( (element, index)=> ( 
          <Card product = {element} key={index}/>
        ))}
        
    </div>
    </>
  )
   
}

export default HomePage
