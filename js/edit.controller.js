(function(){
  angular
    .module('saleApp')
    .controller("EditController", EditController);

  function EditController($scope,$rootScope,$location) {

     if ($scope.isauth())
     {
       $scope.a = "Edit/Auth!";
       $scope.editProduct = function (key){
         $rootScope.key =  key;
         $rootScope.ProductTitle = $scope.products[key].title; 
         $rootScope.ProductPrice = $scope.products[key].price; 
         $rootScope.ProductDescription = $scope.products[key].description; 
         $rootScope.ImageUrl = $scope.products[key].imageUrl; 
         $location.path('/update');
      };   }
    else
    {
       $location.path('/login');
    }
 
  };

})();


