const express=require("express")

require("dotenv").config()
const Insta = require('instamojo-nodejs');
const url = require('url');

const paymentrouter=express.Router()

Insta.setKeys(process.env.API_KEY, process.env.AUTH_KEY);
Insta.isSandboxMode(true);


paymentrouter.get("/",(req,res)=>{
    res.send("payment")
})




// INSTMOJO

paymentrouter.post("/pay",async(req,res)=>
{
    console.log(req.body)
    try {
        let name=req.body.name
        let email=req.body.email
        let amount=req.body.amount
        // console.log(name,email,total_amount)
        // console.log(process.env.API_KEY,process.env.AUTH_KEY)

        let data=new Insta.PaymentData()

        const  REDIRECT_URL="http://localhost:8080/payment/success"
        data.setRedirectUrl(REDIRECT_URL);
        data.send_email="True";
        data.purpose="Payment done through instmojo";
        data.name=name;
        data.email=email;
        data.amount=amount


        Insta.createPayment(data, function(error, response) {
            if (error) {
              // some erconsoror
              console.log(error)
            } else {
              // Payment redirection link at response.payment_request.longurl
              console.log(response);
              const responseData = JSON.parse( response )
              const redirectUrl = responseData.payment_request.longurl;
              console.log(redirectUrl)
              
              res.send({"message": "Please check your email to make payment",redirectUrl})
            }
          })

// sucess router if i sucessfully make payment u will go inside ths router

app.get("/success",(req,res)=>
{
    res.send("payment sucessfull please check your mail for invoice and pdf")
})

        


        // res.send({"message":"insta mojo","data":req.body})
    } catch (error) {
        
    }
})



module.exports={
    paymentrouter
}





// Debit Card:

// Card Number: 4242 4242 4242 4242

// Expiry: 01/25

// CVV: 111