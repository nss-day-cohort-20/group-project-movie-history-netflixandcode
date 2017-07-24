'use strict';

let $ = require('jquery');
let firebase = require('./firebaseConfig.js');
let fbUrl = 'https://moviehistoryteambearator.firebaseio.com';

let fbFactory = {};

//this needs to be called in an event listener that looks for the buttons with class ".addTracked"
//this will be a document.on(click) thing ... reach for the parent parent just the movie in that card. Oh and make it disappear from untracked

fbFactory.addMovieToFb = (movieId) => { //get movieId from the card ... remember to put it on the card with a data-attribute upon DOM population
	let movieObject = {};
	let currentUser = firebase.auth().currentUser.uid;
	return new Promise ( (resolve, reject) => {
			console.log("current User", currentUser);
			movieObject.uid = currentUser;
			movieObject.id = movieId;
			movieObject.rating = 0; //if it's 0, not yet watched; if 1-10, user has watched... if >=9 then it's a favorite
			$.ajax({
				url: `${fbUrl}/movies.json`,
				type: "POST",
				data: JSON.stringify(movieObject),
				dataType: 'json'
			}).done( (data) => {
				resolve(data);
			}).fail ( (error) => {
				console.log("Error");
			});

		});

};

fbFactory.getUserMoviesForMatching = () => {
	return new Promise ( (resolve, reject) => {
	let currentUser = firebase.auth().currentUser.uid;
		$.ajax({
			url: `${fbUrl}/movies.json?orderBy="uid"&equalTo="${currentUser}"`
		}).done( (data) => {
			resolve(Object.values(data));
		});

	});
};

//need to add user value for rating on movie object using patch
fbFactory.addRatingToUserMovie =(rating, movieId)=>{
	let movieRating = {rating:`${rating}`};
	return new Promise((resolve, reject)=>{
		$.ajax({
			url:`${fbUrl}/movies/${movieId}.json`,
			type:"PATCH",
			data:JSON.stringify(movieRating)
		}).done((data)=>{
			resolve (data);
		});
	});
};

fbFactory.deleteMovie = (movieId) =>{
	console.log ("deleteMovie clicked");
	return new Promise((resolve, reject)=>{
		$.ajax({
			url:`${fbUrl}/movies/${movieId}.json`,
			type:"DELETE"
		}).done((data)=>{
			resolve(data);
		});
	});
};


module.exports = fbFactory;