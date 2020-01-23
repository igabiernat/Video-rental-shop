module.exports = function(app, pgClient) {
	
	app.post(['/addRental'], (request, response) => {
		const date_on = request.body.date_on;
		const date_to = request.body.date_to;
		const movie_id = parseInt(request.body.movie_id);
		const user_id = parseInt(request.body.user_id);
		
		query = {
			text: 'INSERT INTO rentals (movie_id, user_id, date_on, date_to) VALUES ($1,$2,$3,$4)',
			values: [movie_id,user_id,date_on,date_to]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
				response.redirect('/getAllRentals');
            }
		})
	});
	
	app.delete(['/deleteRental/:id'], (request, response) => {
		query = {
			text: 'DELETE FROM rentals WHERE id=$1',
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
	
	app.post(['/updateRental'], (request, response) => {
		const id = request.body.id;
		const date_on = request.body.date_on;
		const date_to = request.body.date_to;
		const movie_id = request.body.movie_id;
		const user_id = request.body.user_id;
		
		query = {
			text: 'UPDATE rentals SET movie_id=coalesce(CAST($2 as INTEGER),movie_id), user_id=coalesce(CAST($3 as INTEGER),user_id), date_on=coalesce($4,date_on), date_to=coalesce($5,date_to) WHERE id=$1',
			values: [id,movie_id,user_id,date_on,date_to]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.redirect('/getAllRentals');
            }
		})
	});	
}