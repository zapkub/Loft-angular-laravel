export function NumberInputDirective(){
  let directive = {
    restrict:"E",
    scope:{
      ngModel:"=",
      'max':"="
    },
    link:(scope)=>{
      scope.modify = (amount)=>{
        scope.ngModel = parseInt(  scope.ngModel) + parseInt(amount);
        if(  scope.ngModel < 0 ){
            scope.ngModel = 0;
        }
        if(scope.ngModel > scope.max){
          scope.ngModel  = scope.max;
        }
      }
      if(!scope.ngModel){
        scope.ngModel = 1;
      }

    },
    template:`
      <div class="loft-input-label"> QTY </div>
      <div class="loft-input decrease" ng-click="modify(-1)"><i class="glyphicon glyphicon-chevron-down"></i></div>
      <div class="loft-input-data" > {{ngModel}}</div>
      <div class="loft-input increase" ng-click="modify(1)"> <i class="glyphicon glyphicon-chevron-up"> </i> </div>

    `
  }
  return directive;
}
