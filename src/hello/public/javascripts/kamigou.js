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
		var info = new google.maps.InfoWindow( {
			content: "<span>吹き出しのメッセージ</span>",
			pixelOffset: new google.maps.Size(0, -35), // 横方向に0, 上方向に10pxずらす
		});

		// 情報ウィンドウ(のインスタンス)を地図に設置(レンダリング)する
		info.open(this.map);
		info.setPosition(latlng);
		this.infos.push(info);
	}

}
