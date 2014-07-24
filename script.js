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

});

labApp.controller('publicationsController', function($scope) {

});

labApp.controller('labController', function($scope) {

});

labApp.controller('bioinfoController', function($scope) {

});