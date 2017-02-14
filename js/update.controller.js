(function(){
  
  angular
    .module('saleApp')
    .controller("UpdateController", UpdateController);


  function UpdateController($scope, $location) {
  
  if ($scope.isauth())
   {
    $scope.a = "Update/Auth!";
    $scope.updateProduct = function(key) { 
        $scope.products[key].price = $scope.ProductPrice;
        $scope.products[key].title = $scope.ProductTitle; 
        $scope.products[key].description = $scope.ProductDescription;
     
        if ($scope.file){
          $scope.uploadFile($scope.file); 
          $scope.deleteStorageFile($scope.products[key].imageUrl);
          $scope.products[key].imageUrl = "https://firebasestorage.googleapis.com/v0/b/"+config.storageBucket+"/o/images%2F"+$scope.file.name+"?alt=media";

        }
        $scope.products.$save(key);
         $location.path('/edit'); 
    };
   
       
    
   }
  else
   {
     $location.path('/login');
    }

  };
  
})();
