(function(){
  angular
    .module('saleApp')
    .controller("LoginController", LoginController);
 
  function LoginController($scope, $location) {
  
   if (!$scope.isauth())
   {
     $scope.a = "Login/Auth!";
    }
   else
   {
     $location.path('/');
    }
  };

})();
