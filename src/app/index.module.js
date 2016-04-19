
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { HomeController } from './home/home.controller';
import { ProductDetailController } from './product/product-detail/product-detail.controller';
import { ProductAPIService,ProductListController,ProductRouterConfig,CategoryListController ,CategoryController} from './product/product.controller';
import {NumberInputDirective} from './components/number-input.directive';
import { CartController } from './member/cart/cart.controller';
import { HeaderDirective,CartDirective,ClickOutSideDirective } from './components/header.directive';
import { FooterDirective } from './components/footer.directive';
import { MemberRouterConfig } from './member/member.route';
import { MemberController , MemberAddressController,MemberLoginController ,MemberService} from './member/member.controller';

import { _ } from 'underscore';
angular.module('front', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'angular-click-outside','ngStorage','ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(ProductRouterConfig)
  .config(MemberRouterConfig)
  .constant('_',_)
  .constant('baseURL','http://loft.bkksol.com')
  .run(runBlock)
  .directive('header',HeaderDirective)
  .directive('clickOutside',ClickOutSideDirective)
  .directive('cart',CartDirective)
  .directive('footer',FooterDirective)
  .directive('loftInput',NumberInputDirective)
  .controller('HomeController', HomeController)

  //==== INJECT PRODUCT CONTROLLER //
  .controller('CategoryListController',CategoryListController)
  .controller('CategoryController',CategoryController)
  .controller('ProductListController',ProductListController)
  .controller('ProductDetailController',ProductDetailController)
  .service('ProductAPIService',ProductAPIService)
  //==== END INJECT PRODUCT CONTROLLER //

  //==== INJECT CART CONTROLLER ====//
  .controller('CartController',CartController)

  //==== INJECT MEMBER CONTROLLER === //
  .controller('MemberController',MemberController)
  .controller('MemberAddressController',MemberAddressController)
  .controller('MemberLoginController',MemberLoginController)
  .service('MemberService',MemberService)

  //==== END INJECT MEMBER CONTROLLER //
