var format = "image/png";
var bounds = [533982.875,2514956.5,535041.25,2516020.25]; // Sử dụng bbox từ yêu cầu WMS

var vung = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8080/geoserver/Hoang_Quoc_Viet/wms', // URL của GeoServer
        params: {
            FORMAT: format,
            'VERSION': '1.1.0',
            STYLES: '',
            LAYERS: 'Hoang_Quoc_Viet:thuadatdaydu_014', // Layer từ WMS request
            'SRS': 'EPSG:3405', // Hệ tọa độ bạn đang sử dụng
        }
    })
});


var updatePermalink = function () {
    if (!shouldUpdate) {
        // do not update the URL when the view was changed in the 'popstate' handler
        shouldUpdate = true;
        return;
    }

    var center = map.getView().getCenter(); // Lấy center từ view
    var hash = '#map=' +
        map.getView().getZoom() + '/' +
        Math.round(center[0] * 100) / 100 + '/' +
        Math.round(center[1] * 100) / 100 + '/' +
        map.getView().getRotation();
    var state = {
        zoom: map.getView().getZoom(),
        center: map.getView().getCenter(),
        rotation: map.getView().getRotation()
    };
    window.history.pushState(state, 'map', hash);
};

