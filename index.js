const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const pg = require('pg');
const fs = require('fs');
const path = require('path');
const dust = require('dustjs-helpers');
const cons = require('consolidate');
const pgClient = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'video_rental_shop',
  password: 'postgres',
  port: 5432,
});

app.engine('dust',cons.dust);
app.set('view engine', 'dust');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
var directorsBase = dust.makeBase({});
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    const database = require('./database_modules/basicQueries')(directorsBase, pgClient, function(db){
        response.render('movies',db);
    });
});
app.get(['/getAllDirectors'], (request, response) => {
    const database = require('./database_modules/basicQueries')(directorsBase, pgClient, function(db){
        response.render('directors',db);
    });
});
app.get(['/getAllUsers'], (request, response) => {
    const database = require('./database_modules/basicQueries')(directorsBase, pgClient, function(db){
        response.render('users',db);
    });
});
app.get(['/getAllRentals'], (request, response) => {
    const database = require('./database_modules/basicQueries')(directorsBase, pgClient, function(db){
        response.render('rentals',db);
    });
});
app.get(['/getAllGenres'], (request, response) => {
    const database = require('./database_modules/basicQueries')(directorsBase, pgClient, function(db){
        response.render('genres',db);
    });
});

require('./database_modules/directors')(app, pgClient);
require('./database_modules/movies')(app, pgClient);
require('./database_modules/genres')(app, pgClient);
require('./database_modules/rentals')(app, pgClient);
require('./database_modules/users')(app, pgClient);



app.listen(port, () => {
	pgClient.connect(err => {
        if (err) {
            console.error('Failed on connect to database', err.stack)
        } else {
            console.log('Postgres client connected to database')
        }
    });
    pgClient.query('SET datestyle TO dmy', (error, results) => {
        if (error) {
            console.log(error);
        }
    });
  console.log(`App running on port ${port}.`)
})