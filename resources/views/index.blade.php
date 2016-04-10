<!DOCTYPE html>
<html ng-app="WeInternship">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="css/app.css" media="screen" title="no title" charset="utf-8">

  </head>
  <body>
    <base href="weinternshipx/">
    <header></header>

    {{-- Ui router view --}}
    <div ui-view />
  </body>

  <script src="../../public/js/vendor.js"></script>


  {{-- application script with module chain--}}
  <script src="js/all.js"></script>


</html>
