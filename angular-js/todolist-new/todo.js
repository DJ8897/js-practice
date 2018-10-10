var app = angular.module('toDoApp', []);

app.controller('toDoController', [
  '$scope',
  function($scope) {
    $scope.toDoDetails = [];
    $scope.toDoModel = {};

    $scope.addToDo = function() {
      $scope.toDoDetails.push({ title: $scope.toDoModel.title, priority: $scope.toDoModel.priority, completed: false });
      $scope.toDoModel = {};
    };

    // $scope.remaining = function() {
    //   var count = 0;
    //   angular.forEach($scope.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };

    $scope.archive = function() {
      var oldToDoDetails = $scope.toDoDetails;
      $scope.toDoDetails = [];
      angular.forEach(oldToDoDetails, function(todo) {
        if (!todo.completed) $scope.toDoDetails.push(todo);
      });
    };
  }
]);
