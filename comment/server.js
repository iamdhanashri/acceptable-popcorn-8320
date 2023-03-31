const express=require("express")
const app=express()
// const {connection}=require("./db")
// const {Comment}=require("./model/comment.model")
// const cors=require("cors")

const port=process.env.PORT ||3000

app.use(express.static("comment"))
// app.use(express.json())
// app.post("/api/comments",async(req,res)=>{
//     const comment=new Comment({
//         username:req.body.username,
//         comment:req.body.comment
//     })
//     await comment.save()
//     res.send(comment)

// })

const server=app.listen(port,async()=>{
    
    console.log(`listening on port ${port}`);
})
let io=require("socket.io")(server)
io.on("connection",(socket)=>{
    console.log(`new connection:${socket.id}`);
    socket.on("comment",(data)=>{
        console.log(data);
        socket.broadcast.emit("comment",data)
    })
})