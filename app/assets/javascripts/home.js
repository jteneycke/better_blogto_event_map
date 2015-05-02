$(document).ready(function(){

  var styles = [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}]

  var map = new GMaps({
    el: '#map_canvas',
    lat: 43.6529083,
    lng: -79.3981501,
    zoom: 14,
    styles: styles
  });

  window.my_map = map

  $.getJSON('/events.json', function(data) { 
    $.each( data.events, function(i, value) {

      var details = {
        title:   value.title,
        venue:   value.venue,
        address: value.address,
        time:    value.time,
        content: value.body,
        website: value.website
      }
      var template = $('#template').html();
      var rendered = Mustache.render(template, details)

      map.addMarker({
        lat: value.latitude,
        lng: value.longitude,
        title: value.title,
        icon: "/" + _.sample(["yoga", "war", "wetlands", "windturbine"]) + ".png",
        click: function(e) {
          $("#event_details").html(rendered)
          $("#event_details").scrollTop(0)
        }
      });

    });
  })

  window.my_counter = 0
  window.my_path = function() {
    var dest   = window.my_map.markers[window.my_counter]
    window.my_map.drawRoute({
      origin: [43.6672691,-79.4278474],
      destination: [dest.position.k, dest.position.B],
      travelMode: 'biking',
      strokeColor:  _.sample(["#d11141","#00b159","#00aedb","#f37735","#ffc425"]),
      strokeOpacity: 0.6,
      strokeWeight: 6
    });
    window.my_counter++
    if (window.my_counter > window.my_map.markers.length) {
      window.my_counter = 0
      console.log("Reseting counter")
    }
    console.log({
      "Route": _.last(window.my_map.routes),
      "Destination": dest.position.k + " " + dest.position.B
    })
  }



})
