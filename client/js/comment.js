console.log("loaded");
var app = angular.module('commentBoard', ["firebase", "ngRoute"]);

app.controller('changeImgCtrl',['$scope',function($scope){
    $scope.imgarr = [
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCya7otWH8Mk7MZcT9SFRXrZZD3ChXSIhFc1QS1hUno-NwZp0O",
     "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpF_NrmSnVMDpswWL3IYltSIAU02NK8YL_4HtX-BItI5mdliAr",
     "http://www.usnews.com/dbimages/master/40788/FE_DA_2013BHS_Charter.jpg",
     "http://www.onlineuniversities.com/wp-content/uploads/2012/08/15booksUSedu1.jpg",
     "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSPcWSv6GihXAjZJJ6M1BPakip7fOBcRWvr__6T9f9NtxcqCHL2zw",
     "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSz6Ro9lDQEmXddXYi3VHY-DVIg3uO7FZ1KiBtW4ECt9M38YfB-nA"
     ];
     var picIndex = 1;
     $scope.toLeft = function(){
       if(picIndex < ($scope.imgarr.length)-2) {
        console.log(picIndex);
        console.log(($scope.imgarr.length)-2);
         $('#pic1').attr('src',$scope.imgarr[picIndex]);
         $('#pic2').attr('src',$scope.imgarr[picIndex+1]);
         $('#pic3').attr('src',$scope.imgarr[picIndex+2]);
         picIndex += 1;
       }
     };
     $scope.toRight = function(){
       if(picIndex > 1){
         $('#pic1').attr('src',$scope.imgarr[picIndex-2]);
         $('#pic2').attr('src',$scope.imgarr[picIndex-1]);
         $('#pic3').attr('src',$scope.imgarr[picIndex]);
         picIndex -=1;
       }
     };
     
     
}]);



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