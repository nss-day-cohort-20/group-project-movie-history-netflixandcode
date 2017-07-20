'use strict';

console.log("user Facorty load");

 let firebase = require("./firebaseConfig"),
 	 provider = new firebase.auth.GoogleAuthProvider();
 	 
 	



module.exports.logInGoogle = () => {
	return firebase.auth().signInWithPopup(provider);

};

module.exports.logOut = () => {
	return firebase.auth().signOut();
};


