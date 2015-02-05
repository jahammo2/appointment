$(function() {
<<<<<<< HEAD
	var wrapper = $('.wrapper'); // identifying the main display element in a variable
	var screenManager = ScreenManager(wrapper);
	var apptStore = ObjectStore(); // instancing an an object store to manage our appts

=======
	var wrapper = $('.wrapper');
	var $editAppointment = $('#edit-appointment');
	var $backButton = $('.back-button');
	var $body = $('body');
	// var $this = $(this)
<<<<<<< HEAD
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
	// wrapper.html($("#main-screen").html());
=======
	wrapper.html($("#new-appointment").html());
>>>>>>> a87e8cc873efad6062d1ac5662884eff0c39929e
	// wrapper.html($("#deats").html());



	wrapper.on('click', '.new-appt-button', function() { // making the new appt button open the new appt screen
		screenManager.displayNew();
	})

	wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
<<<<<<< HEAD
		screenManager.displayMain(apptStore);
=======
		wrapper.html($('#main-screen').html());
<<<<<<< HEAD
		$blackOverlay.hide();
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
=======
		// $blackOverlay.css({
		// 	'visibility': 'hidden'
		// })
		// $deatsWrapper.css({
		// 	'visibility': 'hidden',
		// 	'height': '15%',
		// 	'width': '20%',
		// 	'top': '30%',
		// 	'right': '38%',				
		// 	'transition': '.1s'
		// })	
	})

	$('.back-button').on('click', function () {
		wrapper.html($('#new-appointment').html());

		$blackOverlay.css({
			'visibility': 'hidden'
		})

		$deatsWrapper.css({
			'visibility': 'hidden',
			'height': '30%',
			'width': '15%',
			'top': '40%',
			'right': '43%',				
			'transition': '0s'
		})

		$deatsDiv.css({
			'height': '30%',
			'transition': '0s'
		})

>>>>>>> a87e8cc873efad6062d1ac5662884eff0c39929e
	})

	wrapper.on('click', '.cancel-button', function(e) { // makes cancel button (new/edit screens) return user to main
		e.stopPropagation();
		e.preventDefault();
		screenManager.displayMain(apptStore);
	})

	wrapper.on('click', '.submit-button', function(e) { // makes submit button create appt and return user to main screen
		e.stopPropagation();
		e.preventDefault();
<<<<<<< HEAD
		apptStore.add(createNewAppt());
		screenManager.displayMain(apptStore);
	})

<<<<<<< HEAD
	wrapper.on('click', '.appointment-list-item', function() {
		screenManager.displayDeats('appt');
=======

=======
<<<<<<< HEAD
		createAppt();
=======

		var dateLabel = $('.appt-date-label-input');
		var dateLabelValue = dateLabel.val();
		var newDate = moment(dateLabelValue, ['M/D/YY', 'MM/D/YY', 'MM/DD/YY','M/D/YYYY', 
			'MM/D/YYYY', 'MM/DD/YYYY']);			
		var newFormattedFullDate = newDate.format('MMMM D')
		var newDateFromNow = newDate.fromNow()
		dateLabel.val(newFormattedFullDate);
		console.log(newDateFromNow);
		$('.deats-date-time-span').html(newDateFromNow + ' on');
		$('.deats-full-date-time-span').html(newFormattedFullDate);
		var dateInMs = newDate.format('x')

>>>>>>> styles
		wrapper.html($('#main-screen').html());
	})

>>>>>>> a87e8cc873efad6062d1ac5662884eff0c39929e
	var $blackOverlay = $('.black-overlay')
	var $deatsWrapper = $('.deats-wrapper')
	var $deatsDiv = $('.deats-div')

	// $blackOverlay.hide();
	// $deatsWrapper.hide();

	wrapper.on('click', '.appointment-list-item', function() {
		// $blackOverlay.show();
		// $deatsWrapper.show();
		// wrapper.html($('#deats').html());
<<<<<<< HEAD

		// $blackOverlay.css({
		// 	'visibility': 'visible'

		// })

=======
		
		$blackOverlay.css({
			'visibility': 'visible'

		})

>>>>>>> styles
		$deatsWrapper.css({
			'visibility': 'visible',
			'height': '59%',
			'width': '30%',
			'top': '30%',
			'right': '35%',
			'transition': '.1s'
		})

		$deatsDiv.css({
			'height': '70%',
			'transition': '.1s'
		})		

		$blackOverlay.on('click', function() {

			$blackOverlay.css({
				'visibility': 'hidden'
			})

			$deatsWrapper.css({
				'visibility': 'hidden',
				'height': '30%',
				'width': '15%',
				'top': '40%',
				'right': '43%',				
				'transition': '.1s'
			})

			$deatsDiv.css({
				'height': '30%',
				'transition': '0s'
			})
			// $blackOverlay.hide();
			// $deatsWrapper.hide();		
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
<<<<<<< HEAD
		$blackOverlay.hide();
>>>>>>> 3e2fbb61ed0091b92dd33e50fd949f49a8b74087
=======
		$blackOverlay.css({
			'visibility': 'hidden'
		})
		$deatsWrapper.css({
			'visibility': 'hidden',
			'height': '15%',
			'width': '20%',
			'top': '30%',
			'right': '38%',				
			'transition': '.1s'
		})	
>>>>>>> a87e8cc873efad6062d1ac5662884eff0c39929e
	})

	$('.deats-edit-icon').on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#edit-appointment').html());

		$blackOverlay.css({
			'visibility': 'hidden'
		})

<<<<<<< HEAD
	function newApptId() {
		function series() {
			return Math.floor((1 + Math.random()) * 10000).toString(16);
		}

		return series() + '-' + series() + '-' + series() + '-' + series();
	}

	function createNewAppt() {
		return Appointment({ title: $('.appt-name-input').val(),
<<<<<<< HEAD
													date: new Date(), // TODO make this real
=======
													date: new Date(),
>>>>>>> master
													street: $('.appt-street-input').val(),
													city: $('.city-title-input').val(),
													state: $('.state-choice').val(),
													apptId: newApptId(),
		})
	}
=======
		$deatsWrapper.css({
			'visibility': 'hidden',
			'height': '30%',
			'width': '15%',
			'top': '40%',
			'right': '43%',				
			'transition': '0s'
		})

		$deatsDiv.css({
			'height': '30%',
			'transition': '0s'
		})

	})

	$('.main-trash').on('click', function () {
		$(this).closest('li').remove();
	})

>>>>>>> a87e8cc873efad6062d1ac5662884eff0c39929e

})
