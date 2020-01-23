module.exports = function(app, pgClient){

	app.post(['/addDirector'], (request, response) => {
		const first_name = request.body.first_name
		const last_name = request.body.last_name;
		
		query = {
			text: 'INSERT INTO directors (first_name, last_name) VALUES ($1,$2)',
			values: [first_name,last_name]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.redirect('/getAllDirectors');
            }
		})
	});
	
	app.delete(['/deleteDirector/:id'], (request, response) => {
		query = {
			text: 'DELETE FROM directors WHERE id=$1',
			values: [request.params.id]
		};
		
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.send(200)
            }
		})
    });
	
	app.post(['/updateDirector'], (request, response) => {
		const id = request.body.id;
		const first_name = request.body.first_name;
		const last_name = request.body.last_name;
		
		query = {
			text: 'UPDATE directors SET first_name=coalesce($2,first_name), last_name=coalesce($3,last_name) WHERE id=$1',
			values: [id, first_name, last_name]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.redirect('/getAllDirectors');
            }
		})
	});
}