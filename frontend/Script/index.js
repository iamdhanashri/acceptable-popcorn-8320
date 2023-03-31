let username= document.getElementById("user-name")

let myname=localStorage.getItem("name");

if(myname){
    username.innerHTML=myname
}

const token = localStorage.getItem('token');


if (token) {
  username.innerText = 'Logout';
} else {
  username.innerText = 'Sign In';

}

if(username.innerText=="Logout"){

username.setAttribute("href", "index.html");

username.addEventListener("click",()=>{
alert("You Logout Sucessfully")
})
    
}
if(username.innerText=="Sign In"){

    username.setAttribute("href", "signup.html");
        
    }

username.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:8080/users/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      localStorage.removeItem('token');
     
     
    } catch (err) {
      console.log(err);
      alert('Something went wrong!');
    }
  });

  
  
  