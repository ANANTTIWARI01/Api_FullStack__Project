import express from "express"
import { fetchCart,addToCart } from "../controller/cart.js";


const cartRouter= express.Router();

cartRouter.post("/add",addToCart)
cartRouter.get("fetchCart",fetchCart)

export default cartRouter;