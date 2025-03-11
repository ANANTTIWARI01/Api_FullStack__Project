import { useEffect, useState } from "react";
import React from 'react'
import instance from "../axiosconfig";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";


function ShowProduct() {

    const [fetchData, setFetchData] = useState({})


    async function fetchingData() {
        try {
          const getData = await instance.get("/product/get");
          setFetchData(getData.data)
    
        } catch (error) {
          console.log(error)
        }
      }
       
      useEffect(()=>{
        fetchingData()
      },[fetchData])


  return (
    <>
    <div>
    <div>
        {/* <button onClick={() => { fetchingData() }}>Get Products</button> */}
        <p>fetch products</p>
      </div>

      <div className="flex flex-row">
        {fetchData.length > 0 ? (
          fetchData.map((obj) => {
            return (
              <div key={obj._id}>
                <h1>{obj.title}</h1>
                <p>{obj.description}</p>
                <h3>{obj.price}</h3>
                {/* <img src={`http://localhost:8080${obj.image}`} alt={obj.title} width="200" /> */}
                <Link to={`/product/${obj._id}`}>
                  <img src={`https://api-fullstack-project-back.onrender.com${obj.image}`} alt={obj.title} width="200" />
                </Link>

              </div>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
    </>
  )
}

export default ShowProduct