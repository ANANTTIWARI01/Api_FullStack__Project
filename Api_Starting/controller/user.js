import User from "../models/user.model";
import "dotenv/config";
import bcrypt from "bcrypt"



export async function userRegister(req, res) {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({name , email ,password:hashedPassword})
        await newUser.save();
        return res.status(201).send({message:"User Registered",user:newUser})
    }
    catch (error) {
        return res.status(500).send({ message: 'User not registered', errorString: error.message });
    }
}


export async function userLogin(req, res) {

}



