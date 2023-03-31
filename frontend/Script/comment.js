const socket=io("http://localhost:3000/",{transports:["websocket"]}) 

let token = localStorage.getItem("name");

const textarea=document.getElementById("text")
const btn=document.getElementById("btn-c")
const box=document.getElementById("comment-container")


btn.addEventListener("click",(e)=>{
 
e.preventDefault()
let comment=textarea.value
if(!comment){
    return 
}
console.log(comment);
postComment(comment)
})

function postComment(comment){
    let data={

    username:token,
    comment:comment
    }
    appent(data)
    broadcaste(data)
    textarea.value=""
    // syncwithdb(data)
}
function appent(data){
    let div=document.createElement("div")
    div.setAttribute("class","box1")
    let h3=document.createElement("h3")
    h3.innerText=data.username
    let p=document.createElement("p")
    p.innerHTML=data.comment
    let p1=document.createElement("p")
    // p1.innerHTML=moment(data.time).format('LT')
div.append(h3,p,p1)
   box.prepend(div)
}
function broadcaste(data){
    socket.emit("comment",data)
}
socket.on("comment",(data)=>{
    appent(data)
})
// function syncwithdb(data){

//     fetch("https://localhost:3000/api/comments",{
//         // fetch("https://shy-red-crow-fez.cyclic.app/register",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(data)
//         }).then(res=>res.json())
//         .then(res=>console.log(res))
//         .catch(err=>console.log(err))
//     }