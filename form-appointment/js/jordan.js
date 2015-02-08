// ToDo:

// add this to wrapper.on('click', '.click-4-deats', function(event) {
if ($('.deats-title-span').length < 18) {
			$('.deats-background').css({
				'height': '36.5%'
			})
		}

// Add this to screenmanager populatedetails:
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

// Add this to new appt button on click in main.js after shownewscreen:
resizeCityInput()

// Add this to deats-edit-appt on click in main.js after showeditscreen:
resizeCityInput()

// Add this to the bottom of main.js (or wherever):
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

// Add this to the top of main:
window.onresize = function () {
	resizeCityInput();
}

// change showModal right property to 10% from 8%

// in screen-manager, change
appt.getWeatherObject(function(data) {
      $('.rain-chance-bottom').text(data.list[getTimeDif(appt)].weather[0].description);
    })
// to
appt.getWeatherObject(function(data) {
	  $('.rain-chance-bottom').text((data.list[getTimeDif(appt)].main.humidity)+'%');
    })









