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

function hideByIds(idsOfMoviesToHide) {
  for (var i = 0; i < idsOfMoviesToHide.length; i++) {
    if ($(`#${idsOfMoviesToHide[i]}`).hasClass('card-content')) {
      console.log("ID Hider => Element hidden:", $(`#${idsOfMoviesToHide[i]}`));
      $(`#${idsOfMoviesToHide[i]}`).closest('.col').addClass('isHidden');
    }
  }
}

//TODO: create the logic for the rest of the filters.
//looks at the user's watched movies (rating > 0), hides them from search results.
function unwatchedFilter(userMovies) {
  return new Promise ( (resolve, reject) => {
    console.log(userMovies);
    let watchedMovies = userMovies.filter( (movie) => {
      return movie.rating > 0;
    });
    movieController.getMovieIds(watchedMovies)
    .then( (idsOfWatchedMovies) => {
    console.log("ids of watched movies", idsOfWatchedMovies);
    hideByIds(idsOfWatchedMovies);
    });
  resolve(console.log("unwatched filter fired"));
  });
}

// matches the IDs of the user's movies with ids in the API, if rating above 0 => watched.
function watchedFilter(userMovies) {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("watched filter fired"));
  });
}

//only display the user's movies if their rating >= 9.
function favoritesFilter(userMovies) {
  return new Promise ( (resolve, reject) => {

  resolve(console.log("favorites filter fired"));
  });
}

// matches the IDs of the user's movies with the movies in the DOM. if matched, hide it.
function untrackedFilter(userMovies) {
  return new Promise ( (resolve, reject) => {
    console.log('untracked filter fired');
    movieController.getMovieIds(userMovies)
    .then( (userMoviesIds) => {
      console.log("user movies ids", userMoviesIds);
      hideByIds(userMoviesIds);
      // for (var i = 0; i < userMoviesIds.length; i++) {
      //   if ($(`#${userMoviesIds[i]}`).hasClass('card-content')) {
      //   console.log("Untracked filter: Element removed", $(`#${userMoviesIds[i]}`));
      //     $(`#${userMoviesIds[i]}`).closest('.col').addClass('isHidden');
      //   }
      // }
    });
    resolve();
  });
}

//runs a check to see if any of the filters have been selected, and executes based on class 'flags'.
//passes the user's movies ids into a filter function.
movieController.filterCheck = () => {
  return new Promise (function(resolve, reject) {
    $('.isHidden').removeClass("isHidden");
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