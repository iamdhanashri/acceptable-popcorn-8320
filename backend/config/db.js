const mongoose=require("mongoose")
require("dotenv").config()

const connection=mongoose.connect("mongodb+srv://amaan:amaan@cluster0.gwmzyo8.mongodb.net/Project?retryWrites=true&w=majority")

module.exports={
    connection
}