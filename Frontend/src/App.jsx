// import axios from "axios";
// import { useState } from "react"

// function App() {
//   const [productData, setProductData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     image: ""
//   })
  
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setProductData((prev) => {
//       return { ...prev, [name]: value };
//     })
//   }

//   function addData(e) {
//     e.preventDefault()
//     console.log(productData);
//     // try {
//     //   axios.post(`http://localhost:8080/api/product/add`, productData, {
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data'
//     //     }
//     //   })
//     // }
//     // catch (error) {
//     //   console.error("error", error);

//     // }
//   }


//   return (
//     <>
//       <div>
//         <form action="" onSubmit={addData}>
//           <label htmlFor="">UserName:</label>

//           <input type="text" name="title" value={productData.title} onChange={handleChange} />
//           <label htmlFor="">Description:</label>

//           <input type="text" name="description" value={productData.decription} onChange={handleChange} />
//           <label htmlFor="">Price:</label>

//           <input type="number" name="price" id="" value={productData.price} onChange={handleChange} />
//           <label htmlFor="">Choose a file :</label>

//           <input type="file" name="image" id="" value={productData.image} onChange={handleChange} />

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </>
//   )
// }

// export default App


import instance from "../axiosconfig";
import { useState } from "react";

function App() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null // Changed from empty string to null
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    
    // Handle file input differently
    setProductData((prev) => ({
      ...prev, 
      [name]: files ? files[0] : value
    }));
  }

  async function addData(e) {
    e.preventDefault();
    const formData = new formData(e.target)
    const finalData = Object.fromEntries(formData.entries());
    console.log(finalData)
    const response = await instance.post("/add", finalData);
    console.log(response);
  }



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
          
          <label htmlFor="image">Choose a file:</label>
          <input 
            type="file" 
            id="image"
            name="image" 
            onChange={handleChange}
            // Remove value for file input
          />
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;