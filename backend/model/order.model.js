const mongoose=require("mongoose");

const orderSchema=({
    name:String,
    userid:String,
    card:String,
    order:Array
})

const OrderModel=mongoose.model("order",orderSchema)

module.exports={
    OrderModel
}