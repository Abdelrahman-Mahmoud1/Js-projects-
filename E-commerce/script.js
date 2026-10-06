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
let cart = JSON.parse(localStorage.getItem('cart'))||[];
async function getproduct() {
const response  =  await fetch('https://dummyjson.com/products');
const data = await response.json();
console.log(data);
products = data.products ;
 renderProduct();
} 
getproduct();
function renderProduct(){
  let productHtml = '';
  products.forEach((product)=>{
  productHtml += `
  <div class="product-cont">
  <img src="${product.images}">
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
 let matchingProduct = products.find((p=> p.id === Number(productId)));
 if(!matchingProduct){return};
 const cartItem = cart.find((p=> p.id === matchingProduct.id));
 if(cartItem){
  cartItem.quantity++;
 }else{
 
 cart.push({...matchingProduct, quantity: 1});
 }
 saveToStorage();
}
function renderCart(){
 let cartHtml = '';
 cart.forEach((cartItem)=>{
  cartHtml += `
  <div class="cart-cont">
   <img src="${cartItem.images}">
  <p>${cartItem.title}</p>
  <p>${cartItem.price}</p>
  <p>Qunatity: ${cartItem.quantity}</p>
  <button class="plusbtn" data-id="${cartItem.id}">+</button>
  <button class="minusbtn" data-id="${cartItem.id}">-</button>
  <p>${cartItem.category}</p>
  <button class="remove-from-cart" data-id="${cartItem.id}">Remove from cart</button>
   </div>
  `;
 }) 
 cartCont.innerHTML = cartHtml;
 document.querySelectorAll('.remove-from-cart').
  forEach((button)=>{
   button.addEventListener('click' , ()=>{
    const id = button.dataset.id;
    let newCart = cart.filter((p)=>{ return p.id !== Number(id)});
     cart = newCart;
     saveToStorage();
    renderCart();
   });
  });
  document.querySelectorAll('.plusbtn').
  forEach((button)=>{
   button.addEventListener('click' , ()=>{
    const id = button.dataset.id;
    const cartItem = cart.find((p=> p.id === Number(id)));
    cartItem.quantity++;
    saveToStorage();
    renderCart();
   });
  });
   document.querySelectorAll('.minusbtn').
  forEach((button)=>{
   button.addEventListener('click' , ()=>{
    const id = button.dataset.id;
    const cartItem = cart.find((p=> p.id === Number(id)));
    cartItem.quantity--;
    if(cartItem.quantity <= 0){
     cart = cart.filter(p =>p.id !== Number(id));
    }
     saveToStorage();
     renderCart();
   });
  });
  let price = 0;
  cart.forEach((item)=>{
    price += item.price * item.quantity;
  });
  totalPrice.innerHTML = `Total Price:$${price.toFixed(2)}`;
  saveToStorage();
}
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
renderCart();