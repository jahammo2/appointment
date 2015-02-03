$(function() {
	var wrapper = $('.wrapper'); // identifying the main display element in a variable
	var apptStore = ObjectStore(); // instancing an an object store to manage our appts

	wrapper.html($("#main-screen").html()); // setting the default display to the main screen

	wrapper.on('click', '.new-appt-button', function() { // making the new appt button open the new appt screen
		wrapper.html($('#new-appointment').html());
	})


	wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
		wrapper.html($('#main-screen').html());
	})

	wrapper.on('click', '.cancel-button', function(e) { // makes cancel button (new/edit screens) return user to main
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#main-screen').html());
	})

	wrapper.on('click', '.submit-button', function(e) { // makes submit button create appt and return user to main screen
		e.stopPropagation();
		e.preventDefault();
		createAppt();
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
