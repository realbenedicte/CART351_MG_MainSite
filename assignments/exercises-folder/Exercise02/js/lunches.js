//lunches.js
//main javascript :)

//ready function
//on document load do stuff :)
$(document).ready(function(){
 console.log("ready");
 //some variables
 //
 let resultContainer = $("#result-container");
 let singResultContainer = $("#single-result-container");
 let header = $('header');
 let section = $('section');
 let loaded=false;
 let loadedRandom=false;
 let loadedClear=false;
//if any buttons are clicked
 $(":button").click(function(event){
//remove startup message
 $(".introText").hide();
  });

 //click callback function
 //
 //if user clicks on the button with id 'getData' show all the days
   $("#getData").click(function(event){
     if(loaded ===false){
          console.log("clicked");
          $.getJSON('json/lunches.json',function(data) {
          //success
            //step 1: console.log the result
            console.log(data);
            //set boolean to true
            loaded=true;
            // //step 3: display the days ....
            showDays(data);
             // $("#clearDays").show();
          })
          //fail
          .fail(function() {
            console.log( "error" );
          });
        }
        else{
          console.log("data was loaded");
          $.getJSON('json/lunches.json',function(data) {
          //success
            //step 1: console.log the result
            console.log(data);
            //set boolean to true
            // //step 3: display the days ....
            $("#result-container").empty();//empty the container before displaying again
            showDays(data);
            //displayRandomDay(data);
            // $("#clearDays").show();
          })
        }
    });

      $("#randomDay").click(function(event){
        if(loadedRandom ===false){
             console.log("clicked");
             $.getJSON('json/lunches.json',function(data) {
             //success
               //step 1: console.log the result
               console.log(data);
               //set boolean to true
               loadedRandom=true;
               displayRandomDay(data);
              // $("#clearDays").show();
             })
             //fail
             .fail(function() {
               console.log( "error" );
             });
           }
           else{
             $.getJSON('json/lunches.json',function(data) {
               console.log(data);
                $("#single-result-container").empty();//empty the day container before displaying new random day
               displayRandomDay(data);
               // $("#clearDays").show();
             })
             console.log("data was loaded");
           }
       });

         $("#clearDays").click(function(event){
           console.log('text')
           if(loadedClear ===false ){
                console.log("clicked");
                $.getJSON('json/lunches.json',function(data) {
                //success
                  //step 1: console.log the result
                  console.log(data);
                  //set boolean to true
                  loadedClear=true;
                  $("#single-result-container").empty();
                  $("#result-container").hide();
                  $(".introText").show();//show the intro text

                })
                //fail
                .fail(function() {
                  console.log( "error" );
                });
              }
              else{
                $.getJSON('json/lunches.json',function(data) {
                  console.log(data);
                   $("#single-result-container").empty();
                   $("#result-container").hide();
                   $(".introText").show();//show the intro text
                })
                console.log("data was loaded");
              }
          });

  //displaySingle(data.LunchItem[0],resultContainer);//displays Saturday :)

    //display a random day :)
    function displayRandomDay(data){
      $("#result-container").hide();
      $("#single-result-container").show();
      var randomDay = data.LunchItem[Math.floor(Math.random()*data.LunchItem.length)]; //random day in lunchItem json
      displaySingle(randomDay,singResultContainer);
      console.log(randomDay);
    }

        //showdays()
        //
        //this function shows every day cause iterates thru each day with a for loop
        function showDays(data){
          $("#single-result-container").hide();
          $("#result-container").show();//show the container
          for(let i = 0; i< data.LunchItem.length;i++ ){
          displaySingle(data.LunchItem[i],resultContainer);
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
  let singleDayContainer = $("<article>").addClass("single-day").appendTo(parentContainer);
  $.each(day, function (index, value) {
    if (index === "Day") {
      //is an array we would need to iterate at do its thing..
      let dayParameter = $("<p>").addClass("day-parameter").appendTo(singleDayContainer);
      dayParameter.html(`~` + `${value}` + `~`);
    } else {
      let dayPropertyPara = $("<p>").addClass("single-day-para").appendTo(singleDayContainer); // creating an element  ** NOT accessing
      dayPropertyPara.html(`${index} : ${value}`);
    }
  });
} //display single
  });
