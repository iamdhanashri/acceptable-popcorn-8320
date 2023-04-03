console.log("payment page")

let cartData = JSON.parse(localStorage.getItem("cart_data")) || [];
let name = document.getElementById("name")
// let total_amount=document.getElementById("total_amount")
let email = document.getElementById("email")

let Total_amount = localStorage.getItem("total_price") || 500
let payment_form = document.getElementById("payment_form")


payment_form.addEventListener("submit", payment)

async function payment(event) {
    event.preventDefault()
    let username = name.value
    let total = Total_amount
    let Email = email.value

//ORDER CREATION
    let obj = {
        name: username,
        amount: total,
        email: Email,
        order: cartData
    }
    ordercreate(obj)

//

    console.log("ddd")
    data = {
        "purpose": "Upstyle Payment",
        "name": username,
        "amount": total,
        "email": Email


    }

    let res = await fetch("http://localhost:8080/payment/pay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        let url = await res.json()
        console.log(url)
        console.log(url.message)
        console.log(url.redirectUrl)
        // window.location.href=url.redirectUrl
        alert(url.message)
        window.open(url.redirectUrl)
        // setTimeout(() => {
        //     window.location.href = "./index.html";

        //   }, 500);
    }

    name.value = ""
    email.value = ""
}


async function ordercreate(obj) {

    let res = await fetch("http://localhost:8080/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "token": localStorage.getItem("token") },
        body: JSON.stringify(obj)
    })
    let data=await res.json()
    console.log(data)
    // alert(data.msg)
    localStorage.removeItem("cart_data")
    // window.location.href = "index.html";
}



// https://itchy-plum-sheep.cyclic.app/
// http://localhost:8080