const amountInput = document.querySelector('.js-amount');
const expenseInput = document.querySelector('.js-name');
const category =  document.querySelector('.js-category');
const addBtn = document.querySelector('.js-add');
let expense = JSON.parse(localStorage.getItem('expense')) || [];

addBtn.addEventListener('click' , ()=>{
  if (expenseInput.value === '' || amountInput.value === '') {
  return;
}
  const epxpenseObject = {
    name: expenseInput.value,
    amount: Number(amountInput.value),
    category: category.value
  };
  expense.push(epxpenseObject);
  saveToStorage();
  renderExpense();
  addTotal();
  resetInput();
});
function renderExpense(){
let renderHtml ='';
expense.forEach((item )=>{
 renderHtml += `${item.name} - ${item.amount} EGP - ${item.category} <button class=" js-delete"> Delete</button> <br>`
});
document.querySelector('.js-expenses').innerHTML = renderHtml;
document.querySelectorAll('.js-delete').
forEach((button , index)=>{
button.addEventListener('click' , () =>{
expense.splice( index , 1);
saveToStorage();
renderExpense();
addTotal();
});
});
}

function addTotal(){
   let totalAmount = 0;
  expense.forEach((item)=>{
  totalAmount += item.amount;
  }); 
document.querySelector('.js-total').innerHTML = `Total: ${totalAmount} EGP`;

}
function resetInput(){
  expenseInput.value = '';
  amountInput.value = '';
}
document.querySelector('.js-reset').addEventListener('click', ()=>{
  resetExpense();
})
function resetExpense() {
expense = [];
saveToStorage();
renderExpense();
addTotal();
}
function saveToStorage(){
localStorage.setItem('expense' , JSON.stringify(expense));
}
renderExpense();
addTotal();