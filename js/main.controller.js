(function(){
  angular
    .module('saleApp')
    .controller("MainController", MainController);

  function MainController($scope, $firebaseArray, $firebaseAuth, $location) {

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


  };


})();

