// script.js
// create the module and name it labApp
var labApp = angular.module('labApp', ['ngRoute']);

// configure our routes
labApp.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/pubs', {
				templateUrl : 'pages/publications.html',
				controller  : 'publicationsController'
			})

			// route for the about page
			.when('/lab', {
				templateUrl : 'pages/lab.html',
				controller  : 'labController'
			})

			// route for the about page
			.when('/bioinfo', {
				templateUrl : 'pages/bioinformatics.html',
				controller  : 'bioinfoController'
			});
});
// create the controller and inject Angular's $scope
labApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

labApp.controller('publicationsController', function($scope) {
	$scope.message = 'Look! Publications';
});

labApp.controller('labController', function($scope) {
	$scope.message = 'Look! Lab';
});

labApp.controller('bioinfoController', function($scope) {
	$scope.message = 'Look! Codes';
});