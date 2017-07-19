'use strict';

let $ = require('jquery');
let showcaseMovies = require('./showcaseMovies.js');
let movieFactory = require('./movieFactory.js');

module.exports.activateEL = () => {
    $('#searchButton').click(function() {
        let p1 = movieFactory.getMovies();
        // let p2 = movieFactory.getActors();

        Promise.all([p1]).then(movieData => {
            console.log("promise all", movieData);
            showcaseMovies.movieObjBuilder(movieData);
        });
        

    });


};



      
