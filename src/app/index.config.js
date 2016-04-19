export function config ($logProvider, toastrConfig,$httpProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $httpProvider.defaults.withCredentials=true;
  // Set options third-party lib
  // toastrConfig.allowHtml = true;
  // toastrConfig.timeOut = 3000;
    // toastrConfig.preventDuplicates = true;
    toastrConfig.positionClass = 'toast-bottom-right';
  // toastrConfig.preventDuplicates = true;
  // toastrConfig.progressBar = true;
}
