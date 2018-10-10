app.controller('employeeFormController', [
  '$scope',
  function($scope) {
    $scope.employee = {};
    $scope.employeeDetails = [];
    $scope.employeeDetailIndex = -1;

    // $scope. isNumber = function($event) {
    //   console.log(event);
    //   if (event.which > 31 && (event.which < 48 || event.which > 57)) {
    //     return false;
    //   }
    //   return true;
    // }

    $scope.isNumber = function($event) {
      if (isNaN(String.fromCharCode($event.keyCode))) {
        $event.preventDefault();
      }
    };

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

    String.prototype.toTitleCase = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }
]);
