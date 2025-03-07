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
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <h3>{product.price}</h3>
      <img src={`http://localhost:8080${product.image}`} alt={product.title} />

    </div>
  )
}

export default SingleProduct