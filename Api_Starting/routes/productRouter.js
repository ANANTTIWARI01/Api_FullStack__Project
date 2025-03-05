import express from "express"

// import { fetchProducts } from "../controller/product.js";
import { addProduct,fetchProducts } from "../controller/AddProduct.js";

const productRouter = express.Router();

productRouter.post("/add", addProduct)
productRouter.get("/get/:id",fetchProducts)
export default productRouter;

