const express=require("express")
require('dotenv').config()
const {connection}=require("./config/db")
const { userRouter } = require("./Controller/user.Routes")
const { authMiddleware } = require("./Middlewares/auth.middleware")
const { employeeRouter } = require("./Controller/employee.Routes")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send(`hello world`)
})
app.use("/user",userRouter)
app.use(authMiddleware)
app.use("/employee",employeeRouter)
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(`port ${process.env.PORT} is running`)
    }catch(err){
        console.log(err.message)
    }
})