let isEditing = false;
// Variables used to store the previous and new values for updating after edit
let sour = "";
let tar = "";
// DOM elements
const newTodoInput = document.getElementsByClassName('new-todo')[0];
const list = document.getElementsByClassName('todo-list')[0];
const complete = document.getElementById('comp');
const active = document.getElementById('act');
const all = document.getElementById('all');
const clr = document.getElementsByClassName('clear-completed')[0];
const tog = document.getElementById('toggle-all');
const fil = document.getElementsByClassName('filters');
const todo = document.getElementsByClassName('todo-count')[0];
todo.textContent = todolist.length-count_completed() + " item left";


// Event listener for the "Toggle All" button. 
//Will move everything to "completed" status if there was at least one task that is in an active state
tog.addEventListener('click',function(){
  clr.style.display = 'block';
  if(todolist.length === count_completed()){
    todolist.forEach(function (item){
      item.completed=false;
    });
  }
  else{
    todolist.forEach(function(item){
      if (item.completed === false){
        item.completed=true;
      }
    });
  }
  renderList()
}
);

//// Event listener for pressing the "Enter" key when you want to add a task.
newTodoInput.addEventListener('keydown', function addItemListener(e) {
  if (e.key === 'Enter') {
    addTask(newTodoInput.value);
    if(whitch_filter()==='all'){
      renderList();
    }
    else if (whitch_filter()==='act'){
      renderListAct();
    }
    else if (whitch_filter()==='comp'){
      renderListComp();
    }
    else{
      renderListDeleteComp();
    }
    
  }
});


// Event listener for clicking the "Completed" button in the filter
comp.addEventListener('click', function () {
  const selectedLink = document.querySelector('.filters a.selected');
  if (selectedLink) {
    selectedLink.classList.remove('selected');
  }
  const newSelectedLink = document.getElementById('comp');
  newSelectedLink.classList.add('selected');
  renderListComp();
});


// Event listener for clicking the "Active" button in the filter
active.addEventListener('click', function () {
  const selectedLink = document.querySelector('.filters a.selected');
if (selectedLink) {
  selectedLink.classList.remove('selected');
}
const newSelectedLink = document.getElementById('act');
newSelectedLink.classList.add('selected');
  renderListAct();
});


// Event listener for clicking the "All" button in the filter
all.addEventListener('click', function () {
  const selectedLink = document.querySelector('.filters a.selected');
  if (selectedLink) {
    selectedLink.classList.remove('selected');
  }
  const newSelectedLink = document.getElementById('all');
  newSelectedLink.classList.add('selected');
  renderList();
});


// Event listener for clicking the "Clear Completed" button
clr.addEventListener('click',function(){
  while(count_completed()){
    todolist.forEach(function(item){
      if(item.completed === true){
        removeTask(item.id);
        renderList();
      }
    });
  }
  clr.style.display = 'none';
});


//build and rend a single list item and after call the renderList function

function renderListItem(item) {
  const li = document.createElement('li');
  if(item.completed === true){
    li.classList.add('completed');
  }
  const div = document.createElement('div');
  div.className = 'view';

  const toggleInput = document.createElement('input');
  toggleInput.className = 'toggle';
  toggleInput.type = 'checkbox';
  toggleInput.checked = item.completed;

  toggleInput.addEventListener('change', function () {
    toggleTask(item.id);
    clr.style.display = 'block';
    renderList();
  });
  const label = document.createElement('label');
  label.className = "lab"
  label.textContent = item.title;


  const button = document.createElement('button');
  button.className = 'destroy';
  button.addEventListener('click', function () {
    removeTask(item.id);
    if (todolist.length === 0) {
      clr.style.display = 'none';
    }
    renderList();
  });

  div.appendChild(toggleInput);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(div);
  const editInput = document.createElement("input");
  editInput.className = "edit";
//addEventListener to double click when you want to edit a task/
  li.addEventListener('dblclick', function () {
    isEditing = true;
    editInput.value = label.textContent;
    sour=editInput.value;
    li.classList.add("editing");
    editInput.focus();
  
  })
  //addEventListener to enter key and Exit editing mode
  li.addEventListener("keydown", function addItemListener(e) {
    if (e.key === "Enter") {
      li.classList.remove("editing");
      label.textContent = editInput.value;
      tar = editInput.value;
        //store the new text in the todolist array 
      searchAndUpdate(sour,tar);
    }
  }
  );
  li.appendChild(editInput);
  list.appendChild(li);
 }


// Function to render the entire list
function renderList() {
  newTodoInput.value = '';
  list.innerHTML = '';
  todolist.forEach(function (item) {
  const li = document.createElement('li');
  renderListItem(item);
    todo.textContent = todolist.length-count_completed() + " item left";
  });
}

// Function to render only completed items
function renderListComp() {
   newTodoInput.value = '';
   list.innerHTML = '';
   todolist.forEach(function (item) {
    if (item.completed === true) {
       renderListItem(item);
       todo.textContent = todolist.length-count_completed() + " item left"
     }
   });
}

// Function to render only active items
function renderListAct() {
  newTodoInput.value = '';
  list.innerHTML = '';
  todolist.forEach(function (item) {
    if (item.completed === false) {
      renderListItem(item);
    }
  });
  todo.textContent = todolist.length-count_completed() + " item left"
}

// Function to render the list after removing completed items
function renderListDeleteComp() {
  newTodoInput.value = '';
  list.innerHTML = '';
  todolist.forEach(function (item) {
    if (item.completed === true) {
      removeTask(item.id);
    }
    }
  );
  renderListItem(item);
  todo.textContent = todolist.length-count_completed() + " item left"
}

// Function to count the number of completed items
function count_completed(){
  counter=0;
  todolist.forEach(function(item){
    if (item.completed===true){
      counter++;
    }
  });
  return counter;
}


function whitch_filter(){
  const selectedLink = document.querySelector('.filters a.selected');
  return selectedLink.id;
}



