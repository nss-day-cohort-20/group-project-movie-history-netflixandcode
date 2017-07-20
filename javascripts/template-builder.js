'use strict';

let $ = require('jquery'); 
let movieListTemplate = require('../templates/movieList.hbs');
let formTemp = require('../templates/form.hbs');

module.exports.makeMovieList = (movieList) => {
	console.log("movielist", movieList);
	return movieListTemplate({movies: movieList});
};

module.exports.buildMovieForm = (movie) => {
	let movieItem = {
		title: ""
	};
	let movieData = movie || movieItem;
	return formTemp(movieData);
};