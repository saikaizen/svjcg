// Code goes here

$(document).ready(function() {
  var map = null;
  var myMarker;
  var myLatlng;
	
	var ori = "";
	var des = "";
	var directionsService="";
	var directionsDisplay="";
	
	var oriMarker;
	var desMarker;
	
	var infowindow = "";

	function initializeGMap(orilat, orilan, deslat, deslan, placeQuery) {
		document.getElementById('right-panel').innerHTML="";
		document.getElementById('map_canvas').innerHTML="";

		ori = new google.maps.LatLng(orilat, orilan);
		des = new google.maps.LatLng(deslat, deslan);

		var myOptions = {
			center: des,
			zoom: 14,
			zoomControl: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		// Direction Service
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer({
			preserveViewport: true,
			draggable: true,
			map: map,
			panel: document.getElementById('right-panel'),
			suppressMarkers: true
		});

		directionsDisplay.addListener('directions_changed', function() {
			computeTotalDistance(directionsDisplay.getDirections());
		});

		displayRoute(ori, des, directionsService, directionsDisplay);

		// Map Markers
		oriMarker = new google.maps.Marker({
			position: ori,
			map: map,
			icon: 'https://www.allen.ac.in/map/icon-place-u.png',
			draggable: true
		});

		desMarker = new google.maps.Marker({
			position: des,
			map: map,
			icon: 'https://www.allen.ac.in/map/icon-allen.png',
		});

		oriMarker.addListener('dragend', handleEvent);
		
		
		infowindow = new google.maps.InfoWindow();
        var placeService = new google.maps.places.PlacesService(map);		
		
		var request = {
			location: map.getCenter(),
			query: placeQuery
		};

		console.log("PlaceQuery: " + placeQuery);
		placeService.textSearch(request, callback);
	}
	
	
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			desMarker.addListener('click', function() {
				console.log("place id: " + results[0]);
				infowindow.setContent('<div><strong>' + results[0].name + '</strong><br>' +
                results[0].formatted_address + '</div>');
                infowindow.open(map, this);
			});
			
	    }
	}
	
	
	
	
	function handleEvent(event) {
		ori = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
		displayRoute(ori, des, directionsService, directionsDisplay);
	}
	
	function displayRoute(origin, destination, service, display) {
        service.route({
          origin: origin,
          destination: destination,
          //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
          travelMode: 'DRIVING',
          //avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }

      function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
      }

  // Re-init map before show modal
  $('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    //initializeGMap(button.data('lat'), button.data('lng'));
	  initializeGMap(button.attr('orilat'), button.attr('orilan'), button.attr('deslat'), button.attr('deslan'), button.attr("placeQuery"));
    $("#location-map").css("width", "100%");
    $("#map_canvas").css("width", "100%");
  });

  // Trigger map resize event after modal shown
  $('#myModal').on('shown.bs.modal', function() {
    google.maps.event.trigger(map, "resize");
    //map.setCenter(myLatlng);
  });
});