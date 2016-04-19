
import { ControllerPrototype } from '../../_controller';

export class ProductDetailController extends ControllerPrototype{
  constructor(product_data,$scope,$log,$state,$stateParams,$localStorage,MemberService,toastr){
    'ngInject';
    super($scope,$log,$state,$stateParams,$localStorage,MemberService,toastr,{product:product_data});
    $scope.product = product_data;
    $scope.product.selected_option = 0;
  }
}
