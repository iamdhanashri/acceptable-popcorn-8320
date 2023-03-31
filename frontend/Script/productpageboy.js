let container = document.getElementById("listedproduct");
let cartdata=JSON.parse(localStorage.getItem("cart_data")) || [];
let sorted_value=document.getElementById("sorting-data")
let username= document.getElementById("user-name")

let myname=localStorage.getItem("name");

if(myname){
    username.innerHTML=myname
}

async function fetching() {
    try {
        let res = await fetch("https://busy-cyan-cheetah-garb.cyclic.app/product/boy", { method: "GET", });
        data = await res.json()
        rendercard(data);
        sortedData(data)
    } catch (error) {
        console.log(error)
    }

}
fetching()


function rendercard(data) {
    container.innerHTML = null;

    data.forEach(element => {
        let card = document.createElement("div");
        card.setAttribute("class", "imgdiv");

        let img = document.createElement("img");
        img.src = element.image1;

        let div1 = document.createElement("div");
        div1.setAttribute("class", "pricediv");
        let div4 = document.createElement("div");
        let h3 = document.createElement("h2");
        h3.innerText = "$ " + element.price;
        div4.append(h3);
        div1.append(div4);

        let div2 = document.createElement("div");
        div2.setAttribute("class", "description");
        let p1 = document.createElement("p");
        p1.innerText = element.name;
        let p2 = document.createElement("p");
        p2.innerText = element.category;

        let p3 = document.createElement("p");
        p3.innerText = `Rating:${element.rating}`;

        let btn = document.createElement("button");
        btn.setAttribute("class", "buyitem");
        btn.innerText = "Add to Cart";

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            let added = false;
            for (let i = 0; i < cartdata.length; i++) {
                if (element._id == cartdata[i]._id) {
                    added = true;
                    break;
                }
            }
            if (added == true) {
                alert("PRODUCT ALREADY ADDED TO CART")
            } else {
                cartdata.push(element);
                localStorage.setItem("cart_data", JSON.stringify(cartdata));
                alert("PRODUCT ADDED TO CART SUCCESSFULLY");
            }
        })

        div2.append(p1, p2,p3);

        card.append(img, div1, div2, btn);
        container.append(card);
    });
}

function sortedData(data){
    sorted_value.addEventListener("change",function(){
        if(sorted_value.value==""){
            rendercard(data)
        }
        else if(sorted_value.value=="lth"){
            data.sort((a,b)=> a.price-b.price)
            rendercard(data)
        }else if(sorted_value.value=="htl"){
            data.sort((a,b)=> b.price-a.price)
            rendercard(data)
        }
        else if(sorted_value.value=="rating"){
            data.sort((a,b)=> b.rating-a.rating)
            rendercard(data)
        }
        
      }) 
}