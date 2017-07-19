'use strict';

let $ = require('jquery');
let api = require('./api-getter.js');

module.exports.getMovies = () => {
	return new Promise( (resolve, reject) => {
        var input = $('#movie').val();
        let apiCred = api.apiGet();
        apiCred.movieName = encodeURI(input);
        let searchURL = apiCred.url + apiCred.mode + apiCred.movieName + apiCred.key;
        $.ajax({
            type: 'GET',
            url: searchURL,
            contentType: 'application/json'
        }).done((data) => {
            console.log(data);
            let temp = data.results;
            let movieData = temp.slice(0,9);
            resolve(movieData);
            });
        });
};

module.exports.getActors = () => {
	return new Promise ( (resolve, reject) => {
		let apiActors = api.apiCredits();
		$.ajax({
			type:'GET',
			url: apiActors.url
		}).done((data) => {
			console.log(data);
			resolve(data);
		});
	});
};