console.log("loaded");
var app = angular.module('commentBoard', ["firebase", "ngRoute"]);

app.controller('commentBoardCtrl',["$scope","$firebaseArray",function($scope, $firebaseArray){
    var db = new Firebase("https://schoolcourtsocket.firebaseio.com/");
    $scope.comments = $firebaseArray(db);
    $scope.anonymous = "https://lh5.googleusercontent.com/-dPlKfVYwEjk/AAAAAAAAAAI/AAAAAAAAAyU/N2-D2Y5YyEI/photo.jpg";
    $scope.comment1 = {
        "author" : "",
        "textarea" : "",
        "date" : "",
        "photo" : ""
    };
    $scope.post = function(){
        $scope.comment1.date = Date.now();
        if(!$scope.comment1.photo){
            $scope.comment1.photo = "http://350cr.blogs.brynmawr.edu/files/2013/05/anonymous.jpg";   
        } 
       if($scope.comment1.textarea && $scope.comment1.author){
            $scope.comments.$add($scope.comment1);
            $scope.comment1.author = "";
            $scope.comment1.textarea = "";
    
       }else if($scope.comment1.textarea){
            $scope.comment1.author = "Anonymous";
            $scope.comments.$add($scope.comment1);            
            $scope.comment1.author = "";
            $scope.comment1.textarea = "";
            
       }else{
           alert("You forgot to put something.");
       }
    };
    
}]);