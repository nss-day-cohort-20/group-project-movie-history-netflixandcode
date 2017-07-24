'use strict';

let $ = require('jquery');
let api = require('./api-getter');
let showcase = require('./showcaseMovies');

let apiCred = api.apiGet();
let castApi = api.apiCredits();

//this gets all the data.
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
        let temp = data.results;
        //limit's the amount of data returned to 12 movies
        let movieArray = [];
        let movieData = temp.slice(0,20);
        for (let i = 0; i < movieData.length; i++) {
            movieArray.push(data.results[i]);
        }
        // console.log("moviearr", movieArray);
        //call helper functions to append cast, passing in data
        let promisesArr = castPromiseMaker(movieArray);
        Promise.all(promisesArr)
        .then( (actors) => {
            // console.log("actors", actors);
            showcase.movieObjBuilder(movieArray, actors);
            resolve(movieData);
            });
        console.log("data", movieData);
        });
    });
};



//builds the promisesArr, which will contain getActors with the correct castUrl in each one.
function castPromiseMaker(movieArray) {
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
            //limit lead actors to 3
            let castData = temp.slice(0,3);
            resolve(castData);
        });
    });
}