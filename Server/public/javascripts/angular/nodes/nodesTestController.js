/**
 * Created by ajantha on 5/26/16.
 */
prkApp.controller('nodeTestController',function($scope,$http,$timeout){

    //$scope.apiUrl = "http://ec2-52-39-190-28.us-west-2.compute.amazonaws.com/api/v1/places";
    //$scope.apiUrl = "http://127.0.0.1:3000/api/v1/nodemcu";
    $scope.apiUrl= "http://ec2-52-39-190-28.us-west-2.compute.amazonaws.com/api/v1/nodemcu";

    $scope.places = [
        {
            lat:7.255209,
            lng:80.592715,
            name:"E-Fac (near the new chemical building)",
            numOfSlots:20,
            availableSlots:5,
            prkType:"Indoor"
        },{
            lat:7.252603,
            lng:80.591643,
            name:"E-Fac (near the faculty canteen)",
            numOfSlots:12,
            availableSlots:3,
            prkType:"Indoor"
        },{
            lat:7.254319,
            lng:80.596698,
            name:"Senate 01",
            numOfSlots:30,
            availableSlots:9,
            prkType:"Outdoor"
        },{
            lat:7.254032,
            lng:80.596922,
            name:"Senate 02",
            numOfSlots:10,
            availableSlots:2,
            prkType:"Outdoor"
        },{
            lat:7.259352,
            lng:80.599135,
            name:"Science",
            numOfSlots:7,
            availableSlots:1,
            prkType:"Outdoor"
        },{
            lat:7.253579,
            lng:80.598277,
            name:"Medicine",
            numOfSlots:14,
            availableSlots:6,
            prkType:"Indoor"
        }
    ];


    $scope.initializer = function(){

    };


    $scope.sendRequest = function(index){
      //console.log($scope.places[index]);
        $http.post($scope.apiUrl,{node:$scope.places[index]})
            .then(function(data){
                console.log("request sent");
                console.log(data);
            }, function (err) {
                console.log(err);
            });
    };

    $scope.sendBulk = function(){
        for(id in $scope.places){
            console.log($scope.places[id]);
            $http($scope.apiUrl,{node:$scope.places[id]})
                .then(function(data){
                    console.log(data);
                }, function (err) {
                    console.log(err);
                });
        }
    };

    function showMassage(msg){
    }

    function hideMassage(){
    }

});