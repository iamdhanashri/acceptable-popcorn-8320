let addproductsform = document.getElementById("add-products");
let allproducts = document.getElementById("all-products");
let showproducts = document.getElementById("show-all-products");
let addProduct = document.getElementById("addProduct")

let showallproduct = document.getElementById("show-all-product")
let productform = document.getElementById("input-form")
let userBtn = document.getElementById("users")
let orderBtn = document.getElementById("orders")
let showusers = document.getElementById("showusers")
let usertable = document.getElementById("usertable")
let ordertable = document.getElementById("ordertable")
let showorders = document.getElementById("showorders")
let sorted_value=document.getElementById("sorting-data")
let logoutnBtn=document.getElementById("logout")

//Display all products.

showproducts.addEventListener("click", () => {
    allproducts.style.display = "block";
    addproductsform.style.display = "none";
    showusers.style.display = "none";
    showorders.style.display = "none";
    displayproducts()
})


async function displayproducts() {
    allproducts.style.display = "block";
    let res = await fetch("https://busy-cyan-cheetah-garb.cyclic.app/product")
    let data = await res.json();
    display(data)
    sortedData(data)
}

function display(data){
    showallproduct.innerHTML = data.map(element => {
        return productcard(element)
    }).join(" ");

    let deletebuttons = document.querySelectorAll(".delete");
    // console.log(deletebuttons)

    for (let i = 0; i < deletebuttons.length; i++) {
        deletebuttons[i].addEventListener("click", (e) => {
            console.log(e.currentTarget.dataset.id)
            deleteproduct(e.currentTarget.dataset.id)
        })
    }
}

function productcard(ele) {
    let qwe = `<div>
      <img src=${ele.image1}>
      <hr>
      <h3>${ele.name}</h3>
      <p>Price: ${ele.price.toFixed(2)}</p>
      <p>Rating: ${ele.rating}</p>
      <button class=delete data-id=${ele._id}>Delete</button>
    </div>`
    return qwe;
}

async function deleteproduct(id) {
    let res = await fetch(`https://busy-cyan-cheetah-garb.cyclic.app/product/delete/${id}`,
        {
            method: "DELETE",
            headers: { "token": localStorage.getItem("token") }
        })
    data = await res.json();
    alert(data.msg)
    displayproducts()
}

function sortedData(data){
    sorted_value.addEventListener("change",function(){
        if(sorted_value.value==""){
            display(data)
        }
        else if(sorted_value.value=="lth"){
            data.sort((a,b)=> a.price-b.price)
            display(data)
        }else if(sorted_value.value=="htl"){
            data.sort((a,b)=> b.price-a.price)
            display(data)
        }
        else if(sorted_value.value=="rating"){
            data.sort((a,b)=> b.rating-a.rating)
            display(data)
        }
        
      }) 
}

//Add Product.

addProduct.addEventListener("click", () => {
    allproducts.style.display = "none";
    showusers.style.display = "none";
    showorders.style.display = "none";
    addproductsform.style.display = "block";

    productform.addEventListener("submit", async (e) => {
        e.preventDefault();

        let obj = {
            name: productform.name.value,
            image1: productform.image1.value,
            price: productform.price.value,
            MRP: productform.MRP.value,
            rating: productform.rating.value,
            size: productform.size.value,
            color: productform.color.value,
            category: productform.category.value,
            productfor: productform.productfor.value,
        }
        console.log(obj)

        let res = await fetch("https://busy-cyan-cheetah-garb.cyclic.app/product/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(obj)
            })
        let data = await res.json();
        alert(data.msg)
    })
})

//Get users

userBtn.addEventListener("click", async () => {
    allproducts.style.display = "none";
    addproductsform.style.display = "none";
    showorders.style.display = "none";
    showusers.style.display = "block";

    let res = await fetch("https://busy-cyan-cheetah-garb.cyclic.app/user")
    let data = await res.json()
    console.log(data)

    usertable.innerHTML += data.map((element) => {
        return displayusers(element)
    }).join("")

})

function displayusers(ele) {
    return `<tr>
        <td>${ele._id}</td>
        <td>${ele.name}</td>
        <td>${ele.email}</td>
    </tr>`
}

//orders

orderBtn.addEventListener("click", async () => {
    allproducts.style.display = "none";
    addproductsform.style.display = "none";
    showusers.style.display = "none";
    showorders.style.display = "block";

    let res = await fetch("https://busy-cyan-cheetah-garb.cyclic.app/order")
    let data = await res.json()
    console.log(data)

    ordertable.innerHTML += data.map((element) => {
        return displayorder(element)
    }).join("")

})

function displayorder(ele) {
    let abc= `<tr>
        <td>${ele._id}</td>
        <td>${ele.userid}</td>
        <td>${ele.card}</td>
    `;
    let qwe=ele.order.map(element=>{
        return element.name
    }).join(", ")
    return abc+=`<td>${qwe}</td></tr>`;
}

//logout

logoutnBtn.addEventListener("click",function(){
    window.location.href="index.html"
})
