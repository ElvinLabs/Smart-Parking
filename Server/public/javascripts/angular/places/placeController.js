prkApp.controller('placeController',function($scope,$http,$timeout){

    $scope.apiUrl = "http://ec2-52-39-190-28.us-west-2.compute.amazonaws.com/api/v1/places";
    $scope.place = {};
    $scope.isMassageEnable= false;
    $scope.massage = "error msg";
    $scope.places = [];
    $scope.selectedPlace = {};

    $scope.isUpdateDisabled = true;
    $scope.isAddDisabled = false;
    $scope.isDeleteDisabled = true;

    $scope.initializer = function(){
      $scope.getPlaces();
    };

    $scope.addPlace = function(){

        console.log($scope.place);
        $http.post($scope.apiUrl,$scope.place)
            .then(function(data){
                console.log("success");
                console.log(data);
                showMassage(data.data.msg);
                $timeout(hideMassage,5000);
                newPlaceSetDefault();
            }, function(err){
                console.log("err");
                console.log(err);
                showMassage(data.data.msg);
                $timeout(hideMassage,5000);
                newPlaceSetDefault();
            });
    };


    $scope.getPlaces = function(){
      $http.get($scope.apiUrl)
          .then(function(data){
              console.log("got the places");
              console.log(data.data.data);
              $scope.places = data.data.data;
          },function(err){
              console.log("got an error");
              console.log(err);
          });
    };

    $scope.updatePlace = function(){
        $http.put($scope.apiUrl,$scope.selectedPlace)
            .then(function(data){
                console.log("updated the places");
                console.log(data.data.data);
            },function(err){
                console.log("got an error");
                console.log(err);
            });
    };

    $scope.deletePlace = function(){

    };


    $scope.selectedRow = function (index) {
        console.log(index);
        $scope.isAddDisabled = true;
        $scope.isUpdateDisabled = false;
        $scope.selectedPlace = $scope.places[index];

        $scope.place.name = $scope.places[index].name;
        $scope.place.latitude = $scope.places[index].lat;
        $scope.place.longitude = $scope.places[index].lng;

    };

    function newPlaceSetDefault(){
        if(Object.keys($scope.place).length > 0){
            $scope.place.name = "";
            $scope.place.latitude = 0.0;
            $scope.place.longitude = 0.0;
        }
    }

    function showMassage(msg){
        console.log("/////////////////////////");
        $scope.isMassageEnable= true;
        $scope.massage = msg;
    }

    function hideMassage(){
        console.log("*****************************************");
        $scope.isMassageEnable= false;
    }

});