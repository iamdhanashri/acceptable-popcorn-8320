let form=document.getElementById("adminlogin")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    if(form.id.value=="admin" && form.password.value=="admin"){
        window.location.href = "adminpage.html";
    }
    else{
        alert("Wrong Credentials")
    }
        
    
})