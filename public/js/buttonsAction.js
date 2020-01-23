$(document).ready(function(){
	$("button.btn.deleteMovie").click(function(){
		var id = $(this).data("id");
		var url = 'http://localhost:3000/deleteMovie/'+id;
		if(confirm('Usunąć ten film?')){
			$.ajax({
				url: url,
				method: 'DELETE',
				success: function(result){
					console.log('Film usunięty');
					window.location.href='/';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
	$("button.btn.deleteDirector").click(function(){
		var id = $(this).data("id");
		var url = 'http://localhost:3000/deleteDirector/'+id;
		if(confirm('Usunąć tego reżysera?')){
			$.ajax({
				url: url,
				method: 'DELETE',
				success: function(result){
					console.log('Reżyser usunięty');
					window.location.href='/getAllDirectors';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});$("button.btn.deleteUser").click(function(){
		var id = $(this).data("id");
		var url = 'http://localhost:3000/deleteUser/'+id;
		if(confirm('Usunąć tego użytkownika?')){
			$.ajax({
				url: url,
				method: 'DELETE',
				success: function(result){
					console.log('Użytkownik usunięty');
					window.location.href='/getAllUsers';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
	$("button.btn.deleteRental").click(function(){
		var id = $(this).data("id");
		var url = 'http://localhost:3000/deleteRental/'+id;
		if(confirm('Usunąć to wypożyczenie?')){
			$.ajax({
				url: url,
				method: 'DELETE',
				success: function(result){
					console.log('Wypożyczenie usunięte');
					window.location.href='/getAllRentals';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
	$("button.btn.deleteGenre").click(function(){
		var id = $(this).data("id");
		var url = 'http://localhost:3000/deleteGenre/'+id;
		if(confirm('Usunąć ten gatunek?')){
			$.ajax({
				url: url,
				method: 'DELETE',
				success: function(result){
					console.log('Gatunek usunięty');
					window.location.href='/getAllGenres';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});

	$("button.btn.updateMovie").click(function(){
		$("#edit-movie-form-title").val($(this).data("title"));
		$("#edit-movie-form-year").val($(this).data("year"));
		$("#edit-movie-form-id").val($(this).data("id"));
		$("#edit-movie-form-director_id").val($(this).data("director_id"));
		$("#edit-movie-form-genre_id").val($(this).data("genre_id"));
	});


	$("button.btn.updateGenre").click(function(){
		$("#edit-genre-form-name").val($(this).data("name"));
		$("#edit-genre-form-id").val($(this).data("id"));
	});

	$("button.btn.updateDirector").click(function(){
		$("#edit-director-form-first_name").val($(this).data("first_name"));
		$("#edit-director-form-id").val($(this).data("id"));
		$("#edit-director-form-last_name").val($(this).data("last_name"));
	});

	$("button.btn.updateUser").click(function(){
		$("#edit-user-form-first_name").val($(this).data("first_name"));
		$("#edit-user-form-id").val($(this).data("id"));
		$("#edit-user-form-last_name").val($(this).data("last_name"));
		$("#edit-user-form-email").val($(this).data("email"));
		$("#edit-user-form-tel").val($(this).data("tel"));
	});

	$("button.btn.updateRental").click(function(){
		$("#edit-rental-form-id").val($(this).data("id"));
		$("#edit-rental-form-user_id").val($(this).data("user_id"));
		$("#edit-rental-form-movie_id").val($(this).data("movie_id"));
		$("#edit-date_onPicker").val($(this).data("date_on"));
		$("#edit-date_toPicker").val($(this).data("date_to"));
	});
});
