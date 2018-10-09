app.controller('menuController', [
  '$scope',
  function($scope) {
    $scope.model = { title: 'Our Menu' };

    $scope.model.specialInstructions = 'Extra Cheese';

    $scope.model.mainDish = {};

    $scope.$watch('model.mainDish', function(newValue, oldValue) {
      if (newValue === 'BBQ Chicken Pizza') {
        alert('You have selected BBQ Chicken Pizza');
      }
    });

    $scope.changeMainDish = function(item, price) {
      $scope.model.mainDish.name = item;
      $scope.model.mainDish.price = price;
    };
  }
]);
