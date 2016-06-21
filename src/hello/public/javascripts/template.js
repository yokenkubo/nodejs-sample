$(function () {
	console.log("start template.js");
	
	navigator.geolocation.getCurrentPosition(function(position) {
		MyForm.setLatLng(position.coords.latitude, position.coords.longitude);
		MyMap.init(position.coords.latitude, position.coords.longitude);
	});
	
	MyForm.setEventListener();
	
	$("#entry").click(MyForm.clickEntry);
})

MyForm = {
	round: function (num) {
		var _pow = Math.pow(10, 4);
		return Math.round(num * _pow) / _pow;
	}, 
	setLatLng: function (lat, lng) {
		$("#my-latitude").val(this.round(lat));
		$("#my-longitude").val(this.round(lng));
	}, 
	getLatLng: function () {
		return new google.maps.LatLng($("#my-latitude").val(), $("#my-longitude").val());
	}, 
	getDirection: function () {
		return parseInt($("#my-direction").val());
	},
	setEventListener: function () {
		window.addEventListener('deviceorientation', function(event){ 
		    $('#my-direction').val(Math.ceil(360 - event.alpha)); // event.alphaで方角の値を取得
		});
	},
	clickEntry: function (event) {
		MyMap._putMarker(MyForm.getLatLng(), MyForm.getDirection());
		$.ajax({
			type: 'POST',
			url: 'template/marker', 
			data: {
				lat: $("#my-latitude").val(), 
				lng: $("#my-longitude").val(), 
				dir: $("#my-direction").val()
			}, 
			success: function (msg) {
				console.log(msg);
			}
		})
	}
}

MyMap = {
	map: null, 
	markers: [], 
	init: function (lat, lng) {
		this.canvas = document.getElementById('map-canvas');
		var latlng = new google.maps.LatLng(lat, lng);
		var mapOptions = {
			zoom: 15, 
			center: latlng,
		}
		this.map = new google.maps.Map(this.canvas, mapOptions);
		
		// マップオブジェクトの初期化
		this.map.addListener('click', function(event) {
			// this._putMarker(event.latLng);
			MyForm.setLatLng(event.latLng.lat(), event.latLng.lng());
		}.bind(this));
		
		// サーバデータのロード
		this._loadMarderData();
	}, 
	_putMarker: function(latLng, direction) {
		var markerOptions = {
			position: latLng,
			map: this.map, 
			icon: {
			      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
			      scale: 3,
			      strokeColor: "red", 
			      rotation: direction
			}
		};
		var marker = new google.maps.Marker(markerOptions);
		this.markers.push(marker);
	}, 
	_loadMarderData: function () {
		$.ajax({
			type: 'GET',
			url: 'template/marker', 
			success: function (msg) {
				console.log(msg);
				var data = JSON.parse(msg);
				$.each(data, function (i, markerJson) {
					MyMap._putMarker(new google.maps.LatLng(markerJson.lat, markerJson.lng), parseInt(markerJson.dir));
				});
			}
		})
	}
}