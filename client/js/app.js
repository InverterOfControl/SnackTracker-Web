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
      });
    $urlRouterProvider.otherwise('snacks');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
    });
  }]);
