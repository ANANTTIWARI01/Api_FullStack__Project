import Product from "../models/productModel.js";


// export async function addProduct(req, res) {
//        try {
//               console.log(req.file)
//               if (!req.file) return res.status(400).send({ message: "Image Not Found" });
//               const newProduct = new Product({ ...req.body, image: req.file.path });
//               //  console.log(req);

//               await newProduct.save()
//               res.status(201).send("Product Added")
//        }
//        catch (error) {
//               res.status(500).send({ message: "Product not added", Error: error.message })
//        }
// };

export async function addProduct(req, res) {
       try {
              const imagePath  = req.file ? `/uploads/${req.file.filename}` : null;

              const newProduct = new Product({
                     ...req.body,
                     image: imagePath,
              });
              await newProduct.save();
              res.status(201).json({message: "product added", Product: newProduct});
       } catch (error) {
              res.status(500).json({message: "product not added", error: error.message})
       }
}


export async function fetchProduct(req, res) {
       try {

              const products = await Product.find();
              if (!products || products.length === 0) {
                     return res.status(404).json({ message: "No products found" });
              }

              // Send back the products list
              return res.status(200).json(products);
       } catch (error) {
              return res.status(500).json({ error: error.message });
       }
}
