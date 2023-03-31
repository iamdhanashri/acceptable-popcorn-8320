let username= document.getElementById("user-name")

let myname=localStorage.getItem("name");

if(myname){
    username.innerHTML=myname
}
