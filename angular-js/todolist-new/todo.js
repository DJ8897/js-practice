var app = angular.module('toDoApp', []);

app.controller('toDoController', [
  '$scope',
  'toDoService',
  function($scope, toDoService) {
    $scope.toDoDetails = [];
    $scope.toDoModel = {};

    $scope.addToDo = function() {
      $scope.toDoDetails.push({ title: $scope.toDoModel.title, priority: $scope.toDoModel.priority, completed: false });

      toDoService.addToDo($scope.toDoModel);
      $scope.toDoModel = {};
    };

    $scope.pending = function() {
      let count = 0;
      angular.forEach($scope.toDoDetails, function(todo) {
        count += todo.completed ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function() {
      var oldToDoDetails = $scope.toDoDetails;
      $scope.toDoDetails = [];
      angular.forEach(oldToDoDetails, function(todo) {
        if (!todo.completed) $scope.toDoDetails.push(todo);
      });
    };
  }
]);

app.service('toDoService', function() {
  const toDoDetails = [];

  this.addToDo = function(toDoModel) {
    console.log('called');
    toDoDetails.push(toDoModel);
  };
});
