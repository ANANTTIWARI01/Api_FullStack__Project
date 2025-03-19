import User from "../models/user.model.js";
import "dotenv/config";
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"



export async function userRegister(req, res) {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save();
        return res.status(201).send({ message: "User Registered", user: newUser })
    }
    catch (error) {
        return res.status(500).send({ message: 'User not registered', errorString: error.message });
    }
}



export async function userLogin(req, res) {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: "Email not found" });
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) return res.status(404).send({ message: "Invalid Crendentials" });

        const loginToken = jwt.sign(
            {
                id: user._id, email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.cookie("loginToken", loginToken, {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            maxAge: 36000000,
        }).send({ message: "Login Successful", user: user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "User not login", errorString: error.message });
    }
}


