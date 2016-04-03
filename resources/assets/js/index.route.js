export function routerConfig ($stateProvider, $urlRouterProvider){
  'ngInject';
  $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl:'templates/home',
        controllerAs: 'ctrl'
      })
  $urlRouterProvider.otherwise('/');
}
