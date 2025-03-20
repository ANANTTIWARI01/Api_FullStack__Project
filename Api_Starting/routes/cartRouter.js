import express from "express"
import { fetchCart,addToCart } from "../controller/cart";


const cartRouter= express.Router();

cartRouter.post("/add",addToCart)
cartRouter.get("fetchCart",fetchCart)

export default cartRouter;