const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "name": String,
    "price": Number,
    "image1": String,
    "MRP": String,
    "size": String,
    "color": String,
    "rating": Number,
    "category": String,
    "productfor": String,
},{versionKey:false})

const ProductModel = mongoose.model("Products", productSchema);

module.exports = {
    ProductModel
}