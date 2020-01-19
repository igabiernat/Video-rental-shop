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
var hehe;

require('./database_modules/directors')(app, pgClient);
require('./database_modules/movies')(app, pgClient);
require('./database_modules/genres')(app, pgClient);
require('./database_modules/rentals')(app, pgClient);
require('./database_modules/users')(app, pgClient);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  pgClient.query('SELECT * FROM directors ORDER BY id ASC', (error, results) => {
      if(error){
        throw err
      }
      else{
        directorsBase = directorsBase.push({directors: results.rows});
        console.log(directorsBase);
        }
    })
	pgClient.query('SELECT m.id, m.title, CONCAT(d.first_name, \' \', d.last_name) AS director, m.director_id AS director_id, m.genre_id AS genre_id, g.name AS genre FROM movies m, directors d, genres g WHERE d.id = m.director_id AND g.id = m.genre_id ORDER BY m.id ASC', (error, results) => {
        if (error) {
            response.status(500).json(error.detail)
        } else {
            directorsBase = directorsBase.push({movies: results.rows});
		        response.render('movies', directorsBase);
        }
    });
});

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