export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      views:{
        header:{
          template: '<header></header>'
        },
        view:{
          templateUrl: 'app/home/home.html',
          controller: 'HomeController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('aboutus', {
      url: '/aboutus',
      views:{
        header:{
          template: '<header></header>'
        },
        view:{
          templateUrl: 'app/aboutus/aboutus.html',
          controller: 'AboutUsController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('blog', {
      url: '/blog',
      views:{
        header:{
          template: '<header></header>'
        },
        view:{
          templateUrl: 'app/blog/blog.html',
          controller: 'BlogController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('blog-detail', {
      url: '/blog/:id',
      views:{
        header:{
          template: '<header></header>'
        },
        view:{
          templateUrl: 'app/blog/blog-detail/blog-detail.html',
          controller: 'BlogDetailController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('contactus', {
      url: '/contactus',
      views:{
        header:{
          template: '<header></header>'
        },
        view:{
          templateUrl: 'app/contactus/contactus.html',
          controller: 'ContactUsController',
          controllerAs: 'ctrl'
        }
      }
    })

    ;

  $urlRouterProvider.otherwise('/');
}

export function MemberAPIService (){

}
