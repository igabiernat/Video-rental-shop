module.exports = function(app, pgClient){

	app.post(['/addUser'], (request, response) => {
		const first_name = request.body.first_name;
		const last_name = request.body.last_name;
		const email = request.body.email;
		const tel = request.body.tel;
		
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
	
	app.delete(['/deleteUser/:id'], (request, response) => {
		query = {
			text: 'DELETE FROM users WHERE id=$1',
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
	
	app.post(['/updateUser'], (request, response) => {
		const id = request.body.id
		const first_name = request.body.first_name;
		const last_name = request.body.last_name;
		const email = request.body.email;
		const tel = request.body.tel;
		
		query = {
			text: 'UPDATE users SET first_name=coalesce($2,first_name), last_name=coalesce($3,last_name), email=coalesce($4,email), tel=coalesce($5,tel) WHERE id=$1',
			values: [id,first_name,last_name,email,tel]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.redirect('/getAllUsers');
            }
		})
	});
}