module.exports = function(app, pgClient) {

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
	
	app.post(['/updateMovie'], (request, response) => {
		const id = request.body.id;
		const title = request.body.title;
		const director_id = request.body.director_id;
		const year = request.body.year;
		const genre_id = request.body.genre_id;
		
		query = {
			text: 'UPDATE movies SET title=coalesce($2,title), director_id=coalesce(CAST($3 as INTEGER),director_id), year=coalesce(CAST($4 AS INTEGER),year), genre_id=coalesce(CAST($5 AS INTEGER),genre_id) WHERE id=$1',
			values: [id, title, director_id, year, genre_id]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail);
            } else {
                response.redirect('/');
            }
		})
	});
}