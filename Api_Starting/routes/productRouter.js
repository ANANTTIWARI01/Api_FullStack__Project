import express from "express"
import { addCategory, addProduct, deleteProduct, fetchCategories, fetchProduct, fetchProductByCategory } from "../controller/AddProduct.js";
import upload from "../middlewares/multer.js";
const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/get/:id", fetchProduct)
productRouter.get("/get", fetchProduct)
productRouter.post("/category/add", upload.single("image"), addCategory);
productRouter.get("/category", fetchCategories)
productRouter.delete("/delete/:id",deleteProduct)
productRouter.get("/getProductByCategory",fetchProductByCategory)
export default productRouter;

