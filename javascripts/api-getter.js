'use strict';

let $ = require('jquery');

module.exports.apiGet = () => {
    return {
            url: 'http://api.themoviedb.org/3/',
            mode: 'search/movie?query=',
            input: "",
            movieName: "",
            key: '&api_key=13b04ceb819ee9420a15b04b3b26bdd0'
    };
};

module.exports.apiCredits = () => {
	return {
		// url: 'https://api.themoviedb.org/3/credit/315635?api_key=13b04ceb819ee9420a15b04b3b26bdd0'
	};
};