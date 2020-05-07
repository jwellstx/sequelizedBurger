// required libraries
var path = require("path");
var express = require('express');

// Port number for heroku
const PORT = process.env.PORT || 8080;

//require our models
var db = require("./models");

// setup express app
var app = express();

// use express libraries
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// setup static directory
app.use(express.static(path.join(__dirname, "public")));

// setup handlebar configuration
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// routing files
require("./routes/burger-api-routes.js")(app);

// sync sequelize models then listen on port
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("listening on http://localhost:" + PORT );
    });
});
