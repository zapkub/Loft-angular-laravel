import { ControllerPrototype } from '../_controller';

export class BlogController extends ControllerPrototype {
    constructor ($state,$scope,$log){
        'ngInject';
        super($scope,$log,$state)
    }
}