var topics = [
  "cats",
  "pandas",
  "kawaii",
  "cookies",
  "sloth",
  "sushi",
  "alpaka",
  "molang",
  "capybara"
];

var results;

function renderButtons() {
  $(".buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>")
      .addClass("topics")
      .attr("data-name", topics[i])
      .text(topics[i]);

    $(".buttons").append(newButton);
  }
}

function addTopicsEventHandler() {
  $(".topics").on("click", function() {
    $(".column").empty();
    var topic = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=27MOifLs9fJsTdJi0I4qPLWbThKW36H8";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      results = response.data;

      var limit = $("#limit").val();
      for (var i = 0; i <= limit; i++) {
        var newDiv = $("<div>");
        var p = $("<p>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var newImage = $("<img>")
          .attr("data-state", "still")
          .addClass("image")
          .attr("data-index", i)
          .attr("src", results[i].images.fixed_width_still.url);
        $(newDiv).append(newImage);
        $(newDiv).append(p);
        $(".pics").css("display", "flex");

        debugger;
        $($(".column")[i % 3]).prepend(newDiv);
      }

      $(".image").on("click", animatePics);
    });
  });
}

function animatePics() {
  var state = $(this).attr("data-state");
  var index = parseInt($(this).attr("data-index"));
  var source;
  var newState;

  if (state === "still") {
    source = results[index].images.fixed_width.url;
    newState = "animate";
  } else {
    source = results[index].images.fixed_width_still.url;
    newState = "still";
  }

  $(this).attr("src", source);
  $(this).attr("data-state", newState);
}

function addCategory(event) {
  event.preventDefault();
  var usersTopic = $("#usersInput")
    .val()
    .trim();
  topics.push(usersTopic);

  renderButtons();
  addTopicsEventHandler();
}

function onReady() {
  renderButtons();
  addTopicsEventHandler();

  $("#add").on("click", addCategory);
  $("body").addClass("fadeIn");
}

$(onReady);
