$(function() {
	var wrapper = $('.wrapper');

	// wrapper.html($("#main-screen").html());
	wrapper.html($("#new-appointment").html());

	wrapper.on('click', '.new-appt-button', function() {
		wrapper.html($('#new-appointment').html());
	})


	wrapper.on('click', '.back-button', function() {
		wrapper.html($('#main-screen').html());
	})

	wrapper.on('click', '.cancel-button', function(e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#main-screen').html());
	})

	wrapper.on('click', '.submit-button', function(e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#main-screen').html());
	})

	wrapper.on('click', '.appointment-list-item', function() {
		wrapper.html($('#deats').html());
	})

	wrapper.on('click', '.edit-button', function(e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#edit-appointment').html());
	})

	$('.fa-trash-o').on('click', function () {
		$(this).closest('li').remove();
	})





})