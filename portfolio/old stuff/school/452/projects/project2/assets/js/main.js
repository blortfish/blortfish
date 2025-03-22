var map;
$(document).ready(function(){
    init();
});

function init() {
    map = L.map('map').setView([43.083373, -77.676262], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18,
    }).addTo(map);
    var bounds = ([
        [43.122478793917605, -77.98415451049805],
        [43.0686369649885, -77.51085510253906]
    ]);
    map.setMaxBounds(bounds);

}