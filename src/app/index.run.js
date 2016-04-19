export function runBlock($log,$rootScope,toastr,$window,_,$localStorage) {
  'ngInject';
  $log.debug('runBlock end');
  //
  $localStorage.cart = [ ]
  $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
      toastr.warning('Connection is unstable.. Please try again', 'Warning');
      NProgress.done();
    })
    $rootScope._ = _;
  let stateChangeStart = (event, toState) => {
    $log.log('toState:'+toState.name);
    $rootScope.state = toState;
    $rootScope.isLoading = true;
    NProgress.start();
  }
  let stateChangeSuccess = () => {
    $rootScope.isLoading = false;
    $window.scrollTo(0,0);
    NProgress.done();
  }
  let stateStart = $rootScope.$on('$stateChangeStart', stateChangeStart)
  let stateSuccess = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess)
  $rootScope.$on('$destory', () => {
    stateStart();
    stateSuccess();
  });
}
