import { useEffect, useState } from "react";
import React from "react";
import instance from "../axiosconfig";
import { Link } from "react-router-dom";

function ShowProduct() {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from API
  async function fetchingData() {
    try {
      setLoading(true);
      const getData = await instance.get("/product/get");
      setFetchData(getData.data);
      setFilteredData(getData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  //filtering products according to their category
  function filterCategory(category) {
    if (category === "All") {
      setFilteredData(fetchData);
    } else {
      const filtered = fetchData.filter((product) => product.category === category);
      setFilteredData(filtered);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* /* Sidebar with categories */}
      <div className="flex">
        <div className="border-black border-solid border-r-1 w-[25%]">
          <div className="flex flex-col text-start px-8 mx-6">
            <h1 className="text-2xl font-semibold m-3">Categories</h1>
            <button className="m-2 text-lg" onClick={() => filterCategory("All")}>
              All
            </button>
            <button className="m-2 text-lg" onClick={() => filterCategory("Beauty")}>
              Beauty
            </button>
            <button className="m-2 text-lg" onClick={() => filterCategory("Fragrance")}>
              Fragrance
            </button>
            <button className="m-2 text-lg" onClick={() => filterCategory("Electronics")}>
              Electronics
            </button>
            <button className="m-2 text-lg" onClick={() => filterCategory("Groceries")}>
              Groceries
            </button>
            <button className="m-2 text-lg" onClick={() => filterCategory("Furniture")}>
              Furniture
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl w-[75%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-start text-3xl font-bold mb-6">Products</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-500">Loading products...</p>
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {product.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          In Stock
                        </span>
                      </div>
                      <div className="m-4 text-center">
                        <Link className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300" to="/cart">
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
              <p className="text-xl text-gray-500 mb-4">No products available here</p>
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
