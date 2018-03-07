'use strict';
$(document).ready(function () {

  let currentQuery;
  let currentMarket;


// ----------------------------------------- function that makes the inital farmer bureau API call

  function apiQuery(input) {

    $.post(`/api/zip/${input}`, function (body, response, err) {
      console.log(input);
      console.log(err);
      currentQuery = body.results;
      console.log(currentQuery);
      console.log(`Markets Found: ${response}`);
      listGenerator(currentQuery);
    });

  }

 // --------------------------------------- function gets user input to update mysql table with new market info

  function userInput(id, param, input) {
    $.post(`/api/${id}/${param}/${input}`, function (body, response, err) {
      console.log('created');
    });
  }

// ---------------------------------------- function that generates li elements with db data and appends them to the corresponding DOM container

  function listGenerator(arrayOfMarkets) {
    let listContainer = $('#queryList');
    let list = arrayOfMarkets.map(function(marketData){return marketData});
    list.forEach(marketData => {
      let linkButton = `<a href="/api/${marketData.id}" class="list-group-item list-group-item-action" data-marketid="${marketData.id}">${marketData.marketname}</a>`;
      listContainer.append(linkButton);
    });
    
  }

// --------------------------------------- function that splits the products string into an array and generates an li's, then appends them the corresponding DOM container

  function productSplit(productsString){
    let productContainer = $('#products');
    let productArray = productsString.split(';');

    for (var i = 0; i < productArray.length; i++){
      productContainer.append(`<li>${productArray[i]}</li>`);
    }
  }
// -------------------------------------- function that generates the all market information from db and appends it to the corresponding DOM container

  function marketInfoGenerator(marketDataObject) {
    $('#dataContainer').empty();
    const marketObject = marketDataObject;
    
    if(marketObject.outdoors === null) {
      marketObject.outdoors = 'N/A';
    }
    if (marketObject.restroom === null) {
      marketObject.restroom = 'N/A';
    }
    if (marketObject.alcohol === null) {
      marketDataObject.alcohol = "N/A"
    }
    if (marketObject.petFriendly === null) {
      marketDataObject.petFriendly = "N/A"
    }

   
    let dataContainer = $('dataContainer');
    let marketContent = 
    `<div class="marketHeader">
    <h3 id="marketName">${marketObject.marketname}</h3>
    <h4 id="address">${marketObject.Address}</h4>
    </div>
    <div class="schedule">
    <p id="schedule">${marketObject.Schedule}</p>
    </div>
    <div class="productsContainer">
    <ul class="products" id="products"></ul>
    </div>
    <div class="amenitiesContainer">
    <ul id="amentities">
    <li>${marketObject.outdoors} <input type="text" class="input-val" id=outdoors name="input"><button class=input-submit data-name="outdoors" data-id="${marketObject.usda_id}" type="submit">Submit</button></li> 
    <li>${marketObject.restroom} <input type="text" class="input-val" id=restroom name="input"><button class=input-submit data-name="restromm" data-id="${marketObject.usda_id}" type="submit">Submit</button></li>
    <li>${marketObject.petFriendly} <input type="text" class="input-val" id=petFriendly name="input"><button class=input-submit data-name="petFriendly" data-id="${marketObject.usda_id}" type="submit">Submit</button></li>
    <li>${marketObject.alcohol} <input type="text" class="input-val" id=alcohol name="input"><button class=input-submit data-name="alcohol" data-id="${marketObject.usda_id}" type="submit">Submit</button></li>
    </ul>
    </div>
    <iframe src="${marketObject.GoogleLink}" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
  `;
    
    $('#dataContainer').append(marketContent);

    if (marketObject.Products !== "") {
      productSplit(marketDataObject.Products);
    }

}

// ----------------------------------------------------------- click handler for seach button

  $('#submit').on('click', function () {
    const input = $('.search-input').val().trim();
    console.log(input);
  
    apiQuery(input);
  });

  /* --------------------------------------------------------- Event delegation for market button links */

 
  $(document).on('click', '.list-group-item', function(event) {
    event.preventDefault();
    let clickedButtonMarketId = $(this).attr('data-marketid');
    console.log(clickedButtonMarketId)
    $.post(`/api/${clickedButtonMarketId}`)
    
    .done(function(data) {
      console.log('call completed');
      console.log(data);

      $.get(`/api/market-data/${clickedButtonMarketId}`, function (body) {
        marketInfoGenerator(body);
      })
        .fail(function () {
          alert("error");
        });

    })

    .fail(function(err) {
      console.log(err);
    })



  });

  $(document).on('click', '.input-submit ', function (event) {
    // event.preventDefault();
    const userSubmit = $(".input-val").val().trim();
    const userInputParam = $(".input-submit").attr('data-name');
    const marketId = $(".input-submit").attr('data-id');
    userInput(marketId, userInputParam, userSubmit);

    $.get(`/api/market-data/${marketId}`, function (body) {
      marketInfoGenerator(body);
    })
      .fail(function () {
        alert("error");
      });

  });

});
