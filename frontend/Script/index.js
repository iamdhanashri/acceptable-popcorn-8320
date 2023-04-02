let username1= document.getElementById("user-name")

let myname1=localStorage.getItem("name");

if(myname1){
    username1.innerHTML=myname1
}

const token = localStorage.getItem('token');


if (token) {
  username1.innerText = 'Logout';
} else {
  username1.innerText = 'Sign In';

}
4
if(username1.innerText=="Logout"){

username1.setAttribute("href", "index.html");

username1.addEventListener("click",()=>{
alert("You Logout Sucessfully")
})
    
}
if(username1.innerText=="Sign In"){

    username1.setAttribute("href", "signup.html");
        
    }

username1.addEventListener('click', async () => {
    try {
      const response = await fetch('https://itchy-plum-sheep.cyclic.app/users/logout', {
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

  
  
  