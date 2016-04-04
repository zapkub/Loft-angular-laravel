<!DOCTYPE html>
<html ng-app="WeInternship">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="css/app.css" media="screen" title="no title" charset="utf-8">

  </head>
  <body>
    @yield('content')
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
