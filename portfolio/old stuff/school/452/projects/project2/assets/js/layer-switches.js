$(document).ready(function(){
	var menu = $('.drop-down');
	var foodSwitch = menu.find('#food');
	var shoppingSwitch = menu.find('#shopping');
	var entertainmentSwitch = menu.find('#entertainment');
	var beerSwitch = menu.find('#beer');
	
	foodSwitch.change( function(){ toggleFood(this); } );
	shoppingSwitch.change( function(){ toggleShopping(this); } );
	entertainmentSwitch.change( function(){ toggleEntertainment(this); } );
	beerSwitch.change( function(){ toggleBeer(this); } );
});

function toggleFood(ele){
    var ico = L.icon({
        iconUrl: 'assets/images/food.png',
        iconSize:     [38, 50], // size of the icon
        iconAnchor:   [17, 51], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    if($(ele).prop('checked')){
        for(var i=0; i < jsonMapData.layers.food.length; i++)
        {
            var item = jsonMapData.layers.food[i];
            var html =
                "<span>"+item.name+"</span>";
            if(item.rating){
                html += "<p>Rating: " + item.rating + " of 5</p>";
            }


            L.marker([ item.lat,   item.lon], {icon: ico}).bindPopup(html).openPopup().addTo(map);
        }
    }
    else{
        $('.leaflet-marker-icon[src="assets/images/food.png"]').remove();
    }
}

function toggleShopping(ele){
    var ico = L.icon({
        iconUrl: 'assets/images/shopping.png',
        iconSize:     [38, 50], // size of the icon
        iconAnchor:   [17, 51], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    if($(ele).prop('checked')){
        for(var i=0; i < jsonMapData.layers.shopping.length; i++)
        {
            var item = jsonMapData.layers.shopping[i];
            var html =
                "<span>"+item.name+"</span>";
            if(item.rating){
                html += "<p>Rating: " + item.rating + " of 5</p>";
            }


            L.marker([ item.lat,   item.lon], {icon: ico}).bindPopup(html).openPopup().addTo(map);
        }
    }
    else{
        $('.leaflet-marker-icon[src="assets/images/shopping.png"]').remove();
    }
}

function toggleEntertainment(ele){
    var ico = L.icon({
        iconUrl: 'assets/images/entertainment.png',
        iconSize:     [38, 50], // size of the icon
        iconAnchor:   [17, 50], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    if($(ele).prop('checked')){
        for(var i=0; i < jsonMapData.layers.entertainment.length; i++)
        {
            var item = jsonMapData.layers.entertainment[i];
            var html =
                "<span>"+item.name+"</span>";
            if(item.rating){
                html += "<p>Rating: " + item.rating + " of 5</p>";
            }


            L.marker([ item.lat,   item.lon], {icon: ico}).bindPopup(html).openPopup().addTo(map);
        }
    }
    else{
        $('.leaflet-marker-icon[src="assets/images/entertainment.png"]').remove();
    }
}


function toggleBeer(ele){
    var ico = L.icon({
        iconUrl: 'assets/images/beer.png',
        iconSize:     [38, 50], // size of the icon
        iconAnchor:   [17, 51], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    if($(ele).prop('checked')){
        for(var i=0; i < jsonMapData.layers.beer.length; i++)
        {
            var item = jsonMapData.layers.beer[i];
            var html =
                "<span>"+item.name+"</span>";
            if(item.rating){
                html += "<p>Rating: " + item.rating + " of 5</p>";
            }


            L.marker([ item.lat,   item.lon], {icon: ico}).bindPopup(html).openPopup().addTo(map);
        }
    }
    else{
        $('.leaflet-marker-icon[src="assets/images/beer.png"]').remove();
    }
}

