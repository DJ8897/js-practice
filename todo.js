app.controller('todoListController', function() {
  var todoList = this;
  todoList.archived = [];
  todoList.todos = [
    {
      text: 'learn AngularJS',
      done: false
    },
    {
      text: 'build an Angular app',
      done: false
    }
  ];

  todoList.addTodo = function() {
    this.todos.push({
      text: this.todoText,
      done: false
    });
    this.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    for (var todo in this.todos) if (!this.todos[todo].done) ++count;
    return count;
  };

  todoList.archive = function() {
    var notDone = [];
    for (var todo in this.todos)
      if (this.todos[todo].done) this.archived.push(this.todos[todo]);
      else notDone.push(this.todos[todo]);
    this.todos = notDone;
  };

  todoList.unarchive = function() {
    this.todos = this.archived.concat(this.todos);
    this.archived = [];
  };
});
