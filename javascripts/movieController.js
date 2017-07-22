'use strict';


let $ = require('jquery');
let api = require('./api-getter.js');
let showcaseMovies = require('./showcaseMovies.js');
let movieFactory = require('./movieFactory.js');
let $container = $('.container');
let templates = require('./template-builder');
let fbFactory = require('./fbMovieFactory.js');
let searchBtn = $('#searchButton');
let movieSearch = $('#movie');

// module.exports.getAPIMovieIds = () => {
//   return new Promise( function(resolve, reject) {
//     let moviesIds;
//     movieFactory.getMovies()
//     .then( (movies) => {
//       moviesIds = movies.map(function(movie) {
//         return movie.id;
//       });
//       console.log("movie Ids", moviesIds);
//       resolve(moviesIds);
//       });
//   });
// };

//takes an array of movie objects
function getMovieIds(movies) {
  let movieIds = movies.map(function(movie) {
    return movie.id;
  });
  return movieIds;
}

module.exports.filterCheck = () => {
  fbFactory.getUserMoviesForMatching()
  .then( (userMovies) => {
    let userMovieIds = getMovieIds(userMovies);
    console.log("user movie Ids", userMovieIds);
  });
  if ($('#movie').hasClass('utr')){

           // TODO: run specific filtered searches here.
  } else if ($('#movie').hasClass('uwt') === true){


  } else if ($('#movie').hasClass('wtc') === true){


  } else if ($('#movie').hasClass('fav') === true){


  } else {
           // alert('Error: Filter not toggled on');
  }
};

module.exports.clearDOM = () => {
    $('#container').empty();
};