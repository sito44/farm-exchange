$(document).ready(function () {

  $('#submit').on('click', function () {
    const input = $('.search-input').val().trim();
    // console.log(input);
    zipAddress(input);
    apiQuery(input);
  })


  // GOOGLE MAPS 
  var geocoder; //To use later
  var map; //Your map
  function initMap() {
    geocoder = new google.maps.Geocoder();
    //Default setup
    var latlng = new google.maps.LatLng(32.7157, -117.1611);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
  }

  //Call this wherever needed to actually handle the display
  function zipAddress(zipCode) {

    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';

    geocoder.geocode({ 'address': zipCode }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //Got result, center the map and put it out there
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function () {
          infowindow.open(map, marker);
        });

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  function apiQuery(input) {
    const inputString = $('this').data();

    $.post('/api/zip/zipcode', inputString, function(response){
      console.log(`Markets Found: ${response}`);
    });

  }
});