function ScreenManager(container) {

  function clearMainScreen() {
    $('.main-list-container').html('')
  }

  function populateMainScreen(apptStore) {
    var apptArr = apptStore.query();

    for (var i = 0; i < apptArr.length; ++i) {
      $('.appt-list').append($('.appt-listing').html());
      $('.appointment-list-item').last().data(apptArr[i]);
      $('.time-span').last().text(apptArr[i].date.getHours() + ':' + apptArr[i].date.getMinutes());
      $('.li-title-span').last().text(apptArr[i].title);
      $('.place-span').last().text(apptArr[i].street);

      $('.delete-div').last().click(function (event) {
        event.stopPropagation();
        apptStore.remove($(event.target).closest('.appointment-list-item').data());
        $('.appt-list').html('');
        populateMainScreen(apptStore);
      });

    }
  }

  function populateDetails(appt) {

    $('.deats-title-span').text(appt.title);
    $('.deats-date-time-span').text(appt.date.toDateString());
    $('.deats-date-time-span').text(appt.date.toDateString());
    // $('.deats-full-date-time-span').text()
    // $('.deets-time-display').text(appt.date.toTimeString());
    // $('.deets-address-display').text(appt.street);
    // $('.deets-city-st-display').text(appt.getCityStateDisplay());
    appt.getWeatherObject(function(data) {
      $('.deets-weather-display').text(data.list[getTimeDif(appt)].weather[0].main);
    })
    // appt.getWeatherObject(function(data) {
    //   $('.rain-chance-bottom').text(data.list[getTimeDif(appt)].main.temp);
    // })
    appt.getWeatherObject(function(data) {
      $('.temp-bottom').text(data.list[getTimeDif(appt)].main.temp);
    })
  }

  function getTimeDif(appt) {
    var currentTime = new Date();
    return Math.floor(((appt.date.getTime() - currentTime.getTime())/3600000)/3);
  }

  return {
    showMainScreen: function(apptStore) {
      container.html($('#main-screen').html());
      populateMainScreen(apptStore);
    },

    showNewScreen: function() {
      container.html($('#new-appointment').html());
    },

    showEditScreen: function(appt) {
      container.html($('#edit-appointment').html());
      // populateEditScreen(appt); // TODO: make this function
      // setEditHeading(); // TODO: make this function
    },

    showDetailScreen: function(appt) {
      populateDetails(appt);
    }
  }
}
