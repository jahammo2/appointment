// Toggles Classes

function toggleClass(element, className) {
	var currentClasses = element.className;

	if (currentClasses.indexOf(className) >= 0) {
	  element.className = currentClasses.replace(className, '').trim();
	} else {
	  element.className += ' ' + className;
	}
}

// Makes an SVG edittable

$('img.svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
    }, 'xml');

});