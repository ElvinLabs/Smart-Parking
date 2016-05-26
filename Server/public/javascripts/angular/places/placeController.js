prkApp.controller('placeController',function($scope,$http,$timeout){

    $scope.apiUrl = "http://ec2-52-39-190-28.us-west-2.compute.amazonaws.com/api/v1/places";
    //$scope.apiUrl = "http://127.0.0.1:3000/api/v1/places";
    $scope.place = {};
    $scope.isMassageEnable= false;
    $scope.place.isDisable = false;
    $scope.selectedPlaceIndex = -1;
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
                if(data.data.data != null) $scope.places.push(data.data.data);
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
        var place = {
            __v:$scope.selectedPlace.__v,
            _id:$scope.selectedPlace._id,
            created:$scope.selectedPlace.created,
            availableSlots:$scope.selectedPlace.availableSlots,
            isDisable:$scope.place.isDisable,
            lat:$scope.place.latitude,
            lng :$scope.place.longitude,
            name:$scope.place.name,
            numOfSlots:$scope.selectedPlace.numOfSlots,
            prkType:$scope.place.prkType
        };
        console.log(place);

        $http.put($scope.apiUrl,place)
            .then(function(data){
                console.log("updated the places");
                console.log(data.data.data);
                if(data.data.data != null && data.data.err == false) $scope.places[$scope.selectedPlaceIndex] = data.data.data;
                showMassage(data.data.msg);
                $timeout(hideMassage,5000);
                newPlaceSetDefault()
            },function(err){
                console.log("got an error");
                console.log(err);
                showMassage(data.data.msg);
                $timeout(hideMassage,5000);
                newPlaceSetDefault()
            });
    };

    $scope.deletePlace = function(){
        $http.delete($scope.apiUrl+"/"+$scope.selectedPlace._id).
            then(function (data) {
                console.log("place remove");
                console.log(data.data);
            }, function (err) {
                console.log("got error");
                console.log(err);
            });
    };


    $scope.selectedRow = function (index) {
        console.log(index);
        $scope.selectedPlaceIndex = index;

        $scope.isAddDisabled = true;
        $scope.isUpdateDisabled = false;
        $scope.isDeleteDisabled = false;

        $scope.selectedPlace = $scope.places[index];

        $scope.place.name = $scope.places[index].name;
        $scope.place.latitude = $scope.places[index].lat;
        $scope.place.longitude = $scope.places[index].lng;
        $scope.place.isDisable = $scope.places[index].isDisable;
        $scope.place.prkType = $scope.places[index].prkType;

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