const express=require("express")
const bodyParser = require( 'body-parser' );

const {connection}=require("./config/db")
const { authMiddleware } = require("./middlewares/authenticate.middleware")

const { userRouter } = require("./route/users.route")
const {productrouter}=require("./route/product.route")

// paymnet router
const {paymentrouter}=require("./route/payment.router")

const cors = require("cors")



// const {authMiddleware}=require("./midddlewares/authenticate.middleware")
require("dotenv").config()
// const {blacklistData}=require("./config/blacklist")

const app=express()


// oauth 


// const client_id="f09969c36e505a1ad4a9"
const client_id="2830a210be5bf61c5047"

const client_secret="fd7995732594859f9e67979011464bbf65f29d0c"




app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
// get route for getting product

app.use("/payment",paymentrouter)

app.use("/users", userRouter)
// app.use(authMiddleware)

app.use("/product",productrouter)

// app.get("/product",(req,res)=>{
//     res.send("products...")
// })




//git oauth

app.get("/auth/github",async(req,res)=>{
    const {code}=req.query
   const accessToken= await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers:{
        Accept:"application/json",
        "content-type":"application/json"
        },
        body:JSON.stringify({
            client_id:client_id,
            client_secret:client_secret,
            code
        })
    }).then((res)=>res.json())

  const abc=accessToken.access_token

  const userDetails=await fetch("https://api.github.com/user",{
    method:"GET",
    headers:{
        Authorization:`Bearer ${abc}`
    }
}).then((res)=>res.json())

console.log(userDetails)


  res.send("xyz")

// res.sendFile(__dirname + "../index.html")



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




