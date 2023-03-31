let cartdetail=JSON.parse(localStorage.getItem("cartdetail"))
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
       let h3=document.createElement("h3")
       h3.innerText = "Add to Cart";
       btn.append(h3)
       let btn1 = document.createElement("button");
       btn1.setAttribute("class", "btn1");
       let h32=document.createElement("h3")
       h32.innerText = "Order Now";
       btn1.append(h32)
      
       div.append(img,btn,btn1)
      let div1=document.createElement("div")
      div1.setAttribute("class","detail")
       let pro=document.createElement("h2")
       pro.innerHTML="Product Detail:-";
       let mrp=document.createElement("h3")
       mrp.innerHTML=`MRP ${element.MRP}`
       let price=document.createElement("h3")
       price.innerText = `Price $${element.price}`;
       let category=document.createElement("h3")
       category.innerHTML=`catogery ${element.category}`
       let color=document.createElement("h3")
       color.innerHTML=`color  ${element.color}`
       let productfor=document.createElement("h3")
       productfor.innerHTML=`product for ${element.productfor}`
       let rating=document.createElement("h3")
       rating.innerHTML=`rating ${element.rating}`
       let size=document.createElement("h3")
       size.innerHTML=`size ${element.size}`
      
      div1.append(pro,mrp,price,category,color,productfor,rating,size)


       
container.append(div,div1)
   });
   
}

