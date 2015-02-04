function Appointment(spec) {
  return {
    title: spec.title,
    date: spec.date,
    street: spec.street,
    city: spec.city,
    state: spec.state,
    apptId: spec.apptId, // TODO: this needs to be a private attribute

    equal: function(otherAppt) {
      return this.apptId === otherAppt.apptId;
    },

    getCityStateDisplay: function() {
      return this.city + ', ' + this.state;
    },

    getDateDisplay: function() {
      return this.date.toDateString();
    },

    getTimeDisplay: function() {
      return this.date.getHours() + ':' + this.date.getMinutes();
    },

    getTimeSortNum: function() {
      return this.date.getTime();
    }
  }

}
