$(document).ready(function () {

  let currentQuery;
  let currentMarket;

  $('#submit').on('click', function () {
    const input = $('.search-input').val().trim();
    console.log(input);
    /* zipAddress(input); */
    apiQuery(input);
  });

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

  // ------------------------------------------- Call this wherever needed to actually handle the display
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

    geocoder.geocode({
      'address': zipCode
    }, function (results, status) {
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

    $.get(`/api/zip/${input}`, function (body, response, err) {
      console.log(input);
      console.log(err);
      currentQuery = body.results;
      console.log(currentQuery);
      console.log(`Markets Found: ${response}`);
      listGenerator(currentQuery);
    });

  }

  function listGenerator(arrayOfMarkets) {
    let listContainer = $('#queryList');
    let list = arrayOfMarkets.map(function(marketData){return marketData});
    list.forEach(marketData => {
      let linkButton = `<a href="/api/${marketData.id}" class="list-group-item list-group-item-action" data-marketId="${marketData.id}">${marketData.marketname}</a>`;
      listContainer.append(linkButton);
    });
    
  }

  function marketInfoGenerator(marketDataObject) {
    $('dataContainer').empty();
    const marketObject = marketDataObject;
    console.log('RIGHT HERE!!!!!! --------> ' + marketObject);
    let dataContainer = $('dataContainer');
    let marketContent = 
    `<div class="marketHeader">
    <h3 id="marketName"></h3>
    <h4 id="address"></h4>
    </div>
    <div class="schedule">
    <p id="schedule"></p>
    </div>
    <div class="productsContainer">
    <ul class="products" id="products"></ul>
    </div>
    <div class="amenitiesContainer">
    <ul id="amentities"></ul>
    </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7098.94326104394!2d78.0430654485247!3d27.172909818538997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1385710909804" width="600" height="450" frameborder="0" style="border:0"></iframe>

    `;
  }
  /* --------------------------------------------------------- Event delegation for market button links */
  $('document').on('click', '.list-group-item', function() {
    let clickedButtonMarketId = $('this').attr('data-marketId');
    alert('marketId: ' + clickedButtonMarketId);
    $.get(`/api/${clickedButtonMarketId}`, function(body, response, err) {
      if(err){console.log(err)};

      // if(body.length) {
      //   $.get(`/api/market-data/${clickedButtonMarketId}`, function(body, response, err){
      //     if (err) { console.log(err) };
      //     marketInfoGenerator(JSON.stringify(body));
      //   });
      // } else {
      //   console.log('you fd up!')
      // }
    }).done(function () {
      $.get(`/api/market-data/${clickedButtonMarketId}`, function (body, response, err) {
        if (err) { throw err};
        console.log('this is the body: ' + body);
        console.log(typeof body);
        console.log('this is the response: ' + response);
        console.log(typeof response);
        marketInfoGenerator(body);
      });
    }) 
  });
});