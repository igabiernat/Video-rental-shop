module.exports = function(app, pgClient){
	
	app.get(['/getAllUsers'], (request, response) => {
		pgClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
			if (error) {
                console.log(error);
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getUserById'], (request, response) => {
        let id = parseInt(request.param("id"));

        query = {
            text: 'SELECT * FROM users WHERE id = $1',
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
	
	app.post(['/addUser'], (request, response) => {
		const first_name = request.param("first_name");
		const last_name = request.param("last_name");
		const email = request.param("email");
		const tel = request.param("tel");
		
		query = {
			text: 'INSERT INTO users (first_name, last_name, email, tel) VALUES ($1,$2,$3,$4)',
			values: [first_name,last_name,email,tel]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.delete(['/deleteUser'], (request, response) => {
		let id = parseInt(request.param("id"));
		
		query = {
			text: 'DELETE FROM users WHERE id=$1',
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
	
	app.put(['/updateUser'], (request, response) => {
		let id = parseInt(request.param("id"));
		const first_name = request.param("first_name");
		const last_name = request.param("last_name");
		const email = request.param("email");
		const tel = request.param("tel");
		
		query = {
			text: 'UPDATE users SET first_name=coalesce($2,first_name), last_name=coalesce($3,last_name), email=coalesce($4,email), tel=coalesce($5,tel) WHERE id=$1',
			values: [id,first_name,last_name,email,tel]
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