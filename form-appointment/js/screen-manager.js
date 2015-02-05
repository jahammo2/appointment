function ScreenManager(display) {
  var mainDisplay = display;

  function populateMain(apptList) {
    var apptArr = apptList.query();
    sortByDate(apptArr);

    for (var i = 0; i < apptArr.length; ++i) {
      $('.appt-list-actual').append($('#appt-listing').html());
      $('.appt-listing').last().val(apptArr[i].apptId)
      $('.time-span').last().text(apptArr[i].getTimeDisplay());
      $('.weather-span').last().text('weather');
      $('.li-title-span').last().text(apptArr[i].title);
      $('.place-span').last().text(apptArr[i].street);
    }
  }

  function sortByDate(apptArr) {
    apptArr.sort( function (b, a) {
      if (b.getTimeSortNum() > a.getTimeSortNum()) {
        return 1;
      }
      if (b.getTimeSortNum() < a.getTimeSortNum()) {
        return -1;
      }
      return 0;
    })
  }

  return {
    displayMain: function(apptList) {
      mainDisplay.html($("#main-screen").html());
      populateMain(apptList);
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