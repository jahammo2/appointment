function ScreenManager(display) {
  var mainDisplay = display;

  return {
    displayMain: function(apptList) {
      mainDisplay.html($("#main-screen").html());
      // populateApptList(); // TODO make this function
    },

    displayNew: function () {
      mainDisplay.html($('#new-appointment').html());
    },

    displayEdit: function(appt) {
      mainDisplay.html($('#edit-appointment').html());
      // populateApptEdit(appt); // TODO write this function
    },

    displayDeats: function(appt) {
      mainDisplay.html($('#deats').html());
      // populateDeats(appt); // TODO write this function
    }
  }
}
