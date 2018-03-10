// ========================================================
// Foreign Dependencies
// ========================================================
const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');

// ========================================================
// Local Dependencies
// ========================================================
const db = require('./models')
const apiRoutes = require('./routes/api-routes.js');
const htmlRoutes = require('./routes/html-routes.js');

// ========================================================
// Initialize Express and run on 8080 or local environment
// ========================================================
const app = express();
const PORT = process.env.PORT || 8080;

// ========================================================
// Use express to parse the body and relevant JSONs
// ========================================================
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ========================================================
// Set up express to read the public folder
// ========================================================
app.use(express.static('public'));

// ========================================================
// Use express to path through the routes needed
// ========================================================
app.use(apiRoutes); 
app.use(htmlRoutes);

// ========================================================
// Sync app with the database and run the app on the server
// ========================================================
db.sequelize.sync({}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});