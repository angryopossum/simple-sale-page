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


app.controller("MainController", function($scope, $firebaseArray, $firebaseAuth, $location) {

  var database = firebase.database();
  var ref = firebase.database().ref().child("products");
  $scope.products = $firebaseArray(ref);
  $scope.authObj = $firebaseAuth();
  

  $scope.isauth = function(){
        var isauth = $scope.authObj.$getAuth();
        if (isauth){
          return true;
       } else {
          return false;
       };
        
  };

  
  // Login
  $scope.login = function(email,password){
        
    $scope.authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
    console.log("Signed in as:", firebaseUser.uid);
    console.log("Signed in as:", firebaseUser.email);
    $location.path('/');    

   //    authData = $scope.authObj.$getAuth();

    /*$scope.authData = authData;
           

    if (authData) {
      console.log("Logged in as:", authData.email);
        } else {
          console.log("Logged out");
        } */

        }).catch(function(error) {
         console.error("Authentication failed:", error);
        }); 
      };

    //Logout
     $scope.logout = function(){
        
         $scope.authObj.$signOut().then(function() {
            console.log("Signed out");
            $scope.authData = undefined;
         }, function(error) {
            console.log("Error signing out:", error);  
         });

      };

    //Upload file
    $scope.uploadFile = function (file) {

      var storageRef = firebase.storage().ref();
      var imagesRef = storageRef.child('images');

      var fileName = 'space.jpg';
      var spaceRef = imagesRef.child(fileName);

  
      var path = spaceRef.fullPath
      var name = spaceRef.name
      var imagesRef = spaceRef.parent;

      var metadata = {
        contentType: 'image/jpeg'
      };

      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
       function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
             console.log('Upload is paused');
             break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
             console.log('Upload is running');
             break;
        }
      }, function(error) {
        console.log(error.code);
        switch (error.code) {
          case 'storage/unauthorized':
          break;

          case 'storage/canceled':
          break;

          case 'storage/unknown':
          break;
          case 'storage/invalid-argument':
          break;
      }
      }, function() {
  
          var downloadURL = uploadTask.snapshot.downloadURL;
          console.log("++++" + downloadURL);
          var newimg = document.createElement("img");
          newimg.src = downloadURL;
          document.getElementById("img").appendChild(newimg);
      });

    }



 });


app.controller("EditController", function($scope,$location) {

  if ($scope.isauth())
   {
     $scope.a = "Edit/Auth!";
     $scope.editProduct = function (key){
        $rootScope.key =  key;
        $rootScope.ProductTitle = $scope.products[key].title; 
        $rootScope.ProductPrice = $scope.products[key].price; 
        $rootScope.ProductDescription = $scope.products[key].description; 
        $location.path('/update');
       };   }
 else
   {
    $location.path('/login');
   }
 
});

app.controller("NewController", function($scope, $location,$rootScope) {
  
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
 
});


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

app.controller("LogoutController", function($scope, $location) {
  $scope.logout();
  $location.path('/new');
    
});

