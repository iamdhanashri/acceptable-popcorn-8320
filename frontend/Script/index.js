let username1 = document.getElementById("user-name")

let myname1 = localStorage.getItem("name");

if (myname1) {
  username1.innerHTML = myname1
}

const token = localStorage.getItem('token');


if (token) {
  username1.innerText = 'Logout';
  username1.setAttribute("href", "index.html");
} else {
  username1.innerText = 'Sign In';
  username1.setAttribute("href", "signup.html");
}


if (username1.innerText == "Logout") {

  

  username1.addEventListener("click", async (e) => {

    e.preventDefault()

    const response = await fetch('http://localhost:8080/users/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    console.log(data)
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    alert("You are Logged Out Sucessfully")
    location.reload() 


    // console.log(err);
    // alert('Something went wrong!');

  })

}
if (username1.innerText == "Sign In") {

  username1.setAttribute("href", "signup.html");

}

// username1.addEventListener('click', async () => {

// });



