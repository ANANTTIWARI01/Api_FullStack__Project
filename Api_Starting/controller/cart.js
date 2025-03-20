import cartModel from "../models/cart.model.js";


export async function addToCart(req, res) {
    try {
        // console.log(req.body.user._id);
        if (!req.user || !req.user._id) {
            return res.status(401).send({ message: "User not authenticated" });
        }

        console.log(req);
        const userId = req.user._id;
        
        const { product, quantity } = req.body

        let cart = new cartModel({ user: userId })
        if (!cart) {
            cart = new cartModel({ user: userId, items: [] })
        }

        const existingItem = cart.items.find(item => item.product.toString() === product.toString());
        
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({ product, quantity })
        }

        await cart.save();
        const updateCart = await cartModel.findOne({ user: userId }).populate("items.product")
        res.status(500).send({ updateCart })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Product Not Added To Cart" })

    }
}

export async function fetchCart(req, res) {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ user: userId }).populate("items.product")
        if (!cart) {
            return res.status(200).send({ message: "Cart is Empty", items: [] })
        }
        res.status(500).send(cart)
    } catch (error) {
        console.log(error);
    }

}