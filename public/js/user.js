'use strict';
$(document).ready(function () {

  let currentQuery;
  let currentMarket;
  let prevZip;
  refreshPage();

  function refreshPage() {
    $('#main-image').on('click', function () {
      location.reload();
    })
  }


  // ----------------------------------------- function that makes the inital farmer bureau API call

  function apiQuery(input) {
    prevZip = input;
    if (prevZip) {
      $.post(`/api/zip/${input}`, function (body, response, err) {
        console.log(input);
        console.log(err);
        currentQuery = body.results;
        console.log(currentQuery);
        console.log(`Markets Found: ${response}`);
        listGenerator(currentQuery);
      });
    }

  }

  // --------------------------------------- function gets user input to update mysql table with new market info

  function userInput(id, param, input) {
    $.post(`/api/${id}/${param}/${input}`, function () {
        console.log('created');
      })
      .done(function (data) {
        console.log(data);
        $.get(`/api/market-data/${id}`, function (body) {
            marketInfoGenerator(body);
            console.log('updated');
          })
          .fail(function () {
            alert("error");
          });
      })
      .fail(function (err) {
        console.log(err);
      })

  }

  // ---------------------------------------- function that generates li elements with db data and appends them to the corresponding DOM container

  function listGenerator(arrayOfMarkets) {

    let listContainer = $('#queryList');
    listContainer.empty();
    let list = arrayOfMarkets.map(function (marketData) {
      return marketData
    });
    list.forEach(marketData => {
      let linkButton = `<a href="/api/${marketData.id}" class="list-group-item list-group-item-action" data-marketid="${marketData.id}">${marketData.marketname}</a>`;
      listContainer.append(linkButton);
    });

  }

  // --------------------------------------- function that splits the products string into an array and generates an li's, then appends them the corresponding DOM container

  function productSplit(productsString) {
    let productContainer = $('#products');
    let productArray = productsString.split(';');

    for (var i = 0; i < productArray.length; i++) {
      productContainer.append(`<li class="productList">${productArray[i]}</li>`);
    }
  }
  // -------------------------------------- function that generates the all market information from db and appends it to the corresponding DOM container

  function marketInfoGenerator(marketDataObject) {
    dataContainerEmpty();
    const marketObject = marketDataObject;

    if (marketObject.outdoors === null) {
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


    backButtonAppender();
    let marketContent =
      `<div class="info">
      <div class="img">
      <img class="center-block" id="farm" src="../img/farm.png" alt="farm"> 
      </div>     
    <div class="marketHeader">
      <h3 class="text-center" id="marketName">${marketObject.marketname}</h3>
    </div>
    <div class=" addressTime">
      <ul class="infoList">
        <li><span class="text-center" id="address">Address: </span><span>${marketObject.Address}</span></li>
        <li id="scheduleStyle"><span class="text-center" id="schedule">Schedule: </span><span>${marketObject.Schedule}</span></li>
        <ul><span class="text-center" id="products">Products: </span></ul>
      </ul>
     </div>
    <div class="amenitiesContainer">
    <ul id="amentities">
      <li class="item">Outdoors: ${marketObject.outdoors} <button class="input-submit" data-val="yes" data-name="outdoors" data-id="${marketObject.usda_id}" type="submit">Yes</button>  <button class="input-submit" data-val="no" data-name="outdoors" data-id="${marketObject.usda_id}" type="submit">No</button></li>
    <li class="item">Restrooms: ${marketObject.restroom}  <button class="input-submit" data-val="yes" data-name="restroom" data-id="${marketObject.usda_id}" type="submit">Yes</button> <button class="input-submit" data-val="no" data-name="restroom" data-id="${marketObject.usda_id}" type="submit">No</button></li>
    <li class="item">Pet Friendly: ${marketObject.petFriendly}  <button class="input-submit" data-val="yes" data-name="petFriendly" data-id="${marketObject.usda_id}" type="submit">Yes</button> <button class="input-submit" data-val="no" data-name="petFriendly" data-id="${marketObject.usda_id}" type="submit">No</button></li>
    <li class="item">Alcohol: ${marketObject.alcohol} <button class="input-submit" data-val="yes" data-name="alcohol" data-id="${marketObject.usda_id}" type="submit">Yes</button>  <button class="input-submit" data-val="no" data-name="alcohol" data-id="${marketObject.usda_id}" type="submit">No</button></li>
    </ul>
    </div>
    <button><a class="directions" href="${marketObject.GoogleLink}" target="_blank">DIRECTIONS</a></button>
  `;

    $('#dataContainer').append(marketContent);

    if (marketObject.Products !== "") {
      productSplit(marketDataObject.Products);
    }

  }

  // ---------------------------------------------- Empty main data Container function
  function dataContainerEmpty() {
    $('#dataContainer').empty();
  }

  // ---------------------------------------------- function that appends back button and creates an event handler for that instants 

  function backButtonAppender() {
    let backButton = `<button id="backButton">Back</button>`;
    $('#dataContainer').append(backButton);

  }


  // ----------------------------------------------------------- click handler for seach button

  $('#submit').on('click', function () {
    const input = $('.search-input').val().trim();
    console.log(input);

    apiQuery(input);
  });

  /* --------------------------------------------------------- Event delegation for market button links */


  $(document).on('click', '.list-group-item', function (event) {
    event.preventDefault();
    let clickedButtonMarketId = $(this).attr('data-marketid');
    console.log(clickedButtonMarketId)
    $.post(`/api/${clickedButtonMarketId}`)

      .done(function (data) {
        console.log('call completed');
        console.log(data);

        $.get(`/api/market-data/${clickedButtonMarketId}`, function (body) {
            marketInfoGenerator(body);
          })
          .fail(function () {
            alert("error");
          });

      })

      .fail(function (err) {
        console.log(err);
      })


  });

  $(document).on('click', '.input-submit', function (event) {
    // event.preventDefault();    
    const userSubmit = $(this).attr('data-val');
    const userInputParam = $(this).attr('data-name');
    const marketId = $(this).attr('data-id');

    userInput(marketId, userInputParam, userSubmit);
    console.log(userInputParam);
    console.log(marketId);


  });

  $(document).on('click', '#backButton', function () {
    dataContainerEmpty();
    const dataBox = $('#dataContainer');
    let listBox = '<div class="list-group" id="queryList"></div>';
    dataBox.append(listBox);

    apiQuery(prevZip);
  });

});