const express = require('express');
const bodyParser = require('body-parser');

const db = require('./models')
const apiRoutes = require('./routes/api-routes.js');
const htmlRoutes = require('./routes/html-routes.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(apiRoutes);
// app.use(htmlRoutes);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});