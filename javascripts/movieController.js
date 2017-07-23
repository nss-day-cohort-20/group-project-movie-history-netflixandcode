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

let movieController = {};

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
movieController.getMovieIds = (movies) => {
  return new Promise (function(resolve, reject) {
    let movieIds = movies.map(function(movie) {
      return movie.id;
    });
    resolve(movieIds);
  });
};

function untrackedFilter(userMoviesIds) {
  console.log(userMoviesIds);
  return new Promise (function(resolve, reject) {
    console.log('utr filter is working');
    for (var i = 0; i < userMoviesIds.length; i++) {
      if ($(`#${userMoviesIds[i]}`).hasClass('card-content')) {
      console.log("elements", $(`#${userMoviesIds[i]}`));
        $(`#${userMoviesIds[i]}`).closest('.col').remove();
      }

    }
    resolve("ok");
  });
}

movieController.filterCheck = () => {
  return new Promise (function(resolve, reject) {
  // let userMovieIds;
  fbFactory.getUserMoviesForMatching()
    .then( (userMovies) => {
      return movieController.getMovieIds(userMovies);
    })
    .then( (userMovieIds) => {
      if ($('#movie').hasClass('utr')) {
        return untrackedFilter(userMovieIds);
      }
    })
    .then( (element) => {
      console.log(element);
      resolve("done");
    });
  });
  // if ($('#movie').hasClass('utr')){

  //          // TODO: run specific filtered searches here.
  // } else if ($('#movie').hasClass('uwt') === true){


  // } else if ($('#movie').hasClass('wtc') === true){


  // } else if ($('#movie').hasClass('fav') === true){


  // } else {
  //          // alert('Error: Filter not toggled on');
  // }
};

movieController.clearDOM = () => {
    $('#container').empty();
};

module.exports = movieController;