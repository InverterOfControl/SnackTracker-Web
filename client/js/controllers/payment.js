/* global angular*/

angular
  .module('app')
  .controller('AddPaymentController', ['$scope', 'Payment', '$state', function($scope, Payment, $state) {
    $scope.action = 'Add';
    
    $scope.payment = {};
    
    $scope.submitForm = function() {
      Payment
        .create({
          Amount: $scope.payment.Amount,
          Date: new Date()
        })
        .$promise
        .then(function() {
          $state.go('snacks');
        });
    };
  }])
  /*
  .controller('DeletePaymentController', ['$scope', 'Payment', '$state',
      '$stateParams', function($scope, Payment, $state, $stateParams) {
    Payment
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('snacks');
      });
  }])
  */
  /*
  .controller('EditPaymentController', ['$scope', '$q', 'Payment',
      '$stateParams', '$state', function($scope, $q, Payment,
      $stateParams, $state) {
    $scope.action = 'Edit';

    $scope.payment = {};
    $scope.isDisabled = true;

    
      
    Payment.findById({ id: $stateParams.id }).$promise
      .then(function(data) {
        $scope.payment = data;
      });

    $scope.submitForm = function() {
      $scope.payment
        .$save()
        .then(function(payment) {
          $state.go('snacks');
        });
    };
    */
;
