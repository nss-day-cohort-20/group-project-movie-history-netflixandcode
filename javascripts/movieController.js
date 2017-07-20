'use strict';

let $ = require('jquery');
let api = require('./api-getter.js');
<<<<<<< HEAD
// let $container = $('.container');
// let templates = require('./template-builder');

// function buildMovieObj() {
//     let movieObj = {
//         title: $("#form--title").val()
//     };
//     return movieObj;
// }
=======
let showcaseMovies = require('./showcaseMovies.js');
>>>>>>> master

module.exports.activateEL = () => {
    $('#searchButton').click(function() {
        // return new Promise( (resolve, reject) => {
        console.log("clicked");
        var input = $('#movie').val();
        let apiCred = api.apiGet();
        apiCred.movieName = encodeURI(input);
        let searchURL = apiCred.url + apiCred.mode + apiCred.movieName + apiCred.key;
        console.log("searchUrl", searchURL);
        $.ajax({
            type: 'GET',
            url: searchURL,
            contentType: 'application/json'
<<<<<<< HEAD
        }).done( (movieData) => {
            console.log(movieData);
            // let movieList = templates.makeMovieList(movieData);
            // let movieForm = templates.buildMovieForm();
            // $container.html(movieData);
=======
        }).done((data) => {
            console.log("cats");
            let temp = data.results;
            let movieData = temp.slice(0,9);
            showcaseMovies.movieObjBuilder(movieData);
            console.log("movie data", movieData);

            // resolve(data);
            });
>>>>>>> master
        });
    // });
};


      
