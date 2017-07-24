'use strict';

let firebase = require("./firebaseConfig");
let provider = new firebase.auth.GoogleAuthProvider();

module.exports.logInGoogle = () => {
	console.log("In");
	return firebase.auth().signInWithPopup(provider);

};

module.exports.logOut = () => {
	console.log('out');
	return firebase.auth().signOut();
}; 

