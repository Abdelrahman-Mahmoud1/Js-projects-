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
async function getproduct() {
const response  =  await fetch('https://fakestoreapi.com/products');
const data = await response.json();
 products = data 
} 
getproduct();