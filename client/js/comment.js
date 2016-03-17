console.log("loaded");
var app = angular.module('commentBoard', ["firebase", "ngRoute"]);

app.controller('commentBoardCtrl',["$scope","$firebaseArray",function($scope, $firebaseArray){
    var db = new Firebase("https://schoolcourtsocket.firebaseio.com/");
    $scope.comments = $firebaseArray(db);

}]);