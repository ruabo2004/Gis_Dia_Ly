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

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

var shouldUpdate = true;

var view = new ol.View({
    projection: projection,
    // center: ol.proj.transform([603484.38, 2070540.06], 'EPSG:3405', 'EPSG:3857'),
    zoom: 15 // Độ zoom ban đầu
    // center: center,
    // zoom: zoom,
    // rotaiton: rotation
});


var map = new ol.Map({
    target: 'map',
    layers: [vung,xudong,rgtd],
    view: view,
    overlays: [overlay]
});

// Fit the view to the bounds of the WMS layer
map.getView().fit(bounds, {
    size: map.getSize(),
    maxZoom: 18 // Điều chỉnh mức zoom tối đa
});

// Show/hide the WMS layer based on checkbox
$("#checkvung").change(function () {
    vung.setVisible($(this).is(":checked"));
});

