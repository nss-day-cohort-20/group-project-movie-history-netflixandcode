'use strict';

let $ = require('jquery');
let api = require('./api-getter.js');

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
        }).done((data) => {
            console.log(data);
        });
    });
    //show watched
    //show unwatched
    //show all
};
