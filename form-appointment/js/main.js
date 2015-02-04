$(function() {
	var wrapper = $('.wrapper');
	var $editAppointment = $('#edit-appointment');
	var $backButton = $('.back-button');
	// var $this = $(this)
	// wrapper.html($("#main-screen").html());
	// wrapper.html($("#deats").html());


	wrapper.on('click', '.new-appt-button', function() { // making the new appt button open the new appt screen
		wrapper.html($('#new-appointment').html());
	})


	wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
		wrapper.html($('#main-screen').html());
		$blackOverlay.hide();
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


	var $blackOverlay = $('.black-overlay')
	$blackOverlay.hide();
	var $deatsWrapper = $('.deats-wrapper')
	$('.appointment-list-item').on('click', function() {
		$blackOverlay.show();
		// wrapper.html($('#deats').html());

		// $blackOverlay.css({
		// 	'visibility': 'visible'

		// })

		$deatsWrapper.css({
			'visibility': 'visible',
			'height': '60%',
			'width': '80%',
			'top': '20%',
			'right': '10%',
			'transition': '.1s'
		})
		$blackOverlay.on('click', function() {
			$blackOverlay.css({
				'visibility': 'hidden'
			})
			$deatsWrapper.css({
				'visibility': 'hidden'
			})
		});
	})


	wrapper.on('click', '.deats-edit-icon', function(e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#edit-appointment').html());
		$blackOverlay.hide();
	})

	$('.main-trash').on('click', function () {
		$(this).closest('li').remove();
	})





})
