
var wrapper = $('.wrapper'); // identifying the main display element in a variable
var apptStore = ObjectStore(); // instancing an an object store to manage our appts
var screenManager = ScreenManager(wrapper);

screenManager.showMainScreen(apptStore);

window.onresize = function () {
	resizeCityInput();
}

var map = new GMaps({
	el: '#map',
	lat: 51.5073346,
	lng: -0.1276831,
});


wrapper.on('click', '.new-appt-button', function(e) { // making the new appt button open the new appt screen
	e.preventDefault();
	screenManager.showNewScreen();
	resizeCityInput()

	$('.submit-button').click(function(e) { // makes submit button create appt and return user to main screen

		e.stopPropagation();
		e.preventDefault();

		if (!isFormValid()) {
			$('.error-message-fill').text('*All fields are required!');
			return;
		}

		var dateLabel = $('.appt-date-label-input');
		var dateLabelValue = dateLabel.val();
		var newDate = moment(dateLabelValue, ['M/D/YY', 'MM/D/YY', 'MM/DD/YY','M/D/YYYY',
			'MM/D/YYYY', 'MM/DD/YYYY']);
		newDate.hours(Number($('.time-hours').val()) + Number($('.time-pmam').val()));
		newDate.minutes(Number($('.time-minutes').val()));

		if (!newDate.isValid() || newDate.isBefore(moment(new Date()))) {
			$('.error-message-fill').text('*Invalid date!');
			return;
		}

		apptStore.addSort(createAppt(newDate), sortLogic);

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

wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
	screenManager.showMainScreen(apptStore);
})

wrapper.on('click', '.cancel-button', function(e) { // makes cancel button (new/edit screens) return user to main
	e.preventDefault();
	screenManager.showMainScreen(apptStore);
})

$('.deats-back-button').click(function () {
	screenManager.showMainScreen(apptStore);
})

$('.deats-edit-icon').click(function(e) {
	screenManager.showEditScreen($(event.target).data());
	resizeCityInput()
	$('.submit-button').click(function(e) { // makes submit button create appt and return user to main screen

		e.stopPropagation();
		e.preventDefault();

		if (!isFormValid()) {
			alert('all fields are required');
			return;
		}

		var dateLabel = $('.appt-date-label-input');
		var dateLabelValue = dateLabel.val();
		var newDate = moment(dateLabelValue, ['M/D/YY', 'MM/D/YY', 'MM/DD/YY','M/D/YYYY',
			'MM/D/YYYY', 'MM/DD/YYYY']);
		newDate.hours(Number($('.time-hours').val()) + Number($('.time-pmam').val()));
		newDate.minutes(Number($('.time-minutes').val()));

		if (!newDate.isValid() || newDate.isBefore(moment(new Date()))) {
			alert('invalid date');
			return;
		}

		apptStore.remove($(event.target).data());
		apptStore.addSort(createAppt(newDate), sortLogic);

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

function isFormValid() {
	if ($('.appt-name-input').val() === ''
			|| $('.appt-street-input').val() === ''
			|| $('.city-title-input').val() === ''
			|| $('.state-choice').val() === ''
			|| $('.appt-date-label-input') === '') {
		return false;
	} else {
		return true;
	}
}

function sortLogic(a, b) {
	if (a.date.getTime() > b.date.getTime()) {
		return 1;
	}
	if (a.date.getTime() < b.date.getTime()) {
		return -1;
	}
	return 0;
}

function resizeCityInput () {

	function callEl (el) {
		return {
			elName: function () {
				return document.querySelector(el);
			},

			elWidth: function () {
				return document.querySelector(el).offsetWidth;
			}
		}
	}

	var cityDivWidth = callEl('.city-div').elWidth();
	var cityInputWidth = callEl('.city-title-input').elWidth();
	var cityInput = callEl('.city-title-input').elName();
	var cityTitleWidth = callEl('.city-title').elWidth();
	var stateLabelWidth = callEl('.state-choice-label').elWidth();
	
	// .08 is because I have 2% padding and I need to account for it twice
	var divPadding = cityDivWidth * .08;
	// 20px comes from the margin right of the city-title-input
	var marginLeftNumber = cityDivWidth - cityInputWidth - 20 - cityTitleWidth - stateLabelWidth
	- divPadding;
	// .007 comes from Moneypenny, I mean, an experimented number to line up my divs
	var extraSpace = cityDivWidth * .007;
	var widthNumber = marginLeftNumber + cityInputWidth + extraSpace 
	cityInput.style.width = widthNumber + 'px';


}









