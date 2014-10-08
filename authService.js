var app = angular.module('firebaseLogin');

app.service('authService', function(){
	//Just a reference to the firebase endpoint
	var firebaseUrl = 'https://devlogin.firebaseio.com/'
	//Creates an object using the Firebase Constructor with our endpoint passed in 
	var firebaseLogin = new Firebase(firebaseUrl);

	//login method to be called from our controller. The callback is then passed the authenticated user

	this.login = function(user, cb){
		firebaseLogin.authWithPassword({
			email    : user.email,    //Email and Password come from our login form 
			password : user.password
		}, function(err, authData) {
			if (err) {
				switch (err.code) {
					case "INVALID_EMAIL":
			        // handle an invalid email 
			        case "INVALID_PASSWORD":
			        // handle an invalid password
			        default:
			    }
			} else if (authData) {
			    // user authenticated with Firebase
			    console.log("Logged In! User ID: " + authData.uid);
			    cb(authData); //gives the authenticated user to our callback
			}
		});
	}

	this.register = function(user, cb){
		firebaseLogin.createUser({
			email: user.email,
			password: user.password
		}, function(error) {
			if (error === null) {
				console.log("User created successfully");
				firebaseLogin.authWithPassword({
						email    : user.email,
						password : user.password
					}, function(err, authData) {
				  if (authData) {
				  	authData.name = user.name;
				  	authData.timestamp = new Date().toISOString();
				    firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
				    cb(authData);
				  } else {
				  	console.log('something went wrong');
				  }
				});
			} else {
				console.log("Error creating user:", error);
				return false;
			}
		});
	}
});