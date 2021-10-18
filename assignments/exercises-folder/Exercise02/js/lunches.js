$(document).ready(function(){
  console.log("ready");
 let resultContainer = $("#result-container");

 let header = $('header');
 let section = $('section');
 let loaded=false;

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
          showBooks(data);
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

        function showBooks(data){
          let resultContainer = $("#result-container");
          for(let i = 0; i< data.LunchItem.length;i++ ){
          displaySingle(data.LunchItem[i],resultContainer);
        }
        }
    /** remember this??? */
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
               let singleYear =  $("<span>").addClass("single-year-test").appendTo(dayParameter);
               singleYear.text(`*${theContentArray[i]}*-`);
             }
           }

           else{
       let bookPropertyPara = $("<p>").addClass("single-day-para").appendTo(singleDayContainer); // creating an element  ** NOT accessing
       bookPropertyPara.html(`${index} : ${value}`);
     }

         });
        } //display single
  });
