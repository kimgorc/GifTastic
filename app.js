// Initial array of animals
var animals = [];


// Function for displaying animal data
function animalButtons() {

// Deleting the animal buttons prior to adding new animal buttons
    $("#buttons-view").empty();

// Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

// Then dynamicaly generating buttons for each animal in the array, adding them to a class, giving them a data attribute, changing to text and appending the button to the variable.
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
       
    }
}

// This function handles events where the submit button is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    animal = $("#animal-input").val().trim();
    animals.push(animal);
    animalButtons();

//This function adds on click event for the animal once they are chosen
    $(".animal").on("click", function() {
      animalGif = $(this).attr("data-name")
      console.log("animal", animalGif);

// calling the giphy api
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalGif + "&api_key=dc6zaTOxFJmzC&limit=1";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })

// After the data comes back from the API
      .then(function(response) {
        console.log("API", response)
        var results = response.data;

// Looping over every result item for rating
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div>");

            var rating = response.data[i].rating;
            console.log("rating", rating)

            var p = $("<p>").text("Rating: " + rating);

// Creating an image tag
          var animalImage = $("<img>");

// Giving the image tag an src attribute of a proprty pulled off the
            animalImage.attr("src", response.data[i].images.original.url);

// Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(animalImage);

// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
      
});

});