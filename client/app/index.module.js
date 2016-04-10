import { routerConfig } from './index.route';
import { HomeController } from './home/home.controller';
import { HeaderDirective } from './component/header.directive';
// start apps
angular.module('WeInternship',['ui.router'])
.config(routerConfig)
.directive('header',HeaderDirective)
.controller('HomeController',HomeController);
