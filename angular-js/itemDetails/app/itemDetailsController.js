app.controller('itemDetailsController', [
  '$scope',
  function($scope) {
    $scope.itemDetail = {};
    $scope.item = [];
    $scope.itemDetailIndex = -1;

    
    $scope.calculateGst = function() {
      const price = parseInt($scope.itemDetail.itemPrice);

      $scope.itemDetail.itemGst = (price * 8) / 100;

      $scope.itemDetail.itemTotal = $scope.itemDetail.itemGst + price;

      console.log($scope.itemDetail.itemCategory);
    };

    $scope.addItemDetails = function() {
      $scope.item.push($scope.itemDetail);
      $scope.resetItemDetails();
    };

    $scope.editItemDetails = function() {
      $scope.itemDetailIndex = this.$index;
      $scope.itemDetail = angular.copy($scope.item[this.$index]);
    };

    $scope.updateItemDetail = function() {
      $scope.item[$scope.itemDetailIndex] = $scope.itemDetail;
      $scope.resetItemDetails();
    };

    $scope.deleteItemDetail = function() {
      $scope.item.splice(this.$index, 1);
    };

    $scope.resetItemDetails = function() {
      $scope.itemDetail = {};
      $scope.itemDetailsForm.$setPristine();
      $scope.itemDetailsForm.$setUntouched();

      $scope.itemDetailIndex = -1;
    };

    String.prototype.toTitleCase = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }
]);
