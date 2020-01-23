module.exports = function(app, pgClient){
	
	app.post(['/addGenre'], (request, response) => {
		const name = request.body.name;
		
		query = {
			text: 'INSERT INTO genres (name) VALUES ($1)',
			values: [name]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                alert('Wypełnij wszystkie pola');
            } else {
				response.redirect('/getAllGenres');
            }
		})
	});
	
	app.delete(['/deleteGenre/:id'], (request, response) => {
		let id = parseInt(request.param("id"));
		
		query = {
			text: 'DELETE FROM genres WHERE id=$1',
			values: [id]
		};
		
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.send(200)
            }
		})
    });
	
	app.post(['/updateGenre'], (request, response) => {
		const id = request.body.id;
		const name = request.body.name;
		
		query = {
			text: 'UPDATE genres SET name=coalesce($2,name) WHERE id=$1',
			values: [id, name]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.redirect('/getAllGenres');
            }
		})
	});
}