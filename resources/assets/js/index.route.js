export function routerConfig ($stateProvider, $urlRouterProvider){
  'ngInject';

  /*
  *
  * TemplateUrl : base path to laravel blade template
  *  @baseURL : resources/views/
  *
  */
  $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl:'templates/home',
        controllerAs: 'ctrl'
      })
  $urlRouterProvider.otherwise('/');
}
