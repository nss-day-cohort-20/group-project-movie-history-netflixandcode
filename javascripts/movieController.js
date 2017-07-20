'use strict';


let $ = require('jquery');
let api = require('./api-getter.js');
let showcaseMovies = require('./showcaseMovies.js'); 
let movieFactory = require('./movieFactory.js');

let $container = $('.container');
let templates = require('./template-builder');

// function buildMovieObj() {
//     let movieObj = {
//         title: $("#form--title").val()
//     };
//     return movieObj;
// }

// let movieArray = [];

module.exports.activateEL = () => {
    $('#searchButton').click(movieFactory.getMovies);
};


// module.exports.getMovies = () => {
//     return new Promise( (resolve, reject) => {
//         let input = $('#movie').val();
//         let apiCred = api.apiGet();
//         apiCred.movieName = encodeURI(input);
//         let searchURL = apiCred.url + apiCred.mode + apiCred.movieName + apiCred.key;
//         $.ajax({
//             type: 'GET',
//             url: searchURL,
//             contentType: 'application/json'
        
//     }).done( (data) => {
//         console.log("data", data);
//         let temp = data.results;
//         let movieData = temp.slice(0,9);
//         for (let i = 0; i < movieData.length; i++) {
//             movieArray.push(data.results[i].id);
//         }
//         // return new Promise( (resolve, reject) => {
//         let allPromises = cast();
//         Promise.all(allPromises)
//         .then( (actors) => {
//             console.log("actors", actors);
//             });
//         resolve(data);
//         });
//     });
// };

// module.exports.cast = () => {
//     let allPromises = [];
//     for(let i = 0; i < movieArray.length; i++) {
//         let castUrl = `apiCred.url + apiCred.mode + apiCred.movieName + apiCred.credits + apiCred.key;`;
//         allPromises.push(getActors(castUrl));
//     }
//     return allPromises;
// }

// module.exports.getActors = (castUrl) => {
//     return new Promise( (resolve, reject) => {
//         $.ajax({
//             type: 'GET',
//             url: castUrl
//         }).done( (creditData) => {
//             resolve(creditData);
//         });
//     });
// }










//     console.log("clicked");
//     var input = $('#movie').val();
//     console.log("searchUrl", searchURL
//     }).done((data) => {
//             showcaseMovies.movieObjBuilder(movieData);
//             console.log("movie data", movieData);
//             // resolve(data);
//         });
//     };
// };




      
