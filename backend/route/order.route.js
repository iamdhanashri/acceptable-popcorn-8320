const express = require("express")
const { OrderModel } = require("../model/order.model")
const jwt = require("jsonwebtoken")

const orderrouter = express.Router()



orderrouter.get("/", async (req, res) => {

    let orders = await OrderModel.find()
    res.send(orders)
})

orderrouter.post("/create", (req, res) => {

    let token = req.headers.token;

    jwt.verify(token, 'masai', async function (err, decoded) {
        if (decoded) {
            req.body.userid = decoded.userID;
            let order = new OrderModel(req.body);
            await order.save();
            res.send({ "msg": "Processing" })
        }
        else {
            res.send({ "msg": "Login Again" })
        }
    })
})


module.exports = {
    orderrouter
}