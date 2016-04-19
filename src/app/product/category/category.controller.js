import { ControllerPrototype } from '../../_controller';

class CategoryListController extends ControllerPrototype{
  constructor (category,$scope,$log,$state,$stateParams,$localStorage,MemberService,toastr){
    'ngInject';
    super($scope,$log,$state,$stateParams,$localStorage,MemberService,toastr,{categoryList:category});
  }
  init(){
    this.log('catagory-list init');
  }
}

class CategoryController extends CategoryListController{
  init(){
    this.log('catagory controller init');
  }
}

class ProductListController extends ControllerPrototype {
  constructor (category,$scope,$log,$state,$stateParams,product_data,toastr,$localStorage,MemberService){
    'ngInject';
    super($scope,$log,$state,$stateParams,$localStorage,MemberService,toastr,{product_data:product_data,$localStorage,toastr,categoryList:category});
    $scope.totalItems = parseInt(product_data.count_pages);
    $scope.currentPage = $stateParams.page;
  }
  init(){
    this.log('product list init');
  }
  pageChanged (category,subcategory,page,type){
    this.log('change')
    this.state.transitionTo("category.subcategory-"+type,{category:category,subcategory:subcategory,page:page})
  }
}


export { CategoryListController,CategoryController,ProductListController}
