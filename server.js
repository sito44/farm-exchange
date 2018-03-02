const express = require('express');
const bodyParser = require('body-parser');
const mO = require('method-override');

const apiRoutes = require('./routes/api-routes.js');
const htmlRoutes = require('./routes/html-routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function () {
    console.log('listening on port', PORT);
});