module.exports = function(app, pgClient) {
	
	app.get(['/getAllMovies'], (request, response) => {
		pgClient.query('SELECT * FROM movies ORDER BY id', (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getMovieById'], (request, response) => {
        let id = parseInt(request.param("id"));

        query = {
            text: 'SELECT * FROM movies WHERE id = $1',
            values: [id]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
				console.log(id);
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
        })
    });
	
	app.post(['/addMovie'], (request, response) => {
		const title = request.body.title;
		const director_id = parseInt(request.body.director_id);
		const year = parseInt(request.body.year);
		const genre_id = parseInt(request.body.genre_id);
		
		query = {
			text: 'INSERT INTO movies (title, director_id, year, genre_id) VALUES ($1,$2,$3,$4)',
			values: [title,director_id,year,genre_id]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
				console.log(request.param("director_id"));
            } else {
				response.redirect('/');
            }
		})
	});
	
	app.delete(['/deleteMovie/:id'], (request, response) => {	
		query = {
			text: 'DELETE FROM movies WHERE id=$1',
			values: [request.params.id]
		};
		
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.send(200);
            }
		})
    });
	
	app.put(['/updateMovie'], (request, response) => {
		let id = parseInt(request.param("id"));
		const title = request.param("title");
		const director_id = request.param("director_id");
		const year = request.param("year");
		const genre_id = request.param("genre_id");
		
		query = {
			text: 'UPDATE movies SET title=coalesce($2,title), director_id=coalesce(CAST($3 as INTEGER),director_id), year=coalesce(CAST($4 AS INTEGER),year), genre_id=coalesce(CAST($5 AS INTEGER),genre_id) WHERE id=$1',
			values: [id, title, director_id, year, genre_id]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getCatalogData'], (req, res) => {
        pgClient.query('SELECT m.id, m.title, CONCAT(d.first_name, \' \', d.last_name) AS director, g.name AS genre FROM movies m, directors d, genres g WHERE d.id = m.director_id AND g.id = m.genre_id ORDER BY m.id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows)
            }
        })
    });
	
	
	
	
	
	
}