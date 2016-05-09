/* global angular */

angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('add-snack', {
        url: '/add-snack',
        templateUrl: 'views/snack-form.html',
        controller: 'AddSnackController'
      })
      .state('snacks', {
        url: '/snacks',
        templateUrl: 'views/snacks.html',
        controller: 'SnackController'
      })
      .state('edit-snack', {
        url: '/edit-snack/:id',
        templateUrl: 'views/snack-form.html',
        controller: 'EditSnackController'
      })
      .state('delete-snack', {
        url: '/delete-snack/:id',
        controller: 'DeleteSnackController'
      })
      .state('add-payment',{
        url: '/add-payment',
        templateUrl: 'views/payment-form.html',
        controller: 'AddPaymentController'
      });
    $urlRouterProvider.otherwise('snacks');
  }])
  // make negative currencies display with '-' prefix
  .config(['$provide', function($provide) {
        $provide.decorator('$locale', ['$delegate', function($delegate) {
          //if($delegate.id == 'en-us') {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
          //}
          return $delegate;
        }]);
      }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
    });
  }]);
