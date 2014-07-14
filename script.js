// script.js
// create the module and name it labApp
var labApp = angular.module('labApp', []);

// create the controller and inject Angular's $scope
labApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

