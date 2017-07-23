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

//pass any array of movie objects, get an array of their ids back.
movieController.getMovieIds = (movies) => {
  return new Promise (function(resolve, reject) {
    let movieIds = movies.map(function(movie) {
      return movie.id;
    });
    resolve(movieIds);
  });
};

//TODO: create the logic for the rest of the filters.
//finds the user's tracked but not rated movies.
function unwatchedFilter(usersMoviesIds) {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("unwatched filter fired"));
  });
}

// matches the IDs of the user's movies with ids in the API, if rating above 0 => watched.
function watchedFilter(usersMoviesIds) {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("watched filter fired"));
  });
}

//only display the user's movies if their rating >= 9.
function favoritesFilter(usersMoviesIds) {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("favorites filter fired"));
  });
}

// matches the IDs of the user's movies with the movies in the DOM. if matched, remove it.
function untrackedFilter(userMovies) {
  return new Promise ( (resolve, reject) => {
    console.log('untracked filter fired');
    movieController.getMovieIds(userMovies)
    .then( (userMoviesIds) => {
      console.log("user movies ids", userMoviesIds);
      for (var i = 0; i < userMoviesIds.length; i++) {
        if ($(`#${userMoviesIds[i]}`).hasClass('card-content')) {
        console.log("Untracked filter: Element removed", $(`#${userMoviesIds[i]}`));
          $(`#${userMoviesIds[i]}`).closest('.col').remove();
        }
      }
    });
    resolve();
  });
}

//runs a check to see if any of the filters have been selected, and executes based on class 'flags'.
//passes the user's movies ids into a filter function.
movieController.filterCheck = () => {
  return new Promise (function(resolve, reject) {
    fbFactory.getUserMoviesForMatching()
      .then( (userMovies) => {
        if ($('#movie').hasClass('utr')) {
          return untrackedFilter(userMovies);
        } else if ($('#movie').hasClass('uwt')) {
          return unwatchedFilter(userMovies);
        } else if ($('#movie').hasClass('wtc')) {
          return watchedFilter(userMovies);
        } else if ($('#movie').hasClass('fav')) {
          return favoritesFilter(userMovies);
        } else {
          console.log("error finding class");
        }
      });
    });
};

movieController.clearDOM = () => {
    $('#container').empty();
};

module.exports = movieController;