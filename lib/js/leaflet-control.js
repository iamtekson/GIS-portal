var map = L.map("map").setView([15.6261, -61.44361], 15);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var dark = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

var waterColor = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 1,
    maxZoom: 16,
    ext: "jpg",
  }
);

var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

var googleSat = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

// var marker = L.marker([15.6261, -61.44361], 13)
//   .addTo(map)
//   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.");

// var buLayer = L.geoJson(bu_data, {
//   style: {
//     color: "red",
//     fillColor: "blue",
//     fillOpacity: "0.8",
//   },

//   onEachFeature: function (feature, layer) {
//     layer.bindPopup("BU: " + feature.properties.BU);
//   },

//   // filter: function (feature) {
//   //   if (feature.properties.TYPE === "MA_1") {
//   //     return true;
//   //   }
//   // },
// }).addTo(map);

var baseMaps = {
  OSM: osm,
  "Dark Map": dark,
  "Water Color Map": waterColor,
  "Google Street": googleStreets,
  "Google Satellite": googleSat,
};

// var overlayMaps = {
//   Marker: marker,
//   "Building Layer": buLayer,
// };

L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);

// layer on/off checkbox
$(".layer-card-cb").on("change", function () {
  if ($(this).is(":checked")) {
    buLayer.addTo(map);
  } else {
    map.removeLayer(buLayer);
  }
});

//Opacity control
$(".opacity").on("change", function () {
  var val = $(this).val();
  var opacity = val / 100;
  console.log(val);

  buLayer.setStyle({ fillOpacity: opacity, opacity: opacity });
});

// var lpLayer = L.tileLayer
//   .wms("http://localhost:8080/geoserver/wms?", {
//     layers: "gis:LP_2020",
//     transparent: true,
//     format: "image/png",
//   })
//   .addTo(map);

// var buLayerGeoserver = L.tileLayer
//   .wms("http://localhost:8080/geoserver/wms?", {
//     layers: "gis:BU_2020",
//     transparent: true,
//     format: "image/png",
//   })
//   .addTo(map);

function handleLayer(layerName) {
  var layer = L.tileLayer.wms("http://localhost:8080/geoserver/wms?", {
    layers: layerName,
    transparent: true,
    format: "image/png",
  });

  return layer;
}

// handleLayer("gis:LP_2020").addTo(map);

// handleLayer("gis:FL_2020").addTo(map);

layersFromGeoserver.map((layer) => {
  $(".left-sidebar").append(
    layerCardGenerator(
      layer.layerTitle,
      layer.layerName,
      layer.defaultCheck,
      layer.thumbnailUrl,
      layer.description
    )
  );
});
