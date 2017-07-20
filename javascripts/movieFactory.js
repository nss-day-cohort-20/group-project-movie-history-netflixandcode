'use strict';

let $ = require('jquery');
let api = require('./api-getter');
let showcase = require('./showcaseMovies');

let movieArray = [];
let apiCred = api.apiGet();
let castApi = api.apiCredits();

module.exports.getMovies = () => {
    return new Promise( (resolve, reject) => {
        let input = $('#movie').val();
        apiCred.movieName = encodeURI(input);
        let searchURL = apiCred.url + apiCred.mode + apiCred.movieName + apiCred.key;
        // console.log("searchurl", searchURL);
        $.ajax({
            type: 'GET',
            url: searchURL,
            contentType: 'application/json'
        }).done( (data) => {
            console.log("data", data);
            let temp = data.results;
            let movieData = temp.slice(0,9);
            for (let i = 0; i < movieData.length; i++) {
                movieArray.push(data.results[i]);
        }
        // showcase.movieObjBuilder(movieArray);
        // console.log("moviearr", movieArray);
        // return new Promise( (resolve, reject) => {

        let promisesArr = castPromiseMaker();
        Promise.all(promisesArr)
        .then( (actors) => {
            // console.log("actors", actors);
            showcase.movieObjBuilder(movieArray, actors);
            });
        resolve(data);
        });
    });
};

//builds the promisesArr, which will contain getActors with the correct castUrl in each one.
function castPromiseMaker() {
    let promisesArr = [];
    for(let i = 0; i < movieArray.length; i++) {
        let id = movieArray[i].id;
        let castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiCred.key}`;
        // (console.log("casturl", castUrl));
        promisesArr.push(getActors(castUrl));
    }
    return promisesArr;
}

function getActors(castUrl) {
    return new Promise( (resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: castUrl
        }).done( (creditData) => {
            let temp = creditData.cast;
            let castData = temp.slice(0,3);
            resolve(castData);
        });
    });
}