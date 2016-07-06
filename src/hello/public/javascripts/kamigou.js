$(function () {
	console.log("start kamigou.js");

	MyMap.init();

})

MyMap = {
	map: null,
	markers: [],
	infos: [],
	init: function () {
		if (! this.canvas) {
			this.canvas = document.getElementById('EventDetailMap');
		}
		var latlng = new google.maps.LatLng((35.703512), (139.743012));
		var mapOptions = {
			zoom: 15,
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
		inContents += '<div id="in_contents">';
		inContents +=   '<div id="imgL">';
		inContents +=     '<a id="eventPicA" href="/images/Desert.jpg" data-lity>';
		inContents +=       '<img id="eventPicImg" src="/images/Desert.jpg" style="float:left;margin:0 1em 0.5em 0;border-radius:5px;width: 96px;height: 65px;" alt="" />';
		inContents +=     '</a>';
		inContents +=     '<h4 id="eventDate">2016/07/07(木)</h3>';
		inContents +=     '<h3 id="eventTitle">納涼祭ですよ</h3>';
		inContents +=     '<p id="eventInfo">今年もやってきました！上郷ネオポリス納涼祭です。皆さんふるってご参加ください</p>';
		inContents +=   '</div>';
		inContents += '</div>';

		var info = new google.maps.InfoWindow( {
			content: inContents,
//			content: "<span>吹き出しのメッセージ</span>",
			pixelOffset: new google.maps.Size(0, -35), // 横方向に0, 上方向に10pxずらす
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
		var filePath = "/datas/event20160708120000.json";
		$.ajax({
			type: 'GET',
			url: filePath,
			success: function (data) {
				$("#eventTitle").text(data.title);
				$("#eventPicA").attr("href", data.picture);
				$("#eventPicImg").attr("src", data.picture);
				$("#eventInfo").text(data.contents);
			}
		});
	},


}
