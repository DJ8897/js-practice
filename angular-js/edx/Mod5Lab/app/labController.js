app.controller('labController', [
  '$scope',
  function($scope) {
    $scope.reset = reset;
    $scope.submit = submit;

    reset();

    function reset() {
      $scope.model = {};
    }

    function submit(model) {
      alert('Submitted\n' + JSON.stringify(model));
    }
  }
]);
