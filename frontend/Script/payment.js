console.log("payment page")


let name=document.getElementById("name")
// let total_amount=document.getElementById("total_amount")
let email=document.getElementById("email")

let Total_amount=localStorage.getItem("total_price")||500
let payment_form=document.getElementById("payment_form")


payment_form.addEventListener("submit",payment)

async function payment(event){
    event.preventDefault()
    let username=name.value
    let total=Total_amount
    let Email=email.value


    console.log("ddd")
    data={
        "purpose":"Upstyle Payment",
        "name":username,
        "amount":total,
        "email":Email
        

    }

    let res=await fetch("https://itchy-plum-sheep.cyclic.app/payment/pay",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    if(res.ok){
        let url=await res.json()
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
    
}


