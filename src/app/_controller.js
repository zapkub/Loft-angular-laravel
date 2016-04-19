export class Cart {
  constructor ($localStorage,$log,$scope,MemberService,$timeout){
    'ngInject';
    this.localStorage = $localStorage;
    this.member = MemberService;
    this.log = $log.log;
    this.cart = [];
    this.scope = $scope;
    this.scope.$watch(()=>{
      if(this.member.cart.length){
        return this.member.cart;
      }else{
        return this.localStorage.cart;
      }
    },(val)=>{
      this.cart = val;
    },true)
  }
  updateSessionCart (){
    this.member.checkSession();
  }
  addProductToCart (product,amount,$event){
    let dup = false;


    //เช็คว่า ถ้าสินค้ามี option ให้เลือกด้วย ไม่งั้นไม่แอ้ด
    if(product.product_option_group.option && !product.selected_option){
      this.addProductFailed('เลือก option ด้วยจ้า')
      return;
    }

    if(amount == 0 ){
      this.addProductFailed('ต้องมากกว่า 1 ชิ้นจ้า')
      return;
    }

    if($event){
      angular.element($event.target).addClass("working")
    }
      //Cart item Schema
    product.order_amount = 0;  //ตั้งโปรดั่กที่หน้า shop ให้เป็น 0 หลังจากกด add
    let cartItem = this.member.getCartItemFromProduct(product,amount);

    if(this.member.isLoggedIn){
      //User login ให้ส่ง product ไปที่ API
      this.member.addProductToCart(cartItem,amount).then(
        (res)=>{
          this.log(res);
          if(res.status == 1){
            this.updateSessionCart();
            this.addProductSucess(product,amount);
          }else if(res.status == 0){
            this.addProductFailed(res.msg);
          }
          if($event){
            angular.element($event.target).removeClass("working")
          }
        }
      );
    }else{
      /*Guest ใช้ offline localStorage สำหรับ user session cart
      ดูที่ member.controller.js > MemberService */
      angular.forEach(this.localStorage.cart,item=>{
        this.log("product add id:"+item.option +", amount"+ product.selected_option)
        if(item.product_id == product.product_id){
          if(item.option == product.selected_option){
            item.amount += amount
            dup = true;
          }else if(!item.option && !product.selected_option){
            item.amount += amount
            dup = true;
          }

        }
      })
      if(!dup)
        this.localStorage.cart.push(cartItem)
        this.addProductSucess(product,amount);
    }

  }

  addProductSucess (product,amount){
    this.toastr.success('เพิ่มสินค้าเข้าในตะกร้า',`${product.product_name} จำนวน ${amount} ชิ้น`,{
       closeButton: true,
       iconClass: 'toast-add-to-cart'
    });
  }
  addProductFailed (msg){
    this.toastr.error(msg,'เกิดข้อผิดพลาด',{
      closeButton: true
    })
  }
}

export class ControllerPrototype extends Cart{
  constructor($scope,$log,$state,$stateParams,$localStorage,MemberService,toastr,data){
    'ngInject';
    super($localStorage,$log,$scope,MemberService)
    this.scope = $scope;
    this.localStorage = $localStorage;
    this.log = $log.log;
    this.params = $stateParams;
    this.state = $state;
    this.toastr = toastr;
    angular.forEach(Object.keys(data),(item,$index)=>{

      this[item] = data[item];
    })
    this.init();
  }
  init(){

  }

}
