var app = angular.module('firebaseLogin');

app.service('firebaseService', function ($firebase) {
	var firebaseUrl = 'https://devlogin.firebaseio.com/';

	this.getUser = function(userId){
		return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject();
	};

	this.getThings = function(userId){
		return $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/things')).$asArray();	
	}
})