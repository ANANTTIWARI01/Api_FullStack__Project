import express from "express"
import "dotenv/config"
import productRouter from "./routes/productRouter.js"
import { connectDb } from "./connection/Db.js"
import cors from "cors"

const port = process.env.PORT
const app =express()

const corsOptions={
    origin:`http://localhost:5173`,
    methods:["GET","POST"],
    allowHeaders:["Content-Type","Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDb()

app.use("/api/product",productRouter)

app.listen(port,()=>{
    console.log("Server is started"+port)
    
})