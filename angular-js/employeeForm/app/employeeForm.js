app.controller('employeeFormController', [
  '$scope',
  function($scope) {
    $scope.employee = {};
    $scope.employeeDetails = [];
    $scope.employeeDetailIndex = -1;

    $scope.addEmployee = function() {
      $scope.employeeDetails.push($scope.employee);
      $scope.resetEmployeeForm();
    };

    $scope.deleteEmployeeDetail = function() {
      $scope.employeeDetails.splice(this.$index, 1);
    };

    $scope.editEmployeeDetail = function() {
      $scope.employeeDetailIndex = this.$index;
      $scope.employee = angular.copy($scope.employeeDetails[this.$index]);
    };

    $scope.updateEmployee = function() {
      $scope.employeeDetails[$scope.employeeDetailIndex] = $scope.employee;
      $scope.resetEmployeeForm();
    };

    $scope.resetEmployeeForm = function() {
      $scope.employee = {};
      $scope.employeeForm.$setPristine();
      $scope.employeeForm.$setUntouched();

      $scope.employeeDetailIndex = -1;
    };
  }
]);
