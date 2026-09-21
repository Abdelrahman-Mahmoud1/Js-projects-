let products = [
  {
    id: 'id-1',
    name: 'Basketball',
    price: 20.50
  }, {
    id: 'id-2',
    name: 'Football',
    price: 10.00
  }, {
    id: 'id-3',
    name: 'Tennis',
    price: 25.24
  }, {
    id: 'id-4',
    name: 'T-shirt',
    price: 15.01
  },
];
let cart = [
  {
    productId: 'id-1',
    quantity:1
  }
];
function renderProducts(){
let productHTMl = '';
products.forEach((product)=>{

productHTMl += `
 <div class="container">
    <p class="js-name">${product.id}</p>
    <p class="js-name">${product.name}</p>
    <p class="js-price">${product.price.toFixed(2)}</p>
    <button class="js-addbtn" data-product-id
    ="${product.id}">Add to cart</button>
  </div>
`
});
document.querySelector('.product-container').innerHTML = productHTMl;

document.querySelectorAll('.js-addbtn').
forEach((button) =>{
button.addEventListener('click',()=>{
  const productId = button.dataset.productId;
  addToCart(productId);
  renderCart();
});
});
}

function addToCart(productId){
let matchingProduct;
cart.forEach((item)=>{
if(productId === item.productId)
  matchingProduct = item;
})
if(matchingProduct){
  matchingProduct.quantity++;
}else{
  cart.push(
    {
      productId,
      quantity:1
    }
  );
};
}

function renderCart(){
  let cartHTML = '';
 
 cart.forEach((cartItem) =>{
  const matchingProduct = products.find(p => p.id === cartItem.productId)
   
cartHTML += `

 <div class="cart-items-${matchingProduct.id}">
    <p class="js-name">${matchingProduct.name}</p>
    <p class="js-price">${matchingProduct.price.toFixed(2)}</p>
    <p class="js-price">${cartItem.quantity}</p>
    <button class="js-plusbtn" data-product-id = ${matchingProduct.id}> + </button>
    <button class="js-minusbtn" data-product-id = ${matchingProduct.id}> - </button>
    <button class="js-removebtn" data-product-id = ${matchingProduct.id}>remove</button>
  </div>
`
   });
 



 document.querySelector('.cart-container').innerHTML = `
   <h2>Shopping Cart</h2>
       <div class="cart-items">
       ${cartHTML}
       </div>
        <div id="cart-total">
            Total: $${calculateTotal().toFixed(2)}
        </div>
 
 `;
 document.querySelectorAll('.js-plusbtn').
 forEach((button)=>{
  button.addEventListener('click' ,()=>{
     const productId = button.dataset.productId;
     const change  = 1
     updateCartQuantity(productId , change);
  });
 });

 document.querySelectorAll('.js-minusbtn').
 forEach((button)=>{
  button.addEventListener('click' ,()=>{
     const productId = button.dataset.productId;
     const change  = -1
     updateCartQuantity(productId , change);
    
  });
 });

  document.querySelectorAll('.js-removebtn').
 forEach((button)=>{
  button.addEventListener('click' ,()=>{
     const productId = button.dataset.productId;
     
     removeFromCart(productId);
    
  });
 });

}
function updateCartQuantity(productId , change){
  let matchingItem
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId)
      matchingItem = cartItem
  });
   matchingItem.quantity += change;

   if(matchingItem.quantity <= 0 ){
    removeFromCart(productId)  
   }else{
    renderCart();
   }
}
function removeFromCart(productId){
 
 cart = cart.filter(item => item.productId !== productId)
  renderCart();

 }

function calculateTotal(){
  let total = 0;
  cart.forEach((item)=>{  
  const matchingProduct = products.find(p => p.id === item.productId)
  if(matchingProduct){
    total += matchingProduct.price * item.quantity
  }
  });
  return total;
}

function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart))
}



renderProducts();
renderCart();