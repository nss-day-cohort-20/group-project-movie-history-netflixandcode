'use strict';

// let templates = require('./template-builder'); 
let Handlebars = require('hbsfy/runtime');
let movieTemp = require('./template-builder'); 
let $ = require('jquery');
// let $container = $('#container');
// let container = document.getElementById("container");

// let movie = [];
// moviedata[i].cast = actordata[i].cast

module.exports.movieObjBuilder = (movieData, actors) => {
	// finalMovieData = [];
	console.log("movie obj actors", actors);
	// console.log("moviedata", movieData);
	for (let i = 0; i < movieData.length; i++) {
		movieData[i].rating = 0;
		movieData[i].watched = false;
		movieData[i].cast = actors.name;
	}
	console.log("did it work?", movieData);
	$("#container").html(movieTemp.makeMovieList(movieData));
}; 





		// let movieList = templates.makeMovieList(movie[i]);
		// $container.html(movieList);

		// $("#container").append(movieTemp(movie));




		// movie.id = movieData[i].id;
		// movie.title = movieData[i].title;
		// movie.year = movieData[i].release_date;
		// movie.image = movieData[i].poster_path;
		// movie.rating = 0;
		// movie.watched = false;
		// movie.actors = null;
		// console.log("its working", movie);
		// $container.innerHtml += `<div>Title: ${movieData[i].title}</div>`;
