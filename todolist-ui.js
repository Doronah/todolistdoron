let isEditing = false;
let sour = "";
let tar = "";
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
const todoListItems = document.getElementsByClassName('todo-list')[0].getElementsByTagName('li');









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



comp.addEventListener('click', function () {
  const selectedLink = document.querySelector('.filters a.selected');
  if (selectedLink) {
    selectedLink.classList.remove('selected');
  }
  const newSelectedLink = document.getElementById('comp');
  newSelectedLink.classList.add('selected');
  renderListComp();
});



active.addEventListener('click', function () {
  const selectedLink = document.querySelector('.filters a.selected');
if (selectedLink) {
  selectedLink.classList.remove('selected');
}
const newSelectedLink = document.getElementById('act');
newSelectedLink.classList.add('selected');
  renderListAct();
});



all.addEventListener('click', function () {
  const selectedLink = document.querySelector('.filters a.selected');
  if (selectedLink) {
    selectedLink.classList.remove('selected');
  }
  const newSelectedLink = document.getElementById('all');
  newSelectedLink.classList.add('selected');
  renderList();
});



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
//--------------------------------------------------------------------------------
  li.addEventListener('dblclick', function () {
    isEditing = true;
    editInput.value = label.textContent;
    console.log(editInput.value);
    sour=editInput.value;
    li.classList.add("editing");
    editInput.focus();
  
  })
  
  li.addEventListener("keydown", function addItemListener(e) {
    if (e.key === "Enter") {
      li.classList.remove("editing");
      label.textContent = editInput.value;
      tar = editInput.value;
      searchAndUpdate(sour,tar);
    }
  }
  );
  /*
  document.addEventListener('click', function () {
    if (isEditing) {
      isEditing = false;
      li.classList.remove("editing");
      label.textContent = editInput.value;
    }
    searchAndUpdate(sour,tar);
  });*/
//----------------------------------------------------------------------------
  li.appendChild(editInput);
  list.appendChild(li);

 }

 

function renderList() {
  newTodoInput.value = '';
  list.innerHTML = '';
  todolist.forEach(function (item) {
  const li = document.createElement('li');
  renderListItem(item);
    todo.textContent = todolist.length-count_completed() + " item left";
  });
}





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






/*work with problems!!!!!!!!!!!!!
function createEdit() {
  for (let i = 0; i < todoListItems.length; i++) {
      const listItem = todoListItems[i];

      listItem.addEventListener('dblclick', function () {
          const label = listItem.querySelector('label');
          label.contentEditable = true;
          label.focus();
          label.addEventListener('blur', function () {
              label.contentEditable = false;
          });
          console.log(label.textContent);
          console.log(i);
          todolist[i]=label.textContent;
      });
  }
}*/


