
import React, { useState } from 'react'
import instance from '../../axiosconfig'

function AddCategory() {
    const [form,setForm] = useState({
        title:"",
        image:"",
    })

    function handleChange(e){
        let { name,value } = e.target
         if(name==="image"){
            value = e.target.files[0]
         }
         setForm((prev)=>{return {...prev,[name]:value}})
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const formData = new FormData()
            formData.append("title",form.title)
            formData.append("image",form.image)
            const response = await instance.post("/product/category/add",formData,{withCredentials:true}) 
            console.log(response.data);
                       
        }
        catch(error){
            console.log(error);
        }



    }
    return (
        <>
         <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" name="title" value={form.name} onChange={handleChange}/>
        <input type="file" name="image"  onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
{/* 
       <div>
        {
            form.map((obj)=>{
                return (
                <div key={obj._id}>
                    <h1>{obj.title}</h1>
                    <img src={`http://localhost:8080${obj.image}`} alt={obj.title} />
                </div>
                )
            })
        }
       </div> */}
        </>
    )
}

export default AddCategory