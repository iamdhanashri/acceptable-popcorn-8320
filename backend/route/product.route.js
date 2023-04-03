const express = require("express");
const { ProductModel } = require("../model/product.model");
const jwt = require('jsonwebtoken');
const { authMiddleware } = require("../middlewares/authenticate.middleware")

const productrouter = express.Router();

productrouter.get("/", async (req, res) => {
    // let {token}=req.headers;
    try {
        let note = await ProductModel.find()
        res.send(note)
    } catch (error) {
        res.send({ "msg": error })
    }


})

productrouter.get("/boy", async (req, res) => {
    // let {token}=req.headers;
    try {
        let note = await ProductModel.find({ productfor: { $regex: "boy", $options: "i" } })
        res.send(note)
    } catch (error) {
        res.send({ "msg": error })
    }


})

productrouter.get("/girl", async (req, res) => {
    // let {token}=req.headers;
    try {
        let note = await ProductModel.find({ productfor: { $regex: "girl", $options: "i" } })
        res.send(note)
    } catch (error) {
        res.send({ "msg": error })
    }


})


productrouter.get("/top", async (req, res) => {
    let { token } = req.headers;

    if (token) {
        jwt.verify(token, 'shhhhh', async function (err, decoded) {
            if (decoded) {
                let note = await ProductModel.find({ user: decoded.userid }).sort({ no_of_comments: -1 })
                res.send(note)
            }
            else {
                res.send({ "msg": err })
            }
        });
    }
    else {
        res.send({ "msg": "Please Login" })
    }
})

productrouter.post("/create", async (req, res) => {

    try {
        ProductModel.insertMany(req.body);
        res.send({ "msg": "Product Created" })
    } catch (err) {
        res.send({ "msg": err })
    }
})


productrouter.patch("/update", async (req, res) => {

})

productrouter.delete("/delete/:_id", async (req, res) => {

    await ProductModel.findByIdAndDelete(req.params);
    res.send({ "msg": "Product Deleted" })
})

module.exports = {
    productrouter
}