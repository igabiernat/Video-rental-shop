module.exports = function(app, pgClient) {
	
	app.get(['/getAllRentals'], (request, response) => {
		pgClient.query('SELECT * FROM rentals ORDER BY id', (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getRentalById'], (request, response) => {
        let id = parseInt(request.param("id"));

        query = {
            text: 'SELECT * FROM rentals WHERE id = $1',
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
	
	app.post(['/addRental'], (request, response) => {
		const date_on = request.param("date_on");
		const date_to = request.param("date_to");
		const movie_id = parseInt(request.param("movie_id"));
		const user_id = parseInt(request.param("user_id"));
		
		query = {
			text: 'INSERT INTO rentals (movie_id, user_id, date_on, date_to) VALUES ($1,$2,$3,$4)',
			values: [movie_id,user_id,date_on,date_to]
		}
		pgClient.query(query, (error, results) => {
			if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.delete(['/deleteRental'], (request, response) => {
		let id = parseInt(request.param("id"));
		
		query = {
			text: 'DELETE FROM rentals WHERE id=$1',
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
	
	app.put(['/updateRental'], (request, response) => {
		let id = parseInt(request.param("id"));
		const date_on = request.param("date_on");
		const date_to = request.param("date_to");
		const movie_id = (request.param("movie_id"));
		const user_id = (request.param("user_id"));
		
		query = {
			text: 'UPDATE rentals SET movie_id=coalesce(CAST($2 as INTEGER),movie_id), user_id=coalesce(CAST($3 as INTEGER),user_id), date_on=coalesce($4,date_on), date_to=coalesce($5,date_to) WHERE id=$1',
			values: [id,movie_id,user_id,date_on,date_to]
		}
		pgClient.query(query, (error, results) => {
            if (error) {
                response.status(500).json(error.detail)
            } else {
                response.status(200).json(results.rows)
            }
		})
	});
	
	app.get(['/getAllRentalsInfo'], (req, res) => {
        pgClient.query('SELECT r.id, m.title AS movie_title, CONCAT(u.first_name, \' \', u.last_name) AS user_name, r.date_on, r.date_to FROM rentals r, movies m, users u WHERE r.movie_id = m.id AND r.user_id = u.id ORDER BY id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows)
            }
        })
    });
	
	
	
	
	
	
}