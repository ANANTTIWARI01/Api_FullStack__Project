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
    // if (e.target.name === "image") {
    //   // console.log(e.target.files[0])

    //   setProductData((prev) => ({
    //     ...prev, image: e.target.files[0]
    //   }))

    // }
    // else {
    //   const { name, value,type, files } = e.target;
    //   setProductData((prev) => ({
    //     ...prev,
    //     [name]: type === "file" ? files[0] : value
    //   }));
    // }
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


  // console.log(instance);
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="">
          <form
            onSubmit={addData}
            encType="multipart/form-data"
            className="flex flex-col bg-sky-700 h-[50%] justify-center items-center"
          >
            <div className="flex mx-3 my-4">
              <label htmlFor="title" className="text-3xl m-1">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                className="rounded-lg border-2 border-black m-3 w-[50%]"
              />
            </div>
            <div className="flex mx-3 my-4">
              <label htmlFor="description" className="text-3xl m-1">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={productData.description} // Fixed typo here
                onChange={handleChange}
                className="rounded-lg border-2 border-black m-3 w-[50%]"
              />
            </div>
            <div className="flex mx-3 my-4">
              <label htmlFor="price" className="text-3xl m-1">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="rounded-lg border-2 border-black m-3 w-[50%]"
              />
            </div>
             <div className="flex mx-5  my-4">
            <label htmlFor="" className="text-3xl mx-3">Image:</label>
            <input type="file" name="image" onChange={handleChange} className="rounded-lg border-2 border-black m-3 w-[50%]" />
            </div>
            <button type="submit" className="border-2 border-black rounded-lg">Submit</button>
          </form>
        </div>
      </div>
      
    </>
  );
}

export default AddProduct;