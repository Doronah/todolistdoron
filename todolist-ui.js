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
  li.appendChild(editInput);
  list.appendChild(li);
  createEdit()
 }

 


function renderList() {
  newTodoInput.value = '';
  list.innerHTML = '';
  todolist.forEach(function (item) {
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

/*
function createEdit (){
  for (let i = 0; i < todoListItems.length; i++) {
    const listItem = todoListItems[i];

    listItem.addEventListener('dblclick', function () {
        const label = listItem.querySelector('label');
        label.contentEditable = true;
        label.focus();
        todolist[i].title = lable.textContent;
        label.addEventListener('blur', function () {
        label.contentEditable = false;
        });
      todolist[i]=lable.textContent;
    });
}
}*/

function createEdit (){
let isEditing = false;

li.addEventListener('dblclick', function () {
  isEditing = true;
  editInput.value = label.textContent;
  li.classList.add("editing");
  editInput.focus();

})

li.addEventListener("keydown", function addItemListener(e) {
  if (e.key === "Enter") {
    li.classList.remove("editing");
    label.textContent = editInput.value;
  }
}
);

document.addEventListener('click', function () {
  if (isEditing) {
    isEditing = false;
    li.classList.remove("editing");
    label.textContent = editInput.value;
  }
});
}










/*
function saveEdit() {
  for (let i = 0; i < todoListItems.length; i++) {
    const listItem = todoListItems[i];
    const label = listItem.querySelector('label');

    label.addEventListener('blur', function () {
      label.contentEditable = false;
      // כאן ניתן להוסיף קוד נוסף לשמירת השינויים, כמו לדוגמה:
      const itemId = listItem.dataset.itemId;
      const updatedText = label.textContent.trim();
      updateItemTitle(itemId, updatedText);
      renderList(); // לאחר שמירת השינוי, רענן את הרשימה
    });

    label.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        label.blur(); // כאשר המשתמש לוחץ Enter, סגור את תיבת הטקסט
      }
    });
  }
}

function updateItemTitle(itemId, updatedText) {
  // חיפוש לפי המזהה במערכת ועדכון הטקסט
  const itemToUpdate = todolist.find(item => item.id === itemId);

  if (itemToUpdate) {
    itemToUpdate.title = updatedText;
  } else {
    console.error(`Item with ID ${itemId} not found.`);
  }
}
*/