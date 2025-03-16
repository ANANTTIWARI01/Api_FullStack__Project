import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../axiosconfig'

function SingleProduct() {
  const [product, setProduct] = useState({})
  let { id } = useParams()
  useEffect(() => {
    if (id) {
      productFetching(id)
    }
  }, [id])
  
  async function productFetching(id) {
    const response = await instance.get("/product/get/" + id)
    setProduct(response.data[0])
    
    // console.log(response.data);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product image */}
          <div className="md:w-1/2">
            <img 
              src={`https://api-fullstack-project-back.onrender.com${product.image}`} 
              alt={product.title} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          {/* Product details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <h3 className="text-2xl font-bold text-indigo-600">${product.price}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct