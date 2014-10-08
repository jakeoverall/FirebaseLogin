var app = angular.module('firebaseLogin', ['ngRoute', 'firebase']);

app.config(function($routeProvider){

$routeProvider
	.when('/login',{
		templateUrl: 'login.html',
		controller: 'LoginCtrl'
	})
	.when('/dashboard/:userId', {
		templateUrl: 'dashboard.html',
		controller: 'DashboardCtrl',
		resolve: {
			userReference: function(firebaseService, $route){
				return firebaseService.getUser($route.current.params.userId);
			},
			thingsReference: function(firebaseService, $route){
				return firebaseService.getThings($route.current.params.userId);
			}
		}
	})
	.otherwise({
		redirectTo: '/login'
	});
});