module.exports = function(app, pgClient){
	
	app.get(['/getAllDirectors'], (request, response) => {
		pgClient.query('SELECT * FROM directors ORDER BY id ASC', (error, results) => {
			if (error) {
                console.log(error);
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getDirectorById'], (request, response) => {
        let id = parseInt(request.param("id"));

        query = {
            text: 'SELECT * FROM directors WHERE id = $1',
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
	
	app.post(['/addDirector'], (request, response) => {
		const first_name = request.param("first_name");
		const last_name = request.param("last_name");
		
		query = {
			text: 'INSERT INTO directors (first_name, last_name) VALUES ($1,$2)',
			values: [first_name,last_name]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.delete(['/deleteDirector'], (request, response) => {
		let id = parseInt(request.param("id"));
		
		query = {
			text: 'DELETE FROM directors WHERE id=$1',
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
	
	app.put(['/updateDirector'], (request, response) => {
		let id = parseInt(request.param("id"));
		const first_name = request.param("first_name");
		const last_name = request.param("last_name");
		
		query = {
			text: 'UPDATE directors SET first_name=coalesce($2,first_name), last_name=coalesce($3,last_name) WHERE id=$1',
			values: [id, first_name, last_name]
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