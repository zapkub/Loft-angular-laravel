export class MemberController {
  constructor($scope, $log, $localStorage, $http, $state, $stateParams, MemberService, $window, $timeout) {
    'ngInject';
    this.log = $log.log;
    this.scope = $scope;
    this.http = $http;
    this.state = $state;
    this.member = MemberService;
    this.window = $window;
    this.timeout = $timeout;
    this.init();
    //Add X-xsrf-token verify
    this.scope.email = 'm.t@gmail.com';
    this.scope.password = "1234";
    this.checkingSession = true;

  }
  isLoading() {
    if (this.checkingSession) {
      return true;
    } else {
      return false;
    }

  }
  getToken() {
    // this.http.post('http://loftdev.bkksol.com/api/session').then(
    //   (res)=>{
    //     console.log(res.data.session)
    //   }
    // );
    this.member.checkSession().then(
      (res)=>{
        console.log(res.data)
      }
    )
    // this.member.getToken()
  }
  init() {
    this.checkSession();
  }
  checkSession() {
    this.checkingSession = true;
    this.timeout(
      () => {
        this.member.checkSession().then(
          (res) => {
            this.checkingSession = false;
            if (res == MEMBER_LOGIN) {
              if (this.state.current.name == 'login')
                this.state.transitionTo('member.address');
            } else {
              this.state.transitionTo('login');
            }
          }
        )
      }, 2000
    )
  }
  getLogin() {
    this.checkingSession = true;
    this.timeout(
      () => {
        this.member.getLoginSession(this.scope.email, this.scope.password).then(
          () => {
            this.checkSession();
          }
        )
      }, 1000)
  }
  getLogout() {
    this.member.clearSession().then(() => {
      this.window.location.reload();
    });
  }
}
export class MemberLoginController extends MemberController {

}
export class MemberAddressController extends MemberController {
  init() {

  }
}



var MEMBER_CHECKING_SESSION = 2,
  MEMBER_LOGIN = 1,
  MEMBER_LOGOUT = 0;
export function MemberService(baseURL, $resource, $q, $localStorage, $http, $cookies, $log, _) {
  'ngInject';

  function encodeFormData(data, headersGetter) {
    var str = [];
    for (var d in data)
      str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return str.join("&");
  }
  let api = $resource(baseURL, {}, {
    login: {
      method: 'POST',
      url: baseURL + '/api/signin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //  'X-XSRF-TOKEN':'4nf8SXCeBLEdmG9jMVAHxBhVVJIi6SM8ecU1a0Tx'
      },
      transformRequest: encodeFormData
    },
    logout: {
      method: 'POST',
      url: baseURL + '/api/signout',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: encodeFormData
    },
    getProductCart: {
      method: 'GET',
      isArray: true,
      url: baseURL + '/api/cart'
    },
    addProductToCart: {
      //send product to cart and require token
      method: 'POST',
      url: baseURL + '/api/cart/add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: encodeFormData
    },
    deleteProductFromCart: {
      method: 'POST',
      url: baseURL + '/api/cart/delete/:id',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: encodeFormData
    },
    editProductToCart: {
      method: 'POST',
      url: baseURL + '/api/cart/amount',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: encodeFormData
    }
  });
  let token = "";



  //User cart services for guestcart look in _controller.js > Cart
  this.cart = []
  this.getProductCart = () => {
    return api.getProductCart({}).$promise;
  }
  this.deleteProductCart = (cart_id, amount) => {
    return $http.post(baseURL + '/api/cart/delete/' + cart_id)
      // return api.deleteProductFromCart({id:cart_id}).$promise;
  }
  this.editProductCart = (cart_id, amount) => {
    return api.editProductToCart({
      cart_id: cart_id,
      cart_amount: amount
    }).$promise;
  }
  this.addProductToCart = (product, order_amount) => {

      return api.addProductToCart({
        product_id: product.product_id,
        product_option_id: (product.option ? product.option.option_id : ""),
        amount: order_amount,
        _token: token
      }).$promise;
    }
    //END Cart



  // login  service
  this.checkSession = () => {
    let deferred = $q.defer();
    NProgress.start();
    this.isLoggedIn = MEMBER_CHECKING_SESSION;
    $http.get(baseURL + '/api/session').then(
      (res) => {
        this.currentSession = res.data.session;
        token = this.currentSession._token;
        NProgress.done();
        if (this.currentSession.s_user_id) {
          this.isLoggedIn = MEMBER_LOGIN;
          $cookies.put('_token', res.data._token);
          $cookies.put('s_user_id', res.data.s_user_id);
          deferred.resolve(MEMBER_LOGIN);
          $log.log('User logged in :', this.currentSession.s_user_id);
          $log.log(MEMBER_LOGIN)
          this.getProductCart().then(
            (res) => {
              this.cart = [];
              _.each(res, item => {
                if (item.product_option) {
                  item.product.selected_option = item.product_option;
                }
                item.product.product_option_group = {
                  option: []
                }
                item.product.cart_id = item.cart_id;
                let cartItem = this.getCartItemFromProduct(item.product, parseInt(item.qty));
                this.cart.push(cartItem);
              })
            },
            (err)=>{
              // Cart error
              $log.log('Cart error');
              $log.log(err);
              this.cart.push({status:0,'msg':'อภัยเกิดข้อผิดพลาดขึ้นบางอย่าง T-T'})
            }
          );
        } else {
          $log.log('Guest')
          this.isLoggedIn = MEMBER_LOGOUT;
          deferred.resolve(MEMBER_LOGOUT);
        }
      }
    )
    return deferred.promise;
  }
  this.getToken = () => {
    $http.get(baseURL + '/api/token').then(
      (res) => {
        $log.log('get session token :', res.data)
        token = res.data;
      }
    )


  }
  this.clearSession = () => {
    return api.logout({
      _token: token
    }).$promise;
  }
  this.getLoginSession = (email, password) => {
    //DO TRIPLE DES HERE BEFORE USER AJAX
    return api.login({
      email: email,
      password: password,
      _token: token
    }).$promise
  }

  //Parse PRODUCT TO CART PRODUCT HERE FOR EASY TO MANAGE
  this.getCartItemFromProduct = (product, amount) => {

    let cartItem = {
      product_id: product.product_id,
      amount,
      product_name: product.product_name,
      retail_price: product.retail_price,
      product_detail: product.detail,
    };
    if (product.cart_id) {
      cartItem.cart_id = product.cart_id;
    }
    $log.log(product);
    if (product.selected_option) {
      cartItem.option = product.selected_option;
      // cartItem.option_name = product.selected_option;
    } else if (product.product_option) {
      if (product.product_option.option_id) {
        cartItem.option = {
          option_name: product.product_option.option_name
        }
      }
    }
    // if (product.product_option_group) {
    //   if (product.product_option_group.option) {
    //     if (product.selected_option) {
    //       cartItem.option = product.selected_option;
    //       cartItem.option_name = product.product_option_group.option[product.selected_option].option_name
    //     }
    //   }
    // }
    if (product.product_option_name) {
      cartItem.option_name = product.product_option_name;
    }
    return cartItem;
  }

  // เช็ค session ตั้งแต่ เข้า application
  this.getToken();
  this.checkSession();
}
