$(document).ready(function(){
	$("button.btn.deleteMovie").click(function(){
		var id = $(this).data("id");
		var url = 'http://localhost:3000/deleteMovie/'+id;
		if(confirm('Usunąć ten film?')){
			$.ajax({
				url: url,
				type: 'DELETE',
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
});
