let todolist = [];

// function loadTasksFromApi() {
//     return fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(todos => { todolist = todolist.concat(todos) });
// }

function addTask(title) {
    const id = new Date().getMilliseconds();
    todolist.push({ id, title, completed: false });
  }
  
  function removeTask(id) {
    const index = todolist.findIndex(item => item.id === id);
    todolist.splice(index, 1);
  }
  
  function toggleTask(id) {
    const index = todolist.findIndex(item => item.id === id);
    todolist[index].completed = !todolist[index].completed;
    
  }
  
  function searchAndUpdate(sour,tar){
    for(let i = 0;i<todolist.length;i++){
      if (todolist[i].title===sour){
        todolist[i].title = tar;
      }
    }
    console.log(todolist);
  }