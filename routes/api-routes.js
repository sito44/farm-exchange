const express = require("express");
const db = require("../models");
const router = express.Router();
const request = require('request');


// switch statement for each parameter that is updated by the user
function updateParam(parameter, input) {
    let paramObject;
    switch (parameter) {
        case 'ATM':
            paramObject = {
                ATM: input
            };
            
            break;
        case 'restroom':
            paramObject = {
                restroom: input
            };
            
            break;
        case 'petFriendly':
            paramObject = {
                petFriendly: input
            };
            
            break;
        case 'outdoors':
            paramObject = {
                outdoors: input
            };
            
            break;
        case 'alcohol':
            paramObject = {
                alcohol: input
            };
            break;
        default:
            console.log('bad');
    }
    return paramObject;

}

//Get all columns from one row/market ------
router.get("/api/market-data/:usda_id", function (req, res) {
    db.Market.findById(req.params.usda_id).then(results => {
        res.json(results);
    }).catch(function (err) {
        console.log('Error: ' + err.responseText)
    });
});


//updates the markets with user-input information about the place in matching usda_id market
router.put("/api/:usda_id/:parameter/:input", function (req, res) {
    let parameter = req.params.parameter;
    let input = req.params.input;
    let marketId= req.params.usda_id;
    let choosenParam = updateParam(parameter, input);
    db.Market.update(choosenParam, {
            where: {
                usda_id: marketId
            }
        }).then(function (results) {
            res.send('success');
        }).catch(function (err) {
            console.log('Error: ' + err.responseText)
        });
});




// gets searched market ID from USDA API and pushes the new information to the corresponding usda_id in MySQL
router.get("/api/:usda_id", function (req, res) {
    let usda_id = req.params.usda_id;
    let marketDetails;
    request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + usda_id, function (error, response, body) {
        if(error){throw error;}
        marketDetails = JSON.parse(body).marketdetails;
        if (marketDetails) {
            
            db.Market.update({
                Address: marketDetails.Address,
                GoogleLink: marketDetails.GoogleLink,
                Products: marketDetails.Products,
                Schedule: marketDetails.Schedule
            }, {
                where: {
                    usda_id: usda_id
                }
            }).then(function (results) {
                console.log('successful update!!!!');
                res.json(marketDetails);
                // res.send('success');
            }).catch(function (err) {
                console.log(err);
                console.log('Error: ' + err.responseText)
            });
        }
    });
});



//this gets all markets from USDA API through a zipcode search and pushes them to MySQL if they don't already exist
router.get("/api/zip/:zipcode", function (req, res) {
    const zipcode = req.params.zipcode;
    request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?limit=5&zip=" + zipcode, function (error, response, body) {
        if(error) {throw error;}
        console.log('statusCode:', response && response.statusCode);
        
        let queryCheck = JSON.parse(body).results[0].id;
        const apiQuery = JSON.parse(body);
        
        if(queryCheck === 'Error'){return};

        const promises = [];

        let numberCreated = 0;

        apiQuery.results.forEach(element => {
            promises.push(
                new Promise(function (resolve, reject) {

                    db.Market
                        .findOrCreate({
                            where: {
                                usda_id: element.id
                            },
                            defaults: {
                                ...element
                            }
                        })
                        .spread((market, created) => {
                            console.log(market.get({
                                plain: true
                            }))
                            if (created) {
                                numberCreated += 1;
                            }
                            resolve();
                        });
                })
            );
        });

        Promise.all(promises).then(() => {
            console.log(`Success! ${numberCreated} markets added to the db!`);
            res.send(apiQuery);
    
    });

    });
});


module.exports = router;