const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const selectOption = document.querySelector('.select-option');
const productCont = document.querySelector('.product-container');
const cartCont = document.querySelector('.cart-container');
const favCont = document.querySelector('.favorites-container');
const totalPrice = document.querySelector('.total-price');
const cartBtn = document.querySelector('.cart-btn');
const favBtn = document.querySelector('.favorites-btn');
let products = [];
let cart = [];
async function getproduct() {
const response  =  await fetch('https://fakestoreapi.com/products');
const data = await response.json();
 products = data ;
 renderProduct();
} 
getproduct();
function renderProduct(){
  let productHtml = '';
  products.forEach((product)=>{
  productHtml += `
  <div class="product-cont">
  <img src="${product.image}">
  <p>${product.title}</p>
  <p>${product.price}</p>
  <p>${product.category}</p>
  <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
  <button class="add-to-favorite" data-id="${product.id}">Add to favorite </button>
  </div>
  `;
  })
  productCont.innerHTML = productHtml;
  document.querySelectorAll('.add-to-cart').
  forEach((button)=>{
    button.addEventListener('click' , ()=>{
    const id = button.dataset.id;
    addToCart(id);
    renderCart();
    });
  });
  document.querySelectorAll('.add-to-favorite').
  forEach((button)=>{
    button.addEventListener('click' , ()=>{
    const id = button.dataset.id;
    });
  });
}
function addToCart(productId){
 let matchingProduct =  products.find((p=> p.id === Number(productId)));
 if(!matchingProduct){return};
 const cartItem = cart.find((p=> p.id === matchingProduct.id));

 if(cartItem){
  return;
 }else{
 cart.push(matchingProduct);
 }
}
function renderCart(){
 let cartHtml = '';
 cart.forEach((cartItem)=>{
  cartHtml += `
  <div>
   <img src="${cartItem.image}">
  <p>${cartItem.title}</p>
  <p>${cartItem.price}</p>
  <p>${cartItem.category}</p>
  <button class="remove-from-cart" data-id="${cartItem.id}">Remove from cart</button>
   </div>
  `;
 }) 
 cartCont.innerHTML = cartHtml;
}
renderCart();