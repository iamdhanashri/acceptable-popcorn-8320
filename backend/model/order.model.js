const mongoose=require("mongoose");

const orderSchema=({
    name:String,
    userid:String,
    amount:String,
    email:String,
    order:Array
})

const OrderModel=mongoose.model("order",orderSchema)

module.exports={
    OrderModel
}