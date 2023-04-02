let totalitem = document.querySelector("#pricedetail span");

//if cart length is 1 then inserts item otherwise items
totalitem.innerHTML = `${4} Items`; //make it dynamic



let totalmrp = document.getElementById("totalmrp");
let totalamt = JSON.parse(localStorage.getItem("total_price"))|600;
totalmrp.innerText = `Rs. ${totalamt} /-`;

let totaldiscount = document.getElementById("discountmrp");
let totaldsc = JSON.parse(localStorage.getItem("discount"))||200;
totaldiscount.innerText = `Rs. ${totaldsc} /-`;

let finalamt = document.getElementById("totalamount");
// let amt = JSON.parse(localStorage.getItem("totalcartvalue"))||500;
let amt=totalamt-totaldsc
finalamt.innerText = `Rs. ${amt} /-`;

let addbtn = document.getElementById("addbutton");
// addbtn.addEventListener("click", async () => {
//   let user_address = {
//     name: document.getElementById("name").value,
//     mobile: document.getElementById("mobile").value,
//     pin: document.getElementById("pin").value,
//     house: document.getElementById("house").value,
//     locality: document.getElementById("local").value,
//     city: document.getElementById("incity").value,
//     state: document.getElementById("instate").value,
//   };
//   console.log(user_address);
//   let address = await fetch(
//     `https://excited-deer-headscarf.cyclic.app/address/add`,
//     {
//       method: "POST",
//       body: JSON.stringify(user_address),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("token"),
//       },
//     }
//   );
//   let res = await address.json();
//   console.log(res);
//   // alert("address tested");
//   setTimeout(() => {
//     window.location.href = "./payment.html";
//   }, 500);
// });



addbtn.addEventListener("click", async () => {
    let user_address = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      pin: document.getElementById("pin").value,
      house: document.getElementById("house").value,
      locality: document.getElementById("local").value,
      city: document.getElementById("incity").value,
      state: document.getElementById("instate").value,
    };
    console.log(user_address);
    // let address = await fetch(
    //   `https://excited-deer-headscarf.cyclic.app/address/add`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(user_address),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   }
    // );
    // let res = await address.json();
    // console.log(res);
    // alert("address tested");
    setTimeout(() => {
      window.location.href = "./payment.html";
    }, 500);
  });



