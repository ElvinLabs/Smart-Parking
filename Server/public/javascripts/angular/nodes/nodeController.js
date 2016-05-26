/**
 * Created by ajantha on 5/22/16.
 */
prkApp.controller('nodeController', function($scope, $http, $timeout){

    $scope.apiUrl           = "http://ec2-52-39-190-28.us-west-2.compute.amazonaws.com/api/v1/";
    //$scope.apiUrl = "http://127.0.0.1:3000/api/v1/";
    $scope.node             = {};
    $scope.node.isActive = false;
    $scope.node.isDisable = false;
    $scope.massage          = "error msg";
    $scope.nodes            = [];
    //$scope.places           = [];
    $scope.places = {
        'availablePlaces':[],
        'defaultPlace':{}
    };
    $scope.selectedNode     = {};
    $scope.currentNodeIndex = -1;

    $scope.isUpdateDisabled = true;
    $scope.isAddDisabled    = false;
    $scope.isDeleteDisabled = true;
    $scope.isMassageEnable  = false;

    $scope.initializer = function(){
        $scope.getPlaces();
        $scope.getNodes();
    };

    $scope.getNodes = function(){
        $http.get($scope.apiUrl+"nodes")
            .then(function(data){
                console.log("got the Node");
                console.log(data.data.data);
                $scope.nodes = data.data.data;
            },function(err){
                console.log("got an error");
                console.log(err);
            });
    };


    $scope.addNode = function(){
        $http.post($scope.apiUrl+"nodes",$scope.node)
            .then(
            function(data){
                console.log("node added");
                console.log(data.data.data);
                showMassage(data.data.msg);
                $timeout(hideMassage, 5000);
                setDataDefault();
                if(data.data.data != null) $scope.nodes.push(data.data.data);
            }, function(err){
                console.log("error ocured");
                console.log(err);
                showMassage(data.data.msg);
                $timeout(hideMassage, 5000);
                setDataDefault();
            });
    };

    $scope.getPlaces = function(){
        $http.get($scope.apiUrl+"places")
            .then(function(data){
                console.log("got the places");
                console.log(data.data.data);
                $scope.places.availablePlaces = data.data.data;
                //$scope.places.defaultPlace = data.data.data[0];
            },function(err){
                console.log("got an error");
                console.log(err);
            });
    };


    $scope.updateNode = function(){
        var nodeSelected = {
            _id:$scope.nodes[$scope.currentNodeIndex]._id,
            owner:$scope.places.defaultPlace.name,
            lat:$scope.node.latitude,
            lng:$scope.node.longitude,
            lastModified:$scope.nodes[$scope.currentNodeIndex].lastModified,
            __v:$scope.nodes[$scope.currentNodeIndex].__v,
            nodeId:$scope.nodes[$scope.currentNodeIndex].nodeId,
            isDisable:$scope.node.isDisable,
            isActive:$scope.node.isActive
        };
        console.log(nodeSelected);
        $http.put($scope.apiUrl+"nodes/"+nodeSelected._id,{node:nodeSelected})
            .then( function(data){
                console.log("node updated");
                console.log(data.data);
                if(data.data.data != null) $scope.nodes[$scope.currentNodeIndex] = data.data.data;
                showMassage(data.data.msg);
                $timeout(hideMassage, 5000);
                setDataDefault();
            }, function(err){
                console.log(" got an error");
                console.log(err);
                showMassage(data.data.msg);
                $timeout(hideMassage, 5000);
                setDataDefault();
            });
    };


    $scope.deleteNode = function () {
      var id = $scope.nodes[$scope.currentNodeIndex]._id;
        $http.delete($scope.apiUrl+"nodes/"+id)
            .then(function (data) {
                console.log("node removed");
                console.log(data.data);
            }, function (err) {
                console.log("got error");
                console.log(err);
            });
    };

    $scope.nodeSelected = function (index) {
        $scope.currentNodeIndex = index;
        // assigned the selected row values
        $scope.node.owner       = $scope.nodes[index].owner;
        $scope.node.latitude    = $scope.nodes[index].lat;
        $scope.node.longitude   = $scope.nodes[index].lng;
        $scope.node.nodeId      = $scope.nodes[index].nodeId;
        $scope.node.isActive      = $scope.nodes[index].isActive;
        $scope.node.isDisable      = $scope.nodes[index].isDisable;
        $scope.places.defaultPlace    = {name:$scope.nodes[index].owner};

        $scope.isAddDisabled = true;
        $scope.isUpdateDisabled = false;
        $scope.isDeleteDisabled = false;

        console.log("********* $scope.node *********");
        console.log($scope.node);

    };

    $scope.placeOnChange = function(name){
      $scope.node.owner = name;
        console.log($scope.node);
        $scope.node.nodeId = $scope.places.defaultPlace.numOfSlots;
    };

    function showMassage(msg){
        $scope.isMassageEnable= true;
        $scope.massage = msg;
    }

    function hideMassage(){
        $scope.isMassageEnable= false;
    }

    $scope.dataToDefault = function(){
        setDataDefault();
    };

    function setDataDefault(){
        console.log("---------------- hit the clear button----------");
        $scope.node= {};
        $scope.places.defaultPlace = {};
        $scope.isDeleteDisabled = true;
        $scope.isUpdateDisabled = true;
        $scope.isAddDisabled = false;

        $scope.node.isActive = false;
        $scope.node.isDisable = false;
    }


});