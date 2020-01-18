module.exports = function(app, pgClient){
	
	app.get(['/getAllGenres'], (request, response) => {
		pgClient.query('SELECT * FROM genres ORDER BY id ASC', (error, results) => {
			if (error) {
                console.log(error);
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getGenreById'], (request, response) => {
        let id = parseInt(request.param("id"));

        query = {
            text: 'SELECT * FROM genres WHERE id = $1',
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
	
	app.post(['/addGenre'], (request, response) => {
		const name = request.param("name");
		
		query = {
			text: 'INSERT INTO genres (name) VALUES ($1)',
			values: [name]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.delete(['/deleteGenre'], (request, response) => {
		let id = parseInt(request.param("id"));
		
		query = {
			text: 'DELETE FROM genres WHERE id=$1',
			values: [id]
		};
		
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
    });
	
	app.put(['/updateGenre'], (request, response) => {
		let id = parseInt(request.param("id"));
		const name = request.param("name");
		
		query = {
			text: 'UPDATE genres SET name=$2 WHERE id=$1',
			values: [id, name]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
}