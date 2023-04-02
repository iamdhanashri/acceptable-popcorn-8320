let cartdetail=JSON.parse(localStorage.getItem("cartdetail"))
let cartdata=JSON.parse(localStorage.getItem("cart_data")) || [];
console.log(cartdetail);
let container=document.getElementById("container")
showdata(cartdetail)

var detail=document.getElementById("detail")

function showdata(data) {
 
   data.forEach(element => {
       let div=document.createElement("div")
       div.setAttribute("class", "child");
       let img = document.createElement("img");
       img.src = element.image1;
       
       let btn = document.createElement("button");
       btn.setAttribute("class", "btn");
       let h3=document.createElement("h4")
       h3.innerText = "Add to Cart";
       h3.addEventListener("click", (e) => {
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


       btn.append(h3)
       let btn1 = document.createElement("button");
       btn1.setAttribute("class", "btn1");
       let h32=document.createElement("h4")
       h32.innerText = "Order Now";
       btn1.append(h32)
      
       div.append(img,btn,btn1)
      let div1=document.createElement("div")
      div1.setAttribute("class","detail")
       let pro=document.createElement("h2")
       pro.innerHTML="Product Detail:-";
       let div2=document.createElement("div")
       div2.setAttribute("class","price")
       let mrp=document.createElement("h3")
       mrp.innerHTML=`MRP : ${element.MRP}`
       let price=document.createElement("h3")
       price.innerText = `Price : $${element.price}`;
       div2.append(mrp,price)
       let div3=document.createElement("div")
       div3.setAttribute("class","price")
       let category=document.createElement("h3")
       category.innerHTML=`Catogery : ${element.category}`
       let color=document.createElement("h3")
       color.innerHTML=`Color : ${element.color}`
       div3.append(category,color)
       let div4=document.createElement("div")
       div4.setAttribute("class","price")
       let productfor=document.createElement("h3")
       productfor.innerHTML=`Product For : ${element.productfor}`
       let rating=document.createElement("h3")
       rating.innerHTML=`Rating : ${element.rating}`
       let size=document.createElement("h3")
       size.innerHTML=`Size : ${element.size}`
       div4.append(productfor,rating,size)
       let div5=document.createElement("div")
       div5.setAttribute("class","price")
       let h4=document.createElement("h3")
       h4.innerHTML="Available offers"
       let h5=document.createElement("h4")
       h5.innerText="10% off on Bank of Baroda"
       let h6=document.createElement("h4")
       h6.innerText="10% off on IDFC FIRST Bank"
       let h7=document.createElement("h4")
       h7.innerText="10% off on IndusInd Bank"
      


       div5.append(h4,h5,h6,h7)

      
      div1.append(pro,div2,div3,div4,div5)


       
container.append(div,div1)
   });
   
}

