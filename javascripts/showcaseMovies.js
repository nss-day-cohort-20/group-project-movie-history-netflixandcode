'use strict';

let $ = require('jquery');


module.exports.movieObjBuilder = (movieData) => {
	
		for (let i = 0; i < movieData.length; i++) {
			let movie = {};
			movie.id = movieData[i].id;
			movie.title = movieData[i].title;
			movie.year = movieData[i].release_date;
			movie.image = movieData[i].poster_path;
			movie.rating = 0;
			movie.watched = false;
			movie.actors = null;

			console.log("its working", movie);
		}

};

