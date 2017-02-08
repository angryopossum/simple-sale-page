(function(){
	
  app.controller("LoginController", function($scope, $location) {
  
   if (!$scope.isauth())
   {
     $scope.a = "Login/Auth!";
    }
   else
   {
     $location.path('/');
    }
  });

})();
