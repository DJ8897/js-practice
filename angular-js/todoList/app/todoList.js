angular.module('todoModule').controller('todoListController', [
  '$scope',
  function($scope) {
    $scope.tasks = [];
    $scope.addToTodoList = function() {
      $scope.tasks.push($scope.title);
    };

    $scope.deleteTodoTask = function() {
      $scope.tasks.splice(this.$index, 1);
    };
  }
]);
