$(function () {
	console.log("start kamigou.js");

	MyMap.init();

})

MyMap = {
	map: null,
	markers: [],
	infos: [],
	init: function () {
		// 高さ設定
		var height = $(window).height() - 100;
		$("#EventDetailMap").height(height);

		if (! this.canvas) {
			this.canvas = document.getElementById('EventDetailMap');
		}
		var latlng = new google.maps.LatLng((35.346184), (139.579519));
		var mapOptions = {
			zoom: 17,
			center: latlng,
		}
		this.map = new google.maps.Map(this.canvas, mapOptions);

		this._putMarker(latlng)
		this._putInfo(latlng)
	},

	_putMarker: function(latLng) {
		var markerOptions = {
			position: latLng,
			map: this.map,
		};
		var marker = new google.maps.Marker(markerOptions);
		this.markers.push(marker);
	},

	_putInfo: function(latlng) {

		var inContents = '';
		inContents += '<div id="eventInfoWindow">';
		inContents +=   '<div id="imgL">';
		inContents +=     '<div >';
		inContents +=     '<a id="eventPicA" href="/images/Desert.jpg" data-lity>';
		inContents +=       '<img id="eventPicImg" src="/images/Desert.jpg" />';
		inContents +=     '</a>';
		inContents +=     '<h4 id="eventDate">--</h3>';
		inContents +=     '<h3 id="eventTitle">--</h3>';
		inContents +=     '</div >';
		inContents +=     '<p id="eventInfo">-イベント情報-</p>';
		inContents +=     '<br />';
		inContents +=     '<img id="eventPicImg" style="width: 100px;" src="/images/join.png" />';
		inContents +=   '</div>';
		inContents += '</div>';

		var info = new google.maps.InfoWindow( {
			content: inContents,
//			content: "<span>吹き出しのメッセージ</span>",
			pixelOffset: new google.maps.Size(0, -35), // 横方向に0, 上方向に35pxずらす
		});

		google.maps.event.addListener(info, 'domready', function() {
			MyMap._ajaxEventData();
		});

		// 情報ウィンドウ(のインスタンス)を地図に設置(レンダリング)する
		info.open(this.map);
		info.setPosition(latlng);
		this.infos.push(info);
	},

	_ajaxEventData: function () {
		// var filePath = "/event/event20160708120000.json";
		$.ajax({
			type: 'GET',
			url: filePath,
			success: function (data) {
				var data0 = data;
				$("#eventTitle").text(data0.title);
				$("#eventPicA").attr("href", data0.picture);
				$("#eventPicImg").attr("src", data0.picture);
				$("#eventInfo").text(data0.contents);
				$("#eventDate").text(data0.date);
				var latlng = new google.maps.LatLng((data.lat), (data.lng));
				MyMap.markers[0].setPosition(latlng);
				MyMap.infos[0].setPosition(latlng);
				MyMap.map.panTo(new google.maps.LatLng(latlng.lat() + 0.0015, latlng.lng()));
			}
		});
	},
}

$(window).resize(function() {
	var height = $(window).height() - 100;
	$("#EventDetailMap").height(height);
	console.log(height);
});
$(window).resize();
