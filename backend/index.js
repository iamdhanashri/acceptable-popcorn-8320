const express=require("express")

const {connection}=require("./config/db")
const { authMiddleware } = require("./middlewares/authenticate.middleware")

const { userRouter } = require("./route/users.route")
const {productrouter}=require("./route/product.route")

const cors = require("cors")

// const {authMiddleware}=require("./midddlewares/authenticate.middleware")
require("dotenv").config()
// const {blacklistData}=require("./config/blacklist")

const app=express()


// oauth 


const client_id="f09969c36e505a1ad4a9"



app.use(express.json())
app.use(cors())


// get route for getting product



app.use("/users", userRouter)
// app.use(authMiddleware)

app.use("/product",productrouter)

// app.get("/product",(req,res)=>{
//     res.send("products...")
// })


// oauth  

app.get("/",(req,res)=>{
    res.send("API base endpoint")
})

app.get("/login",(req,res)=>{
    res.sendFile(_dirname + "/index.html")
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




