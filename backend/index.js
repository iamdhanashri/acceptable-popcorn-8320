const express=require("express")

const {connection}=require("./config/db")
const { authMiddleware } = require("./middlewares/authenticate.middleware")

const { userRouter } = require("./route/users.route")

// const {authMiddleware}=require("./midddlewares/authenticate.middleware")
require("dotenv").config()
// const {blacklistData}=require("./config/blacklist")

const app=express()

app.use(express.json())


// get route for getting product



app.use("/users", userRouter)
app.use(authMiddleware)
app.get("/product",(req,res)=>{
    res.send("products...")
})


app.listen(8080,async()=>{
    try{
   await connection
   console.log("connected to db")
    }
    catch(err){
    console.log("something went wrong")
    console.log(err)
    }
    console.log("listening at port 8080")
})




