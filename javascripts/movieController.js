'use strict';

let $ = require('jquery');
let api = require('./api-getter.js');
// let $container = $('.container');
// let templates = require('./template-builder');

// function buildMovieObj() {
//     let movieObj = {
//         title: $("#form--title").val()
//     };
//     return movieObj;
// }

module.exports.activateEL = () => {
    $('#searchButton').click(function() {
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
        }).done( (movieData) => {
            console.log(movieData);
            // let movieList = templates.makeMovieList(movieData);
            // let movieForm = templates.buildMovieForm();
            // $container.html(movieData);
        });
    });
    //show watched
    //show unwatched
    //show all
};
