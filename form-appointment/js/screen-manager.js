function ScreenManager(container) {

  ///////////////////////
 // PRIVATE FUNCTIONS //
///////////////////////

  function clearMainScreen() {
    $('.appt-list').html('')
  }

  function populateMainScreen(apptStore) {
    var apptArr = apptStore.query();

    for (var i = 0; i < apptArr.length; ++i) {
      var currentAppt = apptArr[i]; // this is because lines 15-16 would not work with apptArr[i]
      $('.appt-list').append($('.appt-listing').html());
      $('.appointment-list-item').last().data(apptArr[i]);
      $('.time-span').last().text(apptArr[i].getTimeFrame());
      $('.li-title-span').last().text(apptArr[i].title);
      $('.place-span').last().text(apptArr[i].street);

      $('.delete-div').last().click(function (event) {
        event.stopPropagation();
        apptStore.remove($(event.target).closest('.appointment-list-item').data());
        $('.appt-list').html('');
        populateMainScreen(apptStore);
      });

      currentAppt.getWeatherObject(function(data) {
        $('.weather-span').text(Math.round(toFarrenheit(data.list[getTimeDif(currentAppt)].main.temp)) + '°');
      })
    }
  }

  function initializeSearchBar(apptStore) {
    $('.search-input').keyup(function() {
      clearMainScreen();
      var apptArr = apptStore.query();
      tempStore = ObjectStore();

      for (var i = 0; i < apptArr.length; ++i) {
        if (apptArr[i].getSearchString().indexOf($('.search-input').val()) >= 0) {
          tempStore.add(apptArr[i]);
        }
      }
      clearMainScreen();
      populateMainScreen(tempStore);

    })
  }


  function populateDetails(appt) {

    $('.deats-title-span').text(appt.title);
    $('.deats-date-time-span').text(appt.date.toDateString());
    $('.deats-full-date-time-span').text(appt.getTimeDisplay());
    // $('.deets-time-display').text(appt.date.toTimeString());
    // $('.deets-address-display').text(appt.street);
    // $('.deets-city-st-display').text(appt.getCityStateDisplay());
    // appt.getWeatherObject(function(data) {
    //   $('.rain-chance-bottom').text(data.list[getTimeDif(appt)].main.temp);
    // })
    appt.getWeatherObject(function(data) {
      $('.temp-bottom').text(Math.round(toFarrenheit(data.list[getTimeDif(appt)].main.temp)) + '°');
    })
    appt.getWeatherObject(function(data) {
    $('.rain-chance-bottom').text((data.list[getTimeDif(appt)].main.humidity)+'%');
    })

    appt.getWeatherObject(function(data) {
      if(data.list[getTimeDif(appt)].weather[0].main === "Clear") {
        $('.weather').css('background-image', 'url(img/sunny.png)')
      } else if (data.list[getTimeDif(appt)].weather[0].main === "Thunderstorm") {
        $('.weather').css('background-image', 'url(img/thunderstorm.png)')
      } else if (data.list[getTimeDif(appt)].weather[0].main === "Rain") {
        $('.weather').css('background-image', 'url(img/rain.png)')
      } else if (data.list[getTimeDif(appt)].weather[0].main === "Snow") {
        $('.weather').css('background-image', 'url(img/snow.png)')
      } else if (data.list[getTimeDif(appt)].weather[0].main === "Clouds") {
        $('.weather').css('background-image', 'url(img/partly-cloudy.png)')
      } else {
        $('.weather').css('background-image', 'url(img/cloudy.png)')
      }

    })

    $('.deats-edit-icon').data(appt);

  }

  function populateEditScreen(appt) {
    $('.appt-title-span').text('Edit Appointment');
    $('.appt-name-input').val(appt.title);
    $('.appt-street-input').val(appt.street);
    $('.city-title-input').val(appt.city);
    $('.state-choice').val(appt.state);
    $('.appt-date-label-input').val((appt.date.getMonth() + 1) + '/' + appt.date.getDate() + '/' + appt.date.getFullYear());
    $('.time-hours').val(appt.hours);
    $('.time-minutes').val(appt.minutes);
    $('.time-pmam').val(appt.amPm);
    $('.submit-button').text('save changes');
    $('.submit-button').data(appt);
  }

  function getTimeDif(appt) {
    var currentTime = new Date();
    return Math.floor(((appt.date.getTime() - currentTime.getTime())/3600000)/3);
  }

  function toFarrenheit(kelvin) {
    return (kelvin - 273.15) * 1.8 + 32;
  }

  function hideModal() {
    $('#map').css({
      'position': 'absolute',
      'left': '-10000px'
    });

    $('.black-overlay').css({
      'visibility': 'hidden'
    })

    $('.deats-wrapper').css({
      'visibility': 'hidden',
      'height': '10%',
      'width': '15%',
      'top': '12%',
      'right': '43%',
      'transition': '0s'
    })

    $('.deats-div').css({
      'height': '30%',
      'transition': '0s'
    })
  }

  function showModal() {
    $('#map').css({
      'position': 'relative',
      'left': '0px'
    });

    $('.black-overlay').css({
      'visibility': 'visible'
    })

    if (window.innerWidth > 450) {

      var marginNumber = (window.innerWidth - 400) / 2;

      $('.deats-wrapper').css({
        'visibility': 'visible',
        'height': '69%',
        'width': '300px',
        'top': '20%',
        'right': (50 + marginNumber) + 'px',
        'transition': '.1s'
      })

      $('.deats-div').css({
        'height': '70%',
        'transition': '.1s'
      })

    } else {

      $('.deats-wrapper').css({
        'visibility': 'visible',
        'height': '69%',
        'width': '80%',
        'top': '12%',
        'right': '10%',
        'transition': '.1s'
      })

      $('.deats-div').css({
        'height': '70%',
        'transition': '.1s'
      })

    }
  }

  function setCalendarMargin () {

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

    var searchDivWidth = callEl('.search-div').elWidth();
    // 11px comes from the padding
    var searchInputWidth = callEl('.search-input').elWidth() + 11;
    // the 5 and 11 are experimented numbers
    var marginLeftNumber = ((searchInputWidth - searchDivWidth) / 5) + 11;

    var calendarSvg = callEl('.calendar-svg').elName();
    calendarSvg.style.marginLeft = marginLeftNumber + 'px';

  }


  //////////////////////
 // PUBLIC FUNCTIONS //
//////////////////////

  return {
    showMainScreen: function(apptStore) {
      hideModal();
      container.html($('#main-screen').html());
      setCalendarMargin();
      populateMainScreen(apptStore);
      initializeSearchBar(apptStore);
    },

    showNewScreen: function() {
      container.html($('#new-appointment').html());
    },

    showEditScreen: function(appt) {
      hideModal();
      container.html($('#new-appointment').html());
      populateEditScreen(appt); // TODO: make this function
    },

    showDetailScreen: function(appt) {
      showModal();
      populateDetails(appt);
    }
  }
}
