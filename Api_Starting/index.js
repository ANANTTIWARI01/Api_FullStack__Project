import express from "express"
import "dotenv/config"
import productRouter from "./routes/productRouter.js"
import { connectDb } from "./connection/Db.js"
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const port = process.env.PORT
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST","DELETE","PUT","OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDb()

app.use("/api/product", productRouter)

app.listen(port, () => {
    console.log("Server is started at " + port)

})