function Appointment(spec) {
  var apptId = newId();

  return {
    title: spec.title,
    date: spec.date,
    street: spec.street,
    city: spec.city,
    state: spec.state,
    hours: spec.hours,
    minutes: spec.minutes,
    amPm: spec.amPm,

    equal: function(otherAppt) {
      return this.getId() === otherAppt.getId();
    },

    getCityStateDisplay: function() {
      return this.city + ', ' + this.state;
    },

    getDateDisplay: function() {
      return this.date.toDateString();
    },

    getTimeDisplay: function() {
      var timeStr = this.hours + ':' + this.minutes;
      if (this.amPm === '12') {
        return timeStr += ' pm';
      } else {
        return timeStr += ' am';
      }
    },

    getTimeSortNum: function() {
      return this.date.getTime();
    },

    getWeatherObject: function(callback) {
      var weatherObject = {};
      $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + this.city + ',' + this.state)
      .done(callback)
      .fail(function (request, status, err) {
        console.log(err);
        alert('Failed to connect to Weather... See console for details.');
      });

    },

    getId: function() {
      return apptId;
    }
  }

  function newId() {

    function series() {
      return Math.floor((1 + Math.random()) * 10000).toString(16);
    }

    return series() + '-' + series() + '-' + series() + '-' + series();
  }

}
