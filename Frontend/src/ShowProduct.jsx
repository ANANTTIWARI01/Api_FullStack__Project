import { useEffect, useState } from "react";
import React from 'react';
import instance from "../axiosconfig";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import AddProduct from "./AddProduct";

function ShowProduct() {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchingData() {
    try {
      setLoading(true);
      const getData = await instance.get("/product/get");
      setFetchData(getData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  return (


    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">TOXIC CART</h1>
            {/* <Link
              to="/AddProduct"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
            >
              <span className="mr-2">+</span> Add Product
            </Link> */}
            <div className="flex items-center justify-around">
              <h3 className="text- xl font-semibold mx-5">Store</h3>
              <h3 className="text- xl font-semibold mx-4">Cart:0</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex  ">
        <div className="border-black border-solid border-r-1 w-[25%] ">
          <div className="flex flex-col text-start  p-3 ">
          <h1 className="  text-3xl font-semibold m-3">Category</h1>
            <Link className="m-2 text-xl ">
              All
            </Link>
            <Link className="m-2 text-xl">
              Beauty
            </Link>
            <Link className="m-2 text-xl">
              Fragrance
            </Link>
            <Link className="m-2 text-xl">
              Electronics
            </Link>
            <Link className="m-2 text-xl">
              Groceries
            </Link>
            <Link className="m-2 text-xl">
              Furniture
            </Link>
          </div>


        </div>
        <div className="max-w-7xl w-[75%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-start text-3xl font-semibold">Products</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-500">Loading products...</p>
            </div>
          ) : fetchData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fetchData.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`https://api-fullstack-project-back.onrender.com${product.image}`}
                        alt={product.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.title}</h2>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">In Stock</span>
                      </div>
                      <div className="m-4 text-center">
                        <Link className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4  rounded-md transition duration-300">
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
              <p className="text-xl text-gray-500 mb-4">No products available</p>
              <Link
                to="/AddProduct"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;