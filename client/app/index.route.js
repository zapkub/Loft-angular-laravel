export function routerConfig ($stateProvider, $urlRouterProvider,$locationProvider){
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
        templateUrl:'app/home/home',
        controllerAs: 'ctrl'
      })
      .state('contribute',{
        url:'/contribute',
        templateUrl:'app/contribute/contribute'
      })
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}
