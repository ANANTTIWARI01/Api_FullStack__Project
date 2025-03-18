import instance from "../axiosconfig";
import { useState } from "react";
import SingleProduct from "./SingleProduct";

function AddProduct() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }))
  }

  async function addData(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", productData.title)
      formData.append("description", productData.description)
      formData.append("price", productData.price)
      formData.append("image", productData.image)
      // console.log("productData", product Data);
      const response = await instance.post("/product/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipar/form-data" }
      });
      console.log(response);
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4">
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Add New Product</h2>
          <form
            onSubmit={addData}
            encType="multipart/form-data"
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 text-lg font-medium mb-2">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">Description:</label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="price" className="block text-gray-700 text-lg font-medium mb-2">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="image" className="block text-gray-700 text-lg font-medium mb-2">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;