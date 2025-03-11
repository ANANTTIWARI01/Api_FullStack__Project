import instance from "../axiosconfig";
import { useState } from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function AddProduct() {

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [fetchData, setFetchData] = useState({})

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

  async function fetchingData() {
    try {
      const getData = await instance.get("/product/get");
      setFetchData(getData.data)

    } catch (error) {
      console.log(error)
    }
  }

// console.log(instance);

  return (
    <>
      <div>
        <form
          onSubmit={addData}
          encType="multipart/form-data"
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={productData.description} // Fixed typo here
            onChange={handleChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />

          <label htmlFor="">Image:</label>
          <input type="file" name="image" onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <button onClick={() => { fetchingData() }}>Get Products</button>
      <p>fetch products</p>
      </div>


      <div>
        {fetchData.length > 0 ? (
          fetchData.map((obj) => {
            return (
              <div key={obj._id}>
                <h1>{obj.title}</h1>
                <p>{obj.description}</p>
                <h3>{obj.price}</h3>
                {/* <img src={`http://localhost:8080${obj.image}`} alt={obj.title} width="200" /> */}
                <Link to={`/product/${obj._id}`}>
                  <img src={`https://api-fullstack-project-back.onrender.com/api${obj.image}`} alt={obj.title} width="200" />
                </Link>

              </div>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}

export default AddProduct;