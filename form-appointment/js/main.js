$(function() {
	var wrapper = $('.wrapper'); // identifying the main display element in a variable
	var screenManager = ScreenManager(wrapper);
	var apptStore = ObjectStore(); // instancing an an object store to manage our appts

	// wrapper.html($("#main-screen").html());
	wrapper.html($("#new-appointment").html());



	wrapper.on('click', '.new-appt-button', function() { // making the new appt button open the new appt screen
		screenManager.displayNew();
	})

	wrapper.on('click', '.back-button', function() { // making back buttons return the user to main
		screenManager.displayMain(apptStore);
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

	wrapper.on('click', '.appointment-list-item', function() {
		screenManager.displayDeats('appt');
	})

	wrapper.on('click', '.edit-button', function(e) {
		e.stopPropagation();
		e.preventDefault();
		screenManager.displayEdit('appt');
	})

	$('.fa-trash-o').on('click', function () {
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
