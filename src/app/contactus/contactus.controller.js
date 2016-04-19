import { ControllerPrototype } from '../_controller';

export class ContactUsController extends ControllerPrototype {
  constructor ($state,$scope,$log){
    'ngInject';
    super($scope,$log,$state)
  }
}