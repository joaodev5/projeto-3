
const weatherAPIKey = "df95824528121857d4cadd50dacdb290";
const weatherAPIURL =  `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

const galleryImages = [
   {
      src:"./assets/gallery/image3.jpg",
      alt:"Thumbnail Image3"
   },

   {
      src:"./assets/gallery/image2.jpg",
      alt:"Thumbnail Image2"
     
   },

   {
      src:"./assets/gallery/image1.jpg",
      alt:"Thumbnail Image1"
   },
   
];

const products = [
   {
     title: "AstroFiction",
     author: "John Doe",
     price: 49.9,
     image: "./assets/products/img6.png"
   },
   {
     title: "Space Odissey",
     author: "Marie Anne",
     price: 35,
     image: "./assets/products/img1.png"
   },
   {
     title: "Doomed City",
     author: "Jason Cobert",
     price: 0,
     image: "./assets/products/img2.png"
   },
   {
     title: "Black Dog",
     author: "John Doe",
     price: 85.35,
     image: "./assets/products/img3.png"
   },
   {
     title: "My Little Robot",
     author: "Pedro Paulo",
     price: 0,
     image: "./assets/products/img5.png"
   },
   {
     title: "Garden Girl",
     author: "Ankit Patel",
     price: 45,
     image: "./assets/products/img4.png"
   }
 ];

// Menu Section
function menuHandler() {
   document.querySelector("#open-nav-menu").addEventListener("click", function(){
      document.querySelector("header nav .wrapper").classList.add("nav-open");
   });
   
   
   document.querySelector("#close-nav-menu").addEventListener("click", function(){
       document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

// temperature conversion
 function celsiusToFarh (temperature){
   let fahr = (temperature * 9/5) + 32;
   return fahr;
}

// Greeting Section
function greetingHandler() {
   let currentHours = new Date().getHours();
   let greetingText 
   
   if (currentHours < 12) {
        greetingText = "Good morning!";
   }  else if (currentHours < 19){
        greetingText = "Good afternoon!";
   }  else if (currentHours < 24){
        greetingText = "Good evening!";
   }  else {
        greetingText = "welcome!";
   }
   
   document.querySelector("#greeting").innerHTML = greetingText;
   
}

// weather Text

function weatherHandler(){
   navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let url = weatherAPIURL
         .replace("{lat}",latitude)
         .replace("{lon}",longitude)
         .replace("{API key}",weatherAPIKey);
      fetch(url)
      .then(response => response.json())
      .then(data => {
         const condition = data.weather[0].description;
         const location = data.name
         const temperature = data.main.temp;
   
         let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
         let FahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFarh(temperature).toFixed(1)}°F outside.`;
        
         document.querySelector("p#weather").innerHTML = celsiusText;
         
         // temperature switch
     
         document.querySelector(".weather-group").addEventListener("click", function(e){
        
             if (e.target.id == "celsius"){
              document.querySelector("p#weather").innerHTML = celsiusText;
             } else if (e.target.id == "fahr"){
              document.querySelector("p#weather").innerHTML = FahrText;
             }
        });
      }); 
      
   });
};

// local time section
function clockHandler() {
   setInterval(function(){
      let localTime = new Date();
      document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");;
      document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
      document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
   },1000)
}

// Gallery Section
function galleryHandler() {
let mainImage = document.querySelector("#gallery > img");   
let Thumbnails = document.querySelector("#gallery .thumbnails");

mainImage.src = galleryImages[0].src;
mainImage.alt = galleryImages[0].alt;


galleryImages.forEach(function(Image,index){
   let thumb = document.createElement("img");
   thumb.src = Image.src;
   thumb.alt = Image.alt;
   thumb.dataset.arrayIndex = index;
   thumb.dataset.selected = index === 0 ? true : false;

   thumb.addEventListener("click",function(e){
     let selectedIndex = e.target.dataset.arrayIndex; 
     let selectedImage = galleryImages[selectedIndex]
     mainImage.src = selectedImage.src;
     mainImage.alt = selectedImage.alt;
     Thumbnails.querySelectorAll("img").forEach(function(img){
        img.dataset.selected = false;
     });
      
     e.target.dataset.selected = true;

   });

   Thumbnails.appendChild(thumb)
});
}

// products section

function populateProducts(productList) { 

   let productsSection = document.querySelector(".products-area");
   productsSection.textContent = "";

   // correr um loop pelo array de produtos e criar um elemento (product-item) HTML para cada um deles
    productList.forEach(function(product, index){

      // criando um elemento HTML para os produtos individuais
     let productElm = document.createElement("div");
     productElm.classList.add("product-item");
     
     // criando a imagem do produto
     let productImage = document.createElement("img");
     productImage.src = product.image;
     productImage.alt = "image for " + product.title;
     
     // criar a seção de products details
     let productDetails = document.createElement("div");
     productDetails.classList.add("product-details");

     // criar titulo do produto, autor, preço e price-title
     let productTitle = document.createElement("h3");
     productTitle.classList.add("product-title");
     productTitle.textContent = product.title;
     let productAuthor = document.createElement("p");
     productAuthor.classList.add("product-author");
     productAuthor.textContent = product.author;
     let priceTitle = document.createElement("p");
     priceTitle.classList.add("price-title");
     priceTitle.textContent = "price";
     let productPrice = document.createElement("p");
     productPrice.classList.add("product-price");
     productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

     // adicionar os detalhes do produto
     productDetails.append(productTitle);
     productDetails.append(productAuthor);
     productDetails.append(priceTitle);
     productDetails.append(productPrice);

     // adiciona os elementos HTML filhos da classe produto
     productElm.append(productImage);
     productElm.append(productDetails);

     // adiciona o pruduto individual a seção de produtos
     productsSection.append(productElm);
   });

}

function productsHandler(){

   let freeProdutcs = products.filter( item => !item.price || item.price <= 0);
   let paidProducts = products.filter( item => item.price > 0);

   populateProducts(products);

   let totalProducts = products.length;
   document.querySelector(".products-filter label[for=all] span.product-amount").textContent =  products.length;
   document.querySelector(".products-filter label[for=paid] span.product-amount").textContent =  paidProducts.length;
   document.querySelector(".products-filter label[for=free] span.product-amount").textContent =  freeProdutcs.length;

   let productsFilter = document.querySelector(".products-filter");
   
   productsFilter.addEventListener("click", function(e){
      if (e.target.id === "all"){
         populateProducts(products);
      } else  if (e.target.id === "paid"){
         populateProducts(paidProducts);
      }  else  if (e.target.id === "free"){
         populateProducts(freeProdutcs);
      }
   });
}

function footerHandler(){
   let currentYear = new Date().getFullYear();
   document.querySelector("footer").textContent = `Ⓒ ${currentYear} - All rights reserved`;
}






//page load

menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
