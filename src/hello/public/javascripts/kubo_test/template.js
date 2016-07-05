$(function () {
	$( "[data-role='header'], [data-role='footer']" ).toolbar();
	var mapCanvas = document.getElementById('map-canvas');
	var latlng = new google.maps.LatLng(34.698695, 135.491583);
	var mapOptions = {
		zoom: 15,
		center: latlng,
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	$(window).resize(function() {
		console.log('resized');
		var height = $(window).height() - $("#header").height() - $("#footer").height() - 36;
		$("#map-canvas").height(height);
		console.log(height);
	});
	$(window).resize();
})
