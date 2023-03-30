const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    address: String,
    mobile: Number,
    email: String,
    pass: String

})


const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}

