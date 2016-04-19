import { ControllerPrototype } from '../_controller';

export class AboutUsController extends ControllerPrototype {
  constructor ($state,$scope,$log){
    'ngInject';
    super($scope,$log,$state)
  }
}