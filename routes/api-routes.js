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





//updates the markets with user-input information about the place in matching usda_id market
router.put("/api/:usda_id/:parameter/:input", function (req, res) {
    let parameter = req.params.parameter;
    let input = req.params.input;
    let marketId= req.params.usda_id;
    let choosenParam = updateParam(parameter, input);
    console.log(choosenParam);
    db.Market.update(choosenParam, {
            where: {
                usda_id: marketId
            }
        }).then(function (results) {
            console.log(results);
            res.send('success');
        }).catch(function (err) {
            console.log('Error: ' + err.responseText)
        });
});




// gets searched market ID from USDA API and pushes the new information to the corresponding usda_id in MySQL
router.put("/api/:usda_id", function (req, res) {
    let usda_id = req.params.usda_id;
    let marketDetails;
    request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + usda_id, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        marketDetails = JSON.parse(body).marketdetails;
        res.json(marketDetails);
        console.log("THIS: " + marketDetails);
        if (marketDetails) {
            console.log(marketDetails.Products);
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
                console.log(results);
                // res.send('success');
            }).catch(function (err) {
                console.log('Error: ' + err.responseText)
            });
        }
    });
});



//this gets all markets from USDA API through a zipcode search and pushes them to MySQL if they don't already exist
router.post("/api/zip/:zipcode", function (req, res) {
    const zipcode = req.params.zipcode;
    request("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?limit=5&zip=" + zipcode, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);



        const promises = [];

        let numberCreated = 0;

        JSON.parse(body).results.forEach(element => {
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
                            resolve()
                        })

                })
            )
        });

        Promise.all(promises).then(() => res.send(`Success! ${numberCreated} markets added to the db!`))







    });
});


module.exports = router;