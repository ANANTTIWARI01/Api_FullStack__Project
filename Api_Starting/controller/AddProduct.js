import Product from "../models/Product.model.js";

export async function addProduct(req,res){
       try{
        const newProduct = new Product({...req.body});
       //  console.log(newProduct);
            await newProduct.save()
            res.status(201).json({message:"Product Added"})

       }
       catch (err) {
              console.error("error" ,err)        
       }
};

export async function fetchProducts(req,res){
       try{
              const productId = req.params.id;
              const singleProduct = await Product.findById({_id : productId})
              res.json(singleProduct);
              res.status(201).json({message:"Product Added"})
       }
       catch(error){
              res.status(404).json({error:err,}, "failed")
       }
   }