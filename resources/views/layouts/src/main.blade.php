<!DOCTYPE html>
<html ng-app="WeInternship">
  <head>
    <meta charset="utf-8">
    <title></title>

  </head>
  <body>
    <div id="ui-main">
    @yield('content')
  </div>
  </body>

{{-- Inject Javascript Vendor --}}
  <!-- build:js ../../../public/js/vendor.js -->
  <!-- bower:js -->
  <!-- endbower -->
  <!-- endbuild -->
{{-- End Javascript Vendor --}}


  {{-- application script with module chain--}}
  <script src="js/all.js"></script>


</html>
