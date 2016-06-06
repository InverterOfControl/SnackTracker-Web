/* global angular*/

angular
  .module('app')
  .controller('SnackController', ['$scope', 'Snack', 'Payment', '$q', 'SnackType', function($scope,
      Snack, Payment, $q, SnackTypes) {
    $scope.snacks = Snack.find();
    
    $scope.payments = Payment.find({});
    
    $scope.snackTypes = SnackTypes.find({});
    
    $scope.snackTypes.$promise.then(function(){
      
       $q.all([$scope.payments.$promise, $scope.snacks.$promise])
      .then(function(responsesArray) {
      $scope.entries = [].concat.apply([], responsesArray).sort(function(a, b){
        return new Date(a.Date) - new Date(b.Date);
      });
      
      angular.forEach($scope.entries, function(el){
        el.IsSnack = el.PricePerUnit ? true : false;
        
        if(el.IsSnack){
          
          
          var foundSnackType = $scope.snackTypes.filter(function(type){
            return type.id === el.SnackTypeId;
          });
          if(foundSnackType){
            el.SnackName =  foundSnackType[0].Name;
          }
        }
      });
    });
   });
  }])
  .controller('AddSnackController', ['$scope', 'Snack', '$state', 'SnackType', function($scope, Snack, $state, SnackType) {
    $scope.action = 'Add';
    $scope.Snacks = [];
    
    $scope.snack = {};
    $scope.isDisabled = false;

    Snack
      .find()
      .$promise
      .then(function(SnackTypes) {
        $scope.SnackTypes = SnackTypes;
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
          if(v.IsSnack){
            sum = sum + (parseFloat(v[key1]) * parseFloat(v[key2]));
          } else{
            
            // hacky :(
           sum = sum - parseFloat(v['Amount']);
          }
        });
        return sum;
    }
});
