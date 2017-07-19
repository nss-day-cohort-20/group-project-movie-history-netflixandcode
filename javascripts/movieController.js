'use strict';

let $ = require('jquery');
let api = require('./api-getter.js');
let showcaseMovies = require('./showcaseMovies.js');

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
        }).done((data) => {
            console.log("cats");
            let temp = data.results;
            let movieData = temp.slice(0,9);
            showcaseMovies.movieObjBuilder(movieData);
            console.log("movie data", movieData);

            // resolve(data);
            });
        });
    // });
};


      
