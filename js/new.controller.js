(function(){
 
  angular
    .module('saleApp')
    .controller("NewController", NewController);

  function NewController($scope, $location,$rootScope) {
  
  if ($scope.isauth())
   {
    $scope.a = "New/Auth!";
    $scope.addProduct = function() {
        $scope.products.$add({
        title: $scope.newProductTitle,
        price: $scope.newProductPrice,
        description: $scope.newProductDescription,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/"+config.storageBucket+"/o/images%2F"+$scope.file.name+"?alt=media"
       });
      console.log($scope.file);  
      $scope.uploadFile($scope.file);
      $location.path('/edit');  
      };

   }
   else
   {
     $location.path('/login');
    }
 
  };



})();

