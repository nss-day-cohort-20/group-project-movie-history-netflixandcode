'use strict';


let $ = require('jquery');
let api = require('./api-getter.js');
let showcaseMovies = require('./showcaseMovies.js');
let movieFactory = require('./movieFactory.js');
let $container = $('.container');
let templates = require('./template-builder');

let searchBtn = $('#searchButton');
let movieSearch = $('#movie');
// function buildMovieObj() {
//     let movieObj = {
//         title: $("#form--title").val()
//     };
//     return movieObj;
// }


module.exports.activateEL = () => {
    // $('#searchButton').click(movieFactory.getMovies);
        searchBtn.click(movieFactory.getMovies);
    $('.untracked').click(() =>{
       clearFilter();
       movieSearch.addClass('utr');
       });//toggle untracked
    $('.unwatched').click(() =>{
       clearFilter();
       movieSearch.addClass('uwt');
       });//toggle unwatched
    $('.watched').click(() =>{
       clearFilter();
       movieSearch.addClass('wtc');
       });//toggle watched
    $('.favorites').click(() =>{
       clearFilter();
       movieSearch.addClass('fav');
       });//toggle favorites
    $('.addTracked').click(() =>{
//run addtracked TODO: addtracked functionality
    });
};

movieSearch.keypress((event) =>{
   if (event.keyCode === 13){
           clearDOM();
           movieFactory.getMovies();//this shouldn't be in the final version, just here for testing.
       if (movieSearch.hasClass('utr') === true){

           // TODO: run specific filtered searches here.
       } else if (movieSearch.hasClass('uwt') === true){


       } else if (movieSearch.hasClass('wtc') === true){


       } else if (movieSearch.hasClass('fav') === true){


       } else {
           // alert('Error: Filter not toggled on');
       }
   }
});

module.exports.getMovieIds = () => {
  return new Promise( function(resolve, reject) {
    let moviesIds;
    movieFactory.getMovies()
    .then( (movies) => {
      moviesIds = movies.map(function(movie) {
        return movie.id;
      });
      console.log("movie Ids", moviesIds);
      resolve(moviesIds);
    });
      });
};

function clearDOM(){
    $('#container').empty();
}

function clearFilter(){
    movieSearch.removeClass('utr uwt wtc fav');
}


