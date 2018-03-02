const express = require("express");

const router = express.Router();

const request = require('request');


router.get("/api/:foreignKey", function (req, res) {
    const foreignKey = req.params.foreignKey;
    Market.findAll({
        where: {
            foreignKey: foreignKey
        } }).then(function (results) {
        if (results) {
            res.json(results);
        } else {
            request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + foreignKey, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                res.json(body);
            });
        }
    });
});


router.get("/api/:zipcode", function (req, res) {
    request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.json(body);
    });
});
