(function(){
  angular
    .module('saleApp')
    .controller("MainController", MainController);

  function MainController($scope, $firebaseArray, $firebaseAuth, $location,$rootScope, $cookies) {

    var database = firebase.database();
    var ref = firebase.database().ref().child("products");
    $scope.authObj = $firebaseAuth();
    $scope.isauth = isauth;
    $scope.login = login;
    $scope.logout = logout; 
    $scope.products = $firebaseArray(ref);
    $scope.uploadFile = uploadFile;

    $scope.user = $cookies.get("user");

    $scope.deleteStorageFile = deleteStorageFile;
   

    function deleteStorageFile (link){
      var file = link.split("/")[7].split("?")[0].split("%2F")[1];
      var storageRef = firebase.storage().ref();
      var deleteFileRef = storageRef.child('images/'+ file);
   
      deleteFileRef.delete().then(function(){
        console.log("File deleted successfully");
      }
        ).catch(function (error){
          console.error("File deleted error occured!" + error);
        });  



      console.log(deleteFileRef);
    };





     authData = $scope.authObj.$getAuth();
     $scope.authData = authData;
        

    if (authData) {
       console.log("Logged in as:", authData.email);
       
        } else {
          console.log("Logged out");
         
        } 





    function isauth(){
        var isauth = $scope.authObj.$getAuth();
        if (isauth){
          return true;
       } else {
          return false;
       };
        
    };

   
   



  
  // Login
    function login(email,password){
        
    $scope.authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      console.log("Signed in as:", firebaseUser.email);
      $cookies.put("user", firebaseUser.email);
      $scope.user = $cookies.get("user");
      $scope.status = "logout";
      $location.path('/');    

        }).catch(function(error) {
         console.error("Authentication failed:", error);
        }); 
      };

    //Logout
    function logout(){
        
         $scope.authObj.$signOut().then(function() {
            console.log("Signed out");
            $scope.user = undefined;
            $cookies.remove("user")
            $scope.status = "login";
            $location.path('/login');  
         }, function(error) {
            console.log("Error signing out:", error);  
         });

  };

    //Upload file
    function uploadFile(file) {

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
         
      });

    }


  };


})();

