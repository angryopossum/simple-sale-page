var config = {
      apiKey: "AIzaSyCNIpzv2zey2YTWgyPHdX0GNup6PDcFPDk",
      authDomain: "test-d6cfd.firebaseapp.com",
      databaseURL: "https://test-d6cfd.firebaseio.com",
      storageBucket: "test-d6cfd.appspot.com",
      messagingSenderId: "alex",
    };
    firebase.initializeApp(config);

var app = angular.module('saleApp', ["ngRoute","firebase"])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',
        {
           templateUrl:'views/main.html'
        }).when('/edit',
        {
            templateUrl:'views/edit.html'
        }).when('/new',
        {
            templateUrl:'views/new.html'
        }).when('/update',
        {
            templateUrl:'views/update.html'
        }).when('/login',
        {
            templateUrl:'views/login.html'
        }).when('/logout',
        {
            templateUrl:'views/logout.html'
        }).otherwise({redirectTo: '/'});
}]);


app.directive("ngModelFile", function(){
  return {
    link: function(scope,element,attrs){
      element.bind("change",function(changeEvent){
        scope.$apply(function(){
          scope.file=changeEvent.target.files[0];
        }
        )
      });
    }
  }
});



