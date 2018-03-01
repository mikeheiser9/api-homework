$(document).ready(function () {

    //create array of rappers store in variable
    var topics = ["Young Thug", "Gucci Mane", "Migos", "Future", "2 Chainz",
        "Drake", "J. Cole", "Kanye West", "Kendrick Lamar", "Lil Uzi Vert", "Meek Mill", "Nas",
        "ScHoolboy Q", "YG"
    ];


    //create a function to display the gifs
    function displayGif() {


        //create click function that runs the function upon click
        $(document).on("click", ".artistButton", function () {
            var rapper = $(this).attr("data");
            console.log(rapper);
            //query link to API
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                rapper + "&api_key=dc6zaTOxFJmzC&limit=10";
            //Ajax call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                var results = response.data;

                var rapperDiv = $("<div>");

                var rapperImage = $("<img>");

                //not looping thru results for some reason tired results.images.length
                for (var i = 0; i < results.length; i++) {

                    rapperImage.attr("src", results[i].images.fixed_height_small_still.url);

                    rapperDiv.append(rapperImage);

                    $("#gif-goes-here").prepend(rapperDiv);

                }
            })
        })

    };

    $("#submit-btn").on("click", function () {

        var artist = $("#artistSearch").val().trim();

        topics.push(artist);
        console.log(topics);

        $("#topic-holder").empty();

        loop();

    });

    function loop() {

        for (var i = 0; i < topics.length; i++) {
            var buttons = $("<button>" + topics[i] + "</button>")
            buttons.attr("data", topics[i])
            buttons.addClass("artistButton")
            buttons.appendTo("#topic-holder")
        }
    };

    //assign generated img a class? may not have to and just grab image

    // setting up click function on image to prepare to change the state from still to animate

    // $("<img>").on("click", function() {
    //     var state = $(this).attr("data-state")
    //     console.log(state);

    //create if statement that will check if the state of the image is still and if it change the state to animate on button click
    //if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    //   } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    // }



    // });

    loop();
    displayGif();
});