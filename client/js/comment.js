console.log("loaded");
var app = angular.module('commentBoard', ["firebase", "ngRoute"]);

app.controller('commentBoardCtrl',["$scope","$firebaseArray",function($scope, $firebaseArray){
 
    var dbnum = new Firebase("https://schoolcourtsocket.firebaseio.com/numbers");
    var db = new Firebase("https://schoolcourtsocket.firebaseio.com/comments1");
    var db2 = new Firebase("https://schoolcourtsocket.firebaseio.com/comments2");
    
    $scope.numbers = $firebaseArray(dbnum);
  
    $scope.numbers.$loaded().then(function(numbers) {
         $scope.lsupporters  = $scope.numbers[1].$value;
         var lvotes  = $scope.numbers[1].$value;
         $scope.rsupporters  = $scope.numbers[3].$value;
         var rvotes  = $scope.numbers[3].$value;
         
         $('#redbar').progress({
          percent: parseInt((lvotes/(lvotes+rvotes))*100)
        });
         $('#bluebar').progress({
          percent: parseInt((rvotes/(lvotes+rvotes))*100)
        });
        
        
        
         $scope.supportred = function(){
            dbnum.update({"lvotes": (lvotes+1)});
            lvotes  = $scope.numbers[1].$value;
             $('#redbar').progress({
              percent: parseInt((lvotes/(lvotes+rvotes))*100)
            });
             $('#bluebar').progress({
             percent: parseInt((rvotes/(lvotes+rvotes))*100)
           });
            $scope.lsupporters  = $scope.numbers[1].$value;
         };
        $scope.supportblue = function(){
            dbnum.update({"rvotes": (rvotes+1)});
            rvotes  = $scope.numbers[3].$value;
            $('#bluebar').progress({
             percent: parseInt((rvotes/(lvotes+rvotes))*100)
           });
             $('#redbar').progress({
              percent: parseInt((lvotes/(lvotes+rvotes))*100)
            });
             $scope.rsupporters  = $scope.numbers[3].$value;
         };
    });
    
   

   
    $scope.comments = $firebaseArray(db);
    $scope.comments.$loaded().then(function(comments) {
     $scope.commentnum = comments.length;
    });
    $scope.comments2 = $firebaseArray(db2);
    $scope.comments2.$loaded().then(function(comments) {
     $scope.commentnum2 = comments.length;
    });
    $scope.anonymous = "https://lh5.googleusercontent.com/-dPlKfVYwEjk/AAAAAAAAAAI/AAAAAAAAAyU/N2-D2Y5YyEI/photo.jpg";
    $scope.comment1 = {
        "author" : "",
        "textarea" : "",
        "date" : "",
        "photo" : ""
    };
    $scope.comment2 = {
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
       $scope.post2 = function(){
        $scope.comment2.date = Date.now();
        if(!$scope.comment1.photo){
            $scope.comment2.photo = "http://350cr.blogs.brynmawr.edu/files/2013/05/anonymous.jpg";   
        }else{
             $scope.comment2.photo = $scope.comment1.photo;
        }
       if($scope.comment2.textarea && $scope.comment2.author){
            $scope.comments2.$add($scope.comment2);
            $scope.comment2.author = "";
            $scope.comment2.textarea = "";
    
       }else if($scope.comment2.textarea){
            $scope.comment2.author = "Anonymous";
            $scope.comments2.$add($scope.comment2);            
            $scope.comment2.author = "";
            $scope.comment2.textarea = "";
            
       }else{
           alert("You forgot to put something.");
       }
    };
    
}]);