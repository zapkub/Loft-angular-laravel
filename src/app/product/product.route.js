export function ProductRouterConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('category-list',{
      url: '/category-list',
      views:{
        view:{
          templateUrl: 'app/product/category/category-list.html',
          controller: 'CategoryListController',
          controllerAs: 'ctrl'
        }
      },
      resolve:{
        category:(ProductAPIService)=>{
          return ProductAPIService.getCategory();
        }
      }
    })
    .state('category', {
      url: '/product/:category',
      views:{
        view:{
          templateUrl: 'app/product/category/category.html',
          controller: 'CategoryController',
          controllerAs: 'ctrl'
        }
      },
      resolve:{
        category:(ProductAPIService)=>{
          return ProductAPIService.getCategory();
        }
      }
    })
    .state('category.default',{
      url:'/default/:page',
      templateUrl:'app/product/category/product-grid.html',
      controller:'ProductListController',
      controllerAs:'ctrl',
      resolve:{
        product_data:(ProductAPIService,$stateParams)=>{
          return ProductAPIService.getSubcategoryItems($stateParams.category,null,12,$stateParams.page);
        }
      }
    })
    .state('category.subcategory-grid',{
      url:'/:subcategory/:page',
      templateUrl:'app/product/category/product-grid.html',
      controller:'ProductListController',
      controllerAs:'ctrl',
      resolve:{
        product_data:(ProductAPIService,$stateParams)=>{
          return ProductAPIService.getSubcategoryItems($stateParams.category,$stateParams.subcategory,12,$stateParams.page);
        }
      }
    })
    .state('category.subcategory-list',{
      url:'/:subcategory/:page/list',
      templateUrl:'app/product/category/product-list.html',
      controller:'ProductListController',
      controllerAs:'ctrl',
      resolve:{
        product_data:(ProductAPIService,$stateParams)=>{
          return ProductAPIService.getSubcategoryItems($stateParams.category,$stateParams.subcategory,6,$stateParams.page);
        }
      }
    })
    .state('category.product-detail',{
      url:'/:product_id',
      templateUrl:'app/product/product-detail/product-detail.html',
      controller:'ProductDetailController',
      controllerAs:'ctrl',
      resolve:{
        product_data:(ProductAPIService,$stateParams)=>{
          return ProductAPIService.getProductDetailById($stateParams.product_id);
        }
      }
    })
}



export function ProductAPIService ($resource,$q,$log,toastr,baseURL){
  'ngInject';
  
  let categoryAPI = $resource(baseURL+`/api/category/:id`);
  let subcategoryItemAPI = $resource(baseURL+`/api/category/product/:category/:subcategory/:page/:amount`)
  let productAPI = $resource(baseURL+`/api/product/:id`)
  let jsonpExperiment = $resource(baseURL+`/api/category`,{callback:'JSON_CALLBACK'},{getCat:{method:"GET",isArray:true}})


  this.fireJsonP = ()=>{
    $log.log('fire jsonp')
    jsonpExperiment.getCat().$promise.then((res)=>{
      $log.log('jsonp')
      $log.log(res);
    },(error)=>{$log.log(error)})
  }
  this.getCategory = (id)=>{
    if(id){
      return this.createMiddlewarePromise(categoryAPI.get({id:id}).$promise);
    }else{
      return this.createMiddlewarePromise(categoryAPI.query().$promise,'category-list');
    }
  }
  this.getProductDetailById = (id)=>{
    return this.createMiddlewarePromise(productAPI.get({id:id}).$promise,'product'+id);
  }
  this.getSubcategoryItems = (name,subname,amount,page)=>{
    if(subname === 'all'){
      return this.createMiddlewarePromise(subcategoryItemAPI.get({category:name,amount:amount,page:page}).$promise,name+'-items');
    }
    return this.createMiddlewarePromise(subcategoryItemAPI.get({category:name,subcategory:subname,amount:amount,page:page}).$promise,name+'-items');
  }
  this.createMiddlewarePromise = (promise,name)=>{
    let deferred = $q.defer()
    //$log.log('begin middleware promise')
    promise.then(
      (res)=>{
        $log.log(name + ' Loaded!');
        $log.log(res);
        deferred.resolve(res)
      },
      ()=>{
        $log.log('error loading api')
        toastr.warning('การเชื่อมต่อมีปัญหา ลองใหม่', 'Warning');
        deferred.reject({msg:'error'})
      }
    )
    return deferred.promise;
  }
  return this;
}
