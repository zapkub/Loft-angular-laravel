export function HeaderDirective($localStorage, _,MemberService) {
  'ngInject';
  let directive = {
    restrict: "E",
    templateUrl: "app/components/header.html",
    link: (scope) => {
      scope.$watch(() => {
        if (MemberService.cart.length){
          return MemberService.cart;
        }else{
          return $localStorage.cart;
        }
      }, (val) => {
        scope.cartAmount = 0;
        _.each(val, (item) => {
          scope.cartAmount += parseInt(item.amount)
        })
      }, true)
    }
  }

  return directive;
}
export function ClickOutSideDirective($log,$window){
  'ngInject';
  let directive  = {
    restrict : "A",
    scope:{
      clickOutside :"="
    },
    link:(scope,elem)=>{
      scope.isEnter = false;
      scope.$watch('clickOutside',()=>{
          $log.log(scope.clickOutside)
      });

      angular.element(elem).bind('mouseenter',()=>{
        scope.isEnter = true;
      })
      angular.element(elem).bind('mouseleave',()=>{
        scope.isEnter = false;
      })

      angular.element($window).bind('click scroll',()=>{
        if(scope.isEnter){

        }else{
          scope.clickOutside = false;
          scope.$apply()
        }
      })

    }
  }
  return directive;
}
export function CartDirective($localStorage, _, $log,MemberService,$window,$timeout) {
  'ngInject';
  let directive = {
    restrict: "E",
    template: `

      <table class="table" >
        <thead>
          <th></th>
          <th width="200"></th>
          <th class="text-right">Qty</th>
          <th class="text-right">Price</th>
          <th width="30"></th>
        </thead>
        <tbody>
          <tr ng-if="!cartAmount">
            <td colspan="5" style="text-align:center;color:grey">{{cartAmount ? '':'ยังไม่มีสินค้า'}}</td>
          </tr>

          <tr class="cart-item" ng-repeat="item in cart" ng-if="item.amount > 0 && $index < 5">
            <td>
              <div class="cart-thumbnail">
              </div>
            </td>
            <td>
              <div class="cart-item-title">{{item.product_name}} : {{item.option.option_name}} </div>
            </td>
            <td class="cart-item-qty text-right">
              <input type="number" ng-model="item.amount" ng-change="itemAmountChange(item)" min="1">
            </td>
            <td class="text-right">
              {{item.retail_price * item.amount | currency:BTH:2}}
            </td>
            <td>
              <i  ng-click="remove(item)" class="fi-trash delete-button"></i>
            </td>
          </tr>

          <tr ng-if="cartAmount > 5">
            <td colspan="5" class="more_products text-center">
              . . .<br/>and {{cartAmount - 5}} more products
            </td>
          </tr>

          <tr class="cart-summary">
            <td colspan="3" class="text-right">Subtotal</td>
            <td>$1,320.00</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div ng-if="cart.length > 5" style="text-align:center"> more {{cart.length - 5}} items in cart</div>

    `,
    link: (scope,elem) => {
      angular.element(elem).bind('click',($event)=>{
        $log.log('click on window')
        $log.log($event.toElement);
      })
      MemberService.checkSession().then(
        (res)=>{


        },
        ()=>{

        }
      )
      scope.$watch(() => {
        if (MemberService.cart.length){
          return MemberService.cart;
        }else{
          return $localStorage.cart;
        }
      }, (val) => {
        scope.cartAmount = 0;
        _.each(val, (item) => {
          scope.cartAmount += item.amount
        })
        scope.cart = val;
      }, true)


      // จับว่า item ในcart เปลี่ยนไปหรือเปล่า เพื่ออัพเดต ไปที่  server หลังจาก user หยุด edit ไป 1 วิ
      let cartUpdatePromise;
      scope.itemAmountChange = (item)=>{
        if(cartUpdatePromise) // ลบ promise เก่าทิ้ง ถ้ามีอันใหม่มาก่อน 1 วิ
          $timeout.cancel(cartUpdatePromise)

        cartUpdatePromise = $timeout( () => {
          MemberService.editProductCart(item.cart_id,item.amount).then(
            (res)=>{
              if(res.status == "1")
              {
                MemberService.checkSession(); // ถ้า add สำเร็จก็ reload cart
              }
            }
          )
        },1000);
      }




      scope.remove = (item) => {

        if(MemberService.cart.length){
          MemberService.deleteProductCart(item.cart_id).then(
            (res)=>{ // done add to cart
              $log.log(res.data);
              if(res.data.status == "1"){
                MemberService.checkSession().then(
                  ()=>{
                    //done reload cart

                  },
                  ()=>{
                    //fail reload cart
                  }
                )
              }
            },
            ()=>{ //fail add to cart
                  scope.refreshBag = false;
            }
          )
        }else{
          _.each($localStorage.cart, cartitem => {
            if (cartitem === item) {
              item.amount = 0;
            }
          })
        }
      }
    }
  }
  return directive;
}
