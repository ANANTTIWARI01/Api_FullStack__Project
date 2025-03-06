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
    image:"",
  });
  const [fetchData,setFetchData] =useState({})

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev, 
      [name]: value
    }));
  }

  async function addData(e) {
    e.preventDefault();
    try{
      const formData= new FormData();
       formData.append("title",productData.title)
       formData.append("description",productData.description)
       formData.append("price",productData.price)
       formData.append("image",productData.image)
       const response = await instance.post("/product/add", productData,{withCredentials:true});
       console.log(response);
       
    }
    catch(error){
      console.log(error)
    }
  }

  async function fetchingData(){
    const getData = await instance.get("/product/get",fetchData)
    console.log(getData);
    
    setFetchData(getData.data)
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

          <label htmlFor="">Image:</label>
          <input type="file" name="image" value={productData.image} onChange={handleChange} />
          
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <button onClick={()=>{fetchingData()}}>Get Products</button>
             
             
      </div>
      <div>
        {fetchData.length > 0 ? (
          fetchData.map((obj) => {
            return (
              <div key={obj._id}>
                <h1>{obj.title}</h1>
                <p>{obj.description}</p>
                <h3>{obj.price}</h3>
                <img src={obj.image} alt={obj.title} />
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

export default App;