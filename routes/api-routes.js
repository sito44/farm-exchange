const express = require("express");
const db = require("../models");
const router = express.Router();
const request = require('request');


router.get("/api/:usda_id", function (req, res) {
    const usda_id  = req.params.usda_id;
    db.market.findAll({
        where: {
            usda_id: usda_id
        } }).then(function (results) {
        if (results.length) {
            console.log(results)
            return res.json(results);
        } else {
            request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + usda_id, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                res.json(body);

                //post to database
            });
        }
    });
});


router.get("/api/zip/:zipcode", function (req, res) {
    const zipcode = req.params.zipcode;
    request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.json(body);
    });
});


module.exports = router;