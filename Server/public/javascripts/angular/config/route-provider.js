/**
 * Created by ajantha on 5/22/16.
 */

//prkApp.config(['$routeProvider','$locationProvider', function($routeProvider){
prkApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

    $routeProvider
        .when('/home/nodes', {
            templateUrl: '/home/nodes',
            controller: 'nodeController.js'
        })
        .when('/places', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $locationProvider.html5Mode(true);
}]);
