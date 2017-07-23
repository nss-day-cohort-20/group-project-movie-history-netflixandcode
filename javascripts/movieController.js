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

function unwatchedFilter(user) {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("unwatched Filter"));
  });
}

// matches the IDs of the user's movies with ids in the API
function watchedFilter() {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("watched Filter"));
  });
}

function favoritesFilter() {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("favorites Filter"));
  });
}

// matches the IDs of the user's movies with the movies in the DOM. if matched, remove it.
function untrackedFilter(userMoviesIds) {
  return new Promise ( (resolve, reject) => {
    console.log('utr filter is working');
    for (var i = 0; i < userMoviesIds.length; i++) {
      if ($(`#${userMoviesIds[i]}`).hasClass('card-content')) {
      console.log("elements", $(`#${userMoviesIds[i]}`));
        $(`#${userMoviesIds[i]}`).closest('.col').remove();
      }
    }
    resolve();
  });
}


movieController.filterCheck = () => {
  return new Promise (function(resolve, reject) {
    fbFactory.getUserMoviesForMatching()
      .then( (userMovies) => {
        return movieController.getMovieIds(userMovies);
      })
      .then( (userMovieIds) => {
        if ($('#movie').hasClass('utr')) {
          return untrackedFilter(userMovieIds);
        } else if ($('#movie').hasClass('uwt')) {
          return unwatchedFilter(userMovieIds);
        } else if ($('#movie').hasClass('wtc')) {
          return watchedFilter(userMovieIds);
        } else if ($('#movie').hasClass('fav')) {
          return favoritesFilter(userMovieIds);
        } else {
          console.log("error finding class");
        }
      })
      .then( (element) => {
        resolve("filters have been checked", element);
      });
    });
};
  // if ($('#movie').hasClass('utr')){

  //          // TODO: run specific filtered searches here.
  // } else if ($('#movie').hasClass('uwt') === true){


  // } else if ($('#movie').hasClass('wtc') === true){


  // } else if ($('#movie').hasClass('fav') === true){


  // } else {
  //          // alert('Error: Filter not toggled on');
  // }

movieController.clearDOM = () => {
    $('#container').empty();
};

module.exports = movieController;