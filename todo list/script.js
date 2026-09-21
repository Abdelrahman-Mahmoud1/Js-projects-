let todos = JSON.parse(localStorage.getItem('todos')) || [
  {
   task:'make dinner' ,
   dueDate: '2023-3-02',
   completed: false
 }
    
];
const input= document.querySelector('.js-input');
const dueDate = document.querySelector('.js-date')
const show =  document.querySelector('.js-show');
const addBtn = document.querySelector('.js-addbtn')
const remainingCount = document.querySelector('.js-remaining')
const clearBtn = document.querySelector('.js-completed')
let editIndex = null;
function renderTodos(){
let todo = '';
let remaining = 0;
todos.forEach((task)=>{
todo += `
 <div class="item-container">
 <input type="checkbox" class="js-checkbox"  ${task.completed ? 'checked': ''}>
  ${task.task}
  <p>${task.dueDate}</p>
  <button class="js-edit">Edit</button>
  <button class="js-delete">Delete</button>
</div>
`
if(task.completed === false){
  remaining++;
}
});
show.innerHTML = todo;
remainingCount.innerHTML = `Remaining: ${remaining}`;
document.querySelectorAll('.js-edit').
forEach((button , index)=>{
 button.addEventListener('click' , ()=>{
  input.value = todos[index].task;
  dueDate.value = todos[index].dueDate;
  editIndex = index;
  renderTodos();
 });
});
document.querySelectorAll('.js-delete').
forEach((button , index)=>{
 button.addEventListener('click' , ()=>{
  todos.splice(index , 1)   
  renderTodos();
  saveToStorge();
 });
});
document.querySelectorAll('.js-checkbox').
forEach((box , index)=>{
 box.addEventListener('click' , () =>{
  todos[index].completed = !todos[index].completed;
  renderTodos();
  saveToStorge();
 });
});
}
addBtn.addEventListener('click' , ()=>{
toDoList();
saveToStorge();
});
input.addEventListener('keydown' , (event)=>{
if(event.key === 'Enter'){
  toDoList();
}
});
clearBtn.addEventListener('click' , ()=>{
  removeTask();

});
function toDoList(){
  if(input.value === ''){return};
 if(editIndex !== null) {
  todos[editIndex].task= input.value ;
  todos[editIndex].dueDate= dueDate.value ;
 }else{
   todos.push({task:input.value ,dueDate:dueDate.value ,completed:false});
 }
 editIndex = null;
 renderTodos();
 input.value = '';
}
function removeTask(){
    todos = todos.filter((p)=>{
     if(p.completed === false){
      return true
     }
  })
  saveToStorge();
  renderTodos();
}
function saveToStorge(){
  localStorage.setItem('todos' , JSON.stringify(todos));
}
renderTodos();
