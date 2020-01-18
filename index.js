const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const pg = require('pg');
const pgClient = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'video_rental_shop',
  password: 'postgres',
  port: 5432,
});

app.use(bodyParser.json());

require('./database_modules/directors')(app, pgClient);
require('./database_modules/movies')(app, pgClient);
require('./database_modules/genres')(app, pgClient);
require('./database_modules/rentals')(app, pgClient);
require('./database_modules/users')(app, pgClient);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

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