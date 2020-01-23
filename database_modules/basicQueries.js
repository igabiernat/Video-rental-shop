module.exports = function(directorsBase, pgClient, callback){	

	pgClient.query('SELECT r.id, m.title AS title, u.first_name AS first_name, u.last_name AS last_name, substring(cast(r.date_on AS varchar),1,10) as date_on, substring(cast(r.date_to AS varchar),1,10) as date_to FROM rentals r, movies m, users u WHERE r.movie_id = m.id AND r.user_id = u.id ORDER BY id ASC', (error, results) => {
		if (error) {
			throw err;
	  	} 
	  	else {
			directorsBase = directorsBase.push({rentals: results.rows});
			pgClient.query('SELECT * FROM genres ORDER BY id ASC', (error, results) => {
		  		if (error) {
					throw err;
		  		} 
		  		else {
				directorsBase = directorsBase.push({genres: results.rows});
				pgClient.query('SELECT * FROM directors ORDER BY id ASC', (error, results) => {
	  				if(error) {
						throw err;
	  				}
	  				else {
					directorsBase = directorsBase.push({directors: results.rows});
					pgClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
	  					if (error) {
		  					throw err;
	  					} 
	  					else {
						directorsBase = directorsBase.push({users: results.rows});
						pgClient.query('SELECT m.id, m.title, CONCAT(d.first_name, \' \', d.last_name) AS director, m.year as year, m.director_id AS director_id, m.genre_id AS genre_id, g.name AS genre FROM movies m, directors d, genres g WHERE d.id = m.director_id AND g.id = m.genre_id ORDER BY m.id ASC', (error, results) => {
							if (error) {
								throw err;
							} 
							else {
		  					directorsBase = directorsBase.push({movies: results.rows});
		  					callback(directorsBase);
							}
						});
	  					}
					});
	  				}
				});
	  			}
			});
			}
	})	    
}