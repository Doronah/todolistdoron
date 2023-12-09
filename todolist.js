let todolist = [];

// function loadTasksFromApi() {
//     return fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(todos => { todolist = todolist.concat(todos) });
// }

//Adding a task by title
function addTask(title) {
    const id = new Date().getMilliseconds();
    todolist.push({ id, title, completed: false });
  }
  //remove task by id
  function removeTask(id) {
    const index = todolist.findIndex(item => item.id === id);
    todolist.splice(index, 1);
  }
  //change the status of the task to be completed
  function toggleTask(id) {
    const index = todolist.findIndex(item => item.id === id);
    todolist[index].completed = !todolist[index].completed;
    
  }
  //change a title to exist task
  function searchAndUpdate(sour,tar){
    for(let i = 0;i<todolist.length;i++){
      if (todolist[i].title===sour){
        todolist[i].title = tar;
      }
    }
  }