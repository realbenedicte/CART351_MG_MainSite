//lunches.js
//main javascript :)

//https://www.w3schools.com/js/js_json_intro.asp
//Each property has a value.
//If you parse the JSON string with a JavaScript program, you can access the data as an object:

//ready function
//on document load do stuff :)
$(document).ready(function() {
  console.log("ready");

  //some variables
  //
  let resultContainer = $("#result-container");
  let singResultContainer = $("#single-result-container");
  let header = $('header');
  let section = $('section');
  let loaded = false;
  let loadedRandom = false;
  let loadedClear = false;
  let jsonData;

  //if any buttons are clicked
  //
  $(":button").click(function(event) {
    //remove startup message
    $(".introText").hide();
  });

  $("#specialMessage").hide(); //special message only shows if user typed wrong input

  //when a page is loaded, load the json file, get data, set global variable  jsonData = data;
  if (loaded === false) {
    $.getJSON('json/lunches.json', function(data) {
        //success
        //step 1: console.log the result
        console.log(data);
        //set boolean to true
        //set global variabl jsonData to data to reuse in other functions :)
        jsonData = data;
        loaded = true;
      })
      //fail, consolge log error
      .fail(function() {
        console.log("error");
      });
  } else {
    console.log("data was loaded");
    jsonData = data;
  };

  //clicking button 'Load All Days'
  //
  //if user clicks on the button with id 'getData' show all the days
  $("#getData").click(function(event) {
    $("#result-container").empty(); //empty the container before displaying again
    showDays(jsonData);
    console.log(jsonData.LunchItem[0]);
  });
  //clicking button 'Load Random Day'
  //
  $("#randomDay").click(function(event) {
    $("#single-result-container").empty(); //empty the day container before displaying new random day
    displayRandomDay(jsonData);
  });

  //clicking home button 'Maxime's Lunches'
  //
  $("#clearDays").click(function(event) {
    $("#single-result-container").empty(); //empty single result container
    $("#result-container").hide(); //hide the result cainter
    $(".introText").show(); //show the intro text
  });

  //clicking home button 'Maxime's Lunches'
  //
  //if submit button is clicked call the getTypedDay function
  $('#submit-button').click(getTypedDay);

  //make sure submit button doesn't reload page
  $("#submitDayForm").submit(function(e) {
    e.preventDefault();
  })

  //the callback function for submit button
  function getTypedDay() {
    $(".introText").hide(); //hide intro text
    $("#result-container").empty();//clear containers intro text
    $("#single-result-container").empty();
    $("#single-result-container").show(); //make sure to show again :)
    let searchItem = $("#searchADay").val(); //submit button id = searchADay, this is the value typed by the user
    console.log(searchItem);
    console.log(jsonData.LunchItem[0].Day); //getting first item in LunchItem array index ===Day, value == name of the day ie. Saturday
    let filteredData = jsonData.LunchItem.filter(getDay);

    function getDay(obj){
    return obj.Day  === searchItem;
      }

    $("#specialMessage").show(); //show this message unless the filter result wrks

    for (let i = 0; i < jsonData.LunchItem.length; i++) {
      if (searchItem === jsonData.LunchItem[i].Day) {//only display the data if it's a Day the LunchiItem array
      displaySingle(filteredData[0], singResultContainer); //displayy our filterTest
      $("#specialMessage").hide();
      }
    }
  }
  //displaySingle(data.LunchItem[0],resultContainer);//displays Saturday :)
  //display a random day :)
  function displayRandomDay(data) {
    $("#result-container").hide();
    $("#single-result-container").show();
    var randomDay = data.LunchItem[Math.floor(Math.random() * data.LunchItem.length)]; //random day in lunchItem json
    displaySingle(randomDay, singResultContainer);
    console.log(randomDay);
  }
  //showdays()
  //
  //this function shows every day cause iterates thru each day with a for loop
  function showDays(data) {
    $("#single-result-container").hide();
    $("#result-container").show(); //show the container
    for (let i = 0; i < data.LunchItem.length; i++) {
      displaySingle(data.LunchItem[i], resultContainer);
      //display single gets a day and a parentContainer
      //in this case it's showing all the days
      console.log('show')
    }
  }
  //displaySingle()
  //
  //this function handles how to display each day
  function displaySingle(day, parentContainer) {
    //make the book container and append to parent
      $("#specialMessage").hide();
    let singleDayContainer = $("<article>").addClass("single-day").appendTo(parentContainer);
    $.each(day, function(index, value) {
      //if it's Day
      //add it to class: 'day-parameter' and id 'singleDayContainer'
      if (index === "Day") {
        let dayParameter = $("<p>").addClass("day-parameter").appendTo(singleDayContainer);
        dayParameter.html(`~` + `${value}` + `~`);
      } else {
        let dayPropertyPara = $("<p>").addClass("single-day-para").appendTo(singleDayContainer); // creating an element  ** NOT accessing
        dayPropertyPara.html(`${index} : ${value}`);
      }
    });
  } //display single
});
