$(function() {
	var wrapper = $('.wrapper');
	var $editAppointment = $('#edit-appointment');
	var $backButton = $('.back-button');
	var $body = $('body');
	// var $this = $(this)
	wrapper.html($("#new-appointment").html());
	// wrapper.html($("#deats").html());

	wrapper.on('click', '.new-appt-button', function() {
		wrapper.html($('#new-appointment').html());
	})


	wrapper.on('click', '.back-button', function() {
		wrapper.html($('#main-screen').html());
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

	})

	wrapper.on('click', '.cancel-button', function(e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#main-screen').html());
	})

	wrapper.on('click', '.submit-button', function(e) {
		e.stopPropagation();
		e.preventDefault();

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

		wrapper.html($('#main-screen').html());
	})

	var $blackOverlay = $('.black-overlay')
	var $deatsWrapper = $('.deats-wrapper')
	var $deatsDiv = $('.deats-div')

	// $blackOverlay.hide();
	// $deatsWrapper.hide();

	wrapper.on('click', '.appointment-list-item', function() {
		// $blackOverlay.show();
		// $deatsWrapper.show();
		// wrapper.html($('#deats').html());
		
		$blackOverlay.css({
			'visibility': 'visible'

		})

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
	})


	wrapper.on('click', '.deats-edit-icon', function(e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#edit-appointment').html());
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
	})

	$('.deats-edit-icon').on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		wrapper.html($('#edit-appointment').html());

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

	})

	$('.main-trash').on('click', function () {
		$(this).closest('li').remove();
	})


})