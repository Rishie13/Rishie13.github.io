var app = angular.module("profile",['ngRoute'])

.config(['$routeProvider', function($routeProvider){ 
  $routeProvider.
  when('/main',{
    templateUrl: 'main.html',
    controller: 'MainCtrl'
  }).
    when('/dervices',{
    templateUrl: 'dervices.html',
    controller: 'DervicesCtrl'
  }).
    when('/about',{
    templateUrl: 'about.html',
    controller: 'AboutCtrl'
  }).
    when('/contacts',{
    templateUrl: 'contacts.html',
    controller: 'ContactsCtrl'
  }).
    when('/skills',{
    templateUrl: 'skills.html',
    controller: 'SkillsCtrl'
  }).
  otherwise({redirectTo:'/main'});
}])

.controller('MainCtrl', ['$scope', function($scope){
 
}])

.controller('AboutCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('about.json').then(function(response){
     $scope.about=response.data;
    });
}])

.controller('DervicesCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('dervices.json').then(function(response){
     $scope.dervices=response.data;
    });
}])

.controller('ContactsCtrl', ['$scope', function($scope){
 
}])

.controller('SkillsCtrl', ['$scope', '$http', function($scope, $http){
     $http.get('skills.json').then(function(response){
     $scope.skillso=response.data;
    });
}]);

