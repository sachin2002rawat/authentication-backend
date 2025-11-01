import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/DB.js'
import authRouter from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
let app=express()
let port=process.env.PORT || 4000
app.use(cors({
    origin:"https://authentication-backend-2-6tyy.onrender.com",
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api",authRouter)

app.listen(port,()=>{
    connectDB();
    console.log("server is started")
})
