(function(){

  app.controller("LogoutController", function($scope, $location) {
    $scope.logout();
    $location.path('/new');
  });
  
})();

