const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyparser = require("body-parser");



app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

// put routes here
app.use(routes);



app.listen(3000, function () {
    console.log("whats up mane");
});
