/* global angular*/

angular
  .module('app')
  .controller('SnackController', ['$scope', 'Snack', function($scope,
      Snack) {
    $scope.snacks = Snack.find({
    });
  }])
  .controller('AddSnackController', ['$scope', 'Snack', '$state', function($scope, Snack, $state) {
    $scope.action = 'Add';
    $scope.Snacks = [];
    
    $scope.snack = {};
    $scope.isDisabled = false;

    Snack
      .find()
      .$promise
      .then(function(Snacks) {
        $scope.Snacks = Snacks;
      });

    $scope.submitForm = function() {
      Snack
        .create({
          Name: $scope.snack.Name,
          Quantity: $scope.snack.Quantity,
          PricePerUnit: $scope.snack.PricePerUnit,
          Date: new Date()
        })
        .$promise
        .then(function() {
          $state.go('snacks');
        });
    };
  }])
  .controller('DeleteSnackController', ['$scope', 'Snack', '$state',
      '$stateParams', function($scope, Snack, $state, $stateParams) {
    Snack
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('snacks');
      });
  }])
  .controller('EditSnackController', ['$scope', '$q', 'Snack',
      '$stateParams', '$state', function($scope, $q, Snack,
      $stateParams, $state) {
    $scope.action = 'Edit';

    $scope.snack = {};
    $scope.isDisabled = true;

    
      
    Snack.findById({ id: $stateParams.id }).$promise
      .then(function(data) {
        $scope.snack = data;
      });

    $scope.submitForm = function() {
      $scope.snack
        .$save()
        .then(function(snack) {
          $state.go('snacks');
        });
    };
  }]).filter('sumOfValue', function () {
    return function (data, key) {
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;        
        var sum = 0;

        angular.forEach(data,function(v,k){
            sum = sum + parseInt(v[key]);
        });        
        return sum;
    }
}).filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {        
        if (angular.isUndefined(data) && angular.isUndefined(key1)  && angular.isUndefined(key2)) 
            return 0;

        var sum = 0;
        angular.forEach(data,function(v,k){
            sum = sum + (parseFloat(v[key1]) * parseFloat(v[key2]));
        });
        return sum;
    }
});
