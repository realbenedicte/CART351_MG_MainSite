
//lunches.js
//main javascript :)

//ready function
//on document load do stuff :)
$(document).ready(function(){
 console.log("ready");
 //some variables
 //
 let resultContainer = $("#result-container");
 let header = $('header');
 let section = $('section');
 let loaded=false;
 //
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
            populateHeader(data);
            // //step 3: display the books ....
          showDays(data);
          })
          //fail
          .fail(function() {
            console.log( "error" );
          });
        }
        else{
          console.log("data was loaded");
        }
    });


    function populateHeader(data){
          let sampleHeader = $("<h1>");
          $(sampleHeader).text(data.Label);
          $(sampleHeader).appendTo(header);
        }

        //showdays()
        //
        //this function shows every day cause iterates thru each day with a for loop
        function showDays(data){
          let resultContainer = $("#result-container");
          for(let i = 0; i< data.LunchItem.length;i++ ){
          displaySingle(data.LunchItem[i],resultContainer);
          //display single gets a day and a parentContainer
          //in this case it's showing all the days
        }
        }

        //displaySingle()
        //
        //this function handles how to display each day
        function displaySingle(day,parentContainer){
             //make the book container and append to parent
          let singleDayContainer = $("<article>").addClass("single-day").appendTo(parentContainer);
           $.each(day, function( index, value ) {

            if(index ==="Day"){
             //is an array we would need to iterate at do its thing..
             let dayParameter =  $("<p>").addClass("day-parameter").appendTo(singleDayContainer);
             let label =  $("<span>").addClass("single-year-test").appendTo(dayParameter);
             label.text("Day: ");
             theContentArray = value;

             for(let i = 0; i<theContentArray.length; i++){
               let singleDay=  $("<span>").addClass("single-year-test").appendTo(dayParameter);
               singleDay.text(`${theContentArray[i]}`);
             }
           }

           else{
       let dayPropertyPara = $("<p>").addClass("single-day-para").appendTo(singleDayContainer); // creating an element  ** NOT accessing
       dayPropertyPara.html(`${index} : ${value}`);
     }

         });
        } //display single
  });
