export function MemberRouterConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('member', {
      url: '/member',
      views: {
        view: {
          templateUrl: 'app/member/member.html',
          controller: 'MemberController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        view: {
          templateUrl: 'app/member/login.html',
          controller: 'MemberLoginController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('member.address', {
      url: '/address',
      templateUrl: 'app/member/address.html',
      controller: 'MemberAddressController',
      controllerAs: 'ctrl'
    })
    .state('member.cart', {
      url: '/cart',

      templateUrl: 'app/member/cart/cart.html',
      controller: 'CartController',
      controllerAs: 'ctrl',

      data: {
        data: []
      }
    })
    // .state('member.wishlist')
    // .state('member.order-history')
    // .state('password-change')
}
