
var wrapper = $('.wrapper'); // identifying the main display element in a variable
// var screenManager = ScreenManager(wrapper);
var apptStore = ObjectStore(); // instancing an an object store to manage our appts

// var container = $('.wrapper');
var screenManager = ScreenManager(wrapper);

screenManager.showMainScreen(apptStore);

// wrapper.html($("#main-screen").html());
// wrapper.html($("#new-appointment").html());


	var editAppointment = $('#edit-appointment');
	var backButton = $('.back-button');
	var body = $('body');
	var map = new GMaps({
		el: '#map',
		lat: 51.5073346,
		lng: -0.1276831,
	});

	hideMap();


wrapper.on('click', '.new-appt-button', function(e) { // making the new appt button open the new appt screen
	e.preventDefault();
	screenManager.showNewScreen();
	$('.submit-button').click(function(e) { // makes submit button create appt and return user to main screen

		e.stopPropagation();
		e.preventDefault();

		var dateLabel = $('.appt-date-label-input');
		var dateLabelValue = dateLabel.val();
		var newDate = moment(dateLabelValue, ['M/D/YY', 'MM/D/YY', 'MM/DD/YY','M/D/YYYY',
			'MM/D/YYYY', 'MM/DD/YYYY']);
		// var newFormattedFullDate = newDate.format('MMMM D')
		// var newDateFromNow = newDate.fromNow()
		// dateLabel.val(newFormattedFullDate);
		// console.log(newDateFromNow);
		// $('.deats-date-time-span').html(newDateFromNow + ' on');
		// $('.deats-full-date-time-span').html(newFormattedFullDate);
		// var dateInMs = newDate.format('x');

		apptStore.add(createAppt(newDate));

		GMaps.geocode({
			address: $('#appt-street-input').val(),
			callback: function(results, status) {
				if (status == 'OK') {
					var latlng = results[0].geometry.location;
					map.setCenter(latlng.lat(), latlng.lng());
					map.addMarker({
						lat: latlng.lat(),
						lng: latlng.lng()
					});
				}
			}
		});

		hideMap();

		screenManager.showMainScreen(apptStore);

	})

})

wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
	hideMap();
	screenManager.showMainScreen(apptStore);
})

wrapper.on('click', '.cancel-button', function(e) { // makes cancel button (new/edit screens) return user to main
	e.stopPropagation();
	e.preventDefault();
	hideMap();
	screenManager.displayMain(apptStore);
})

$('.deats-back-button').click(function () {
	hideMap();
	screenManager.showMainScreen(apptStore);
})

$('.deats-edit-icon').click(function(e) {
	hideMap();
	screenManager.showEditScreen($(event.target).data());
	$('.submit-button').click(function(e) { // makes submit button create appt and return user to main screen

		e.stopPropagation();
		e.preventDefault();

		var dateLabel = $('.appt-date-label-input');
		var dateLabelValue = dateLabel.val();
		var newDate = moment(dateLabelValue, ['M/D/YY', 'MM/D/YY', 'MM/DD/YY','M/D/YYYY',
			'MM/D/YYYY', 'MM/DD/YYYY']);
		// var newFormattedFullDate = newDate.format('MMMM D')
		// var newDateFromNow = newDate.fromNow()
		// dateLabel.val(newFormattedFullDate);
		// console.log(newDateFromNow);
		// $('.deats-date-time-span').html(newDateFromNow + ' on');
		// $('.deats-full-date-time-span').html(newFormattedFullDate);
		// var dateInMs = newDate.format('x');

		apptStore.remove($(event.target).data());
		apptStore.add(createAppt(newDate));

		GMaps.geocode({
			address: $('#appt-street-input').val(),
			callback: function(results, status) {
				if (status == 'OK') {
					var latlng = results[0].geometry.location;
					map.setCenter(latlng.lat(), latlng.lng());
					map.addMarker({
						lat: latlng.lat(),
						lng: latlng.lng()
					});
				}
			}
		});

		screenManager.showMainScreen(apptStore);

	})
})

// $(document).ready(function(){

$('.submit-button').click(function(e) { // makes submit button create appt and return user to main screen

	hideMap();
	e.stopPropagation();
	e.preventDefault();

	var dateLabel = $('.appt-date-label-input');
	var dateLabelValue = dateLabel.val();
	var newDate = moment(dateLabelValue, ['M/D/YY', 'MM/D/YY', 'MM/DD/YY','M/D/YYYY',
		'MM/D/YYYY', 'MM/DD/YYYY']);
	// var newFormattedFullDate = newDate.format('MMMM D')
	// var newDateFromNow = newDate.fromNow()
	// dateLabel.val(newFormattedFullDate);
	// console.log(newDateFromNow);
	// $('.deats-date-time-span').html(newDateFromNow + ' on');
	// $('.deats-full-date-time-span').html(newFormattedFullDate);
	// var dateInMs = newDate.format('x');

	apptStore.add(createAppt(newDate));

	GMaps.geocode({
		address: $('#appt-street-input').val(),
		callback: function(results, status) {
			if (status == 'OK') {
				var latlng = results[0].geometry.location;
				map.setCenter(latlng.lat(), latlng.lng());
				map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng()
				});
			}
		}
	});

	screenManager.showMainScreen(apptStore);

})

// if ($('.deats-title-span').length < 18) {
// 			$('.deats-background').css({
// 				'height': '36.5%'
// 			})
// 		}

	wrapper.on('click', '.click-4-deats', function(event) {
		screenManager.showDetailScreen($(event.target).closest('.appointment-list-item').data());

		if ($('.deats-title-span').length < 18) {
			$('.deats-background').css({
				'height': '36.5%'
			})
		}


		$('#map').css({ // to bring the map back which was displaying when it wasn't allowed to
			'position': 'relative',
			'left': '0px'
		});
	})


	function newApptId() {
		function series() {
			return Math.floor((1 + Math.random()) * 10000).toString(16);
		}

		return series() + '-' + series() + '-' + series() + '-' + series();
	}

	function createAppt(newDate) {
		// console.log(newDate.format(YYYY));
		return Appointment({ title: $('.appt-name-input').val(),
													street: $('.appt-street-input').val(),
													city: $('.city-title-input').val(),
													state: $('.state-choice').val(),
													hours: $('.time-hours').val(),
													minutes: $('.time-minutes').val(),
													amPm: $('.time-pmam').val(),
													date: new Date(Number(newDate.format('YYYY')),
																					Number(newDate.format('MM')) - 1,
																					Number(newDate.format('DD')),
																					Number($('.time-hours').val()) + Number($('.time-pmam').val()),
																					Number($('.time-minutes').val()))
												})
	}

	function hideMap() {
		$('#map').css({
			'position': 'absolute',
			'left': '-10000px'
		});
	}

	function showMap() {
		$('#map').css({ // to bring the map back which was displaying when it wasn't allowed to
			'position': 'relative',
			'left': '0px'
		});
	}

// wrapper.on('click', '.main-header-new-appt', function() {
//   screenManager.showNewScreen();
// })

// wrapper.on('blur', '.month-select', function() {
//   if ($('.month-select').val() === '2') {
//     $('.day-select').html($('.28-day-month').html());
//   } else if ($('.month-select').val() === '4' || $('.month-select').val() === '6' || $('.month-select').val() === '9' || $('.month-select').val() === '11') {
//     $('.day-select').html($('.30-day-month').html());
//   } else if ($('.month-select').val() !== '') {
//     $('.day-select').html($('.31-day-month').html());
//   }
// })
