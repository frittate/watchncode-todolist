// Code goes here
let todoList = {
  todos: [],

  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });

  },

  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;

  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);

  },

  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;

  },

  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //get number of completed
    this.todos.forEach(function(todo){
        if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo){
      if (completedTodos === totalTodos){
        todo.completed = false;
      } else {
        todo.completed = true;
      }
      
    })
    },
};

let handlers = {
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  
  addTodo: function(){
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  
  changeTodo: function(){
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  
  toggleTodo: function(){
    let toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    view.displayTodos();
  },

};

let view = {
  displayTodos: function(){
    let todosUl = document.querySelector('ul'); //function on view
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){ 
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';
          if (todo.completed === true){
            todoTextWithCompletion = '(x) ' + todo.todoText;
          } else {
            todoTextWithCompletion = '( ) ' + todo.todoText;
          }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this) //callback with passed thru 'this' AFTER the callback
  },
  
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
      let elementClicked = event.target;
      
      if (elementClicked.className === 'deleteButton'){ 
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
       }
      });
  },
};

view.setUpEventListeners();




