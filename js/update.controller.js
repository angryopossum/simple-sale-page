(function(){
  
  app.controller("UpdateController", function($scope, $location) {
  
  if ($scope.isauth())
   {
    $scope.a = "Update/Auth!";
    $scope.updateProduct = function(key) { 
        $scope.products[key].price = $scope.ProductPrice;
        $scope.products[key].title = $scope.ProductTitle; 
        $scope.products[key].description = $scope.ProductDescription;
        $scope.products.$save(key);
        $location.path('/edit');  
    };    

   }
  else
   {
     $location.path('/login');
    }

  });
  
})();
