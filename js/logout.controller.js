(function(){

  angular
    .module('saleApp')
    .controller("LogoutController", LogoutController);

  function LogoutController($scope, $location) {
    $scope.logout();
    $location.path('/new');
  };
  
})();

