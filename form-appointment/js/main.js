$(function() {
<<<<<<< HEAD
	var wrapper = $('.wrapper'); // identifying the main display element in a variable
	var screenManager = ScreenManager(wrapper);
	var apptStore = ObjectStore(); // instancing an an object store to manage our appts

=======
	var wrapper = $('.wrapper');
	var $editAppointment = $('#edit-appointment');
	var $backButton = $('.back-button');
	// var $this = $(this)
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
	// wrapper.html($("#main-screen").html());
	// wrapper.html($("#deats").html());



	wrapper.on('click', '.new-appt-button', function() { // making the new appt button open the new appt screen
		screenManager.displayNew();
	})

	wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
<<<<<<< HEAD
		screenManager.displayMain(apptStore);
=======
		wrapper.html($('#main-screen').html());
		$blackOverlay.hide();
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
	})

	wrapper.on('click', '.cancel-button', function(e) { // makes cancel button (new/edit screens) return user to main
		e.stopPropagation();
		e.preventDefault();
		screenManager.displayMain(apptStore);
	})

	wrapper.on('click', '.submit-button', function(e) { // makes submit button create appt and return user to main screen
		e.stopPropagation();
		e.preventDefault();
		apptStore.add(createNewAppt());
		screenManager.displayMain(apptStore);
	})

<<<<<<< HEAD
	wrapper.on('click', '.appointment-list-item', function() {
		screenManager.displayDeats('appt');
=======

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
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
	})


	wrapper.on('click', '.deats-edit-icon', function(e) {
		e.stopPropagation();
		e.preventDefault();
<<<<<<< HEAD
		screenManager.displayEdit('appt');
=======
		wrapper.html($('#edit-appointment').html());
		$blackOverlay.hide();
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
	})

	$('.main-trash').on('click', function () {
		$(this).closest('li').remove();
	})

	function newApptId() {
		function series() {
			return Math.floor((1 + Math.random()) * 10000).toString(16);
		}

		return series() + '-' + series() + '-' + series() + '-' + series();
	}

	function createNewAppt() {
		return Appointment({ title: $('.appt-name-input').val(),
													date: new Date(),
													street: $('.appt-street-input').val(),
													city: $('.city-title-input').val(),
													state: $('.state-choice').val(),
													apptId: newApptId(),
		})
	}

})
