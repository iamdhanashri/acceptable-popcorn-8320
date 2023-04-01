
const express = require('express');
// const { UserModel } = require("../model/users.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require('../model/users.model');
const { authMiddleware } = require('../middlewares/authenticate.middleware');
const { redisClient } = require('../server/redis');


// signup

userRouter.post("/signup",async(req,res,next)=>{
    try{
     const {name,email,pass,address,mobile}=req.body

    //  check if user is already exist 
     const userExist=await UserModel.findOne({email})
     if(userExist){
        return res.status(400).json({"msg":"user already exist"})
    }
    // create new user 
    const hashed_pass=bcrypt.hashSync(pass,5)

    const user=new UserModel({email,pass:hashed_pass,name,address,mobile})
    await user.save()
    res.json({"msg":"user created successfully"})
    }
    catch(err){
    res.send({msg: "something went wrong",error:err.message})
    }
})


// login

userRouter.post("/login",async(req,res,next)=>{

const { email, pass} = req.body;

try {
    const user = await UserModel.find({ email })
    if (user.length > 0) {

        bcrypt.compare(pass, user[0].pass, (err, result) => {
            // result == true
            if (result) {
                let token = jwt.sign({ userID: user[0]._id }, "masai")

                const refreshToken=jwt.sign( {email,userID:user[0]._id},
                    "refreshtokensecret",
                    {expiresIn:"10m"});
                res.send({ msg: "Login Succsess", "token": token ,refreshToken});
            }
            else {
                res.send({ msg: "user registration failed" });

            }
        });

    }
    else {
        res.send({ msg: "wrong Credentials" })
    }
} catch (e) {
    res.send({ msg: "user registration failed", "error": e.message });

}
});


// refreshToken 

const refreshToken=(req,res)=>{
    const refreshToken=req?.headers?.authorization?.split(" ")[1] || req?.body?.refreshToken;

    if(!refreshToken)
    return res.send({"msg":"please login"})

    jwt.verify(refreshToken,"refreshtokensecret",(err,decoded)=>{
        if(err)
        return res.send({"msg":"please login again"})
        else{
            const token=jwt.sign({userID:decoded.userID, email:decoded.email},
                "authsecret",
                {expiresIn:"15m"});
         res.send({"msg":"login successful", token})
        }
    })
}


// logout

userRouter.get("/logout",authMiddleware,async(req,res)=>{
    try{
    const token=req?.headers?.authorization?.split(" ")[1];
    if(!token) return res.sendStatus(403);
  

    
    await redisClient.set(req.body.userID,token,{EX:3600});

    // console.log("token",req.body.email)

    res.send("logout successful")
    }
    catch(err){
    console.log(err)
    res.send({msg:"somethis wrong in logout",err:err.message})
    }
})

//getting all users

userRouter.get("/",async(req,res)=>{

    let users=await UserModel.find();
    res.send(users)
})



module.exports = { userRouter }