$(document).ready(function () {

    //create array of rappers store in variable
    var topics = ["Young Thug", "Gucci Mane", "Migos", "Future", "2 Chainz",
        "Drake", "J. Cole", "Kanye West", "Kendrick Lamar", "Lil Uzi Vert", "Meek Mill", "Nas",
        "ScHoolboy Q", "YG"
    ];


    //create a function to display the gifs
    function displayGif() {


        //create click function that runs the function upon click
        $(document).on("click", ".artistButton", function() {
            var rapper = $(this).attr("data");
            console.log(rapper);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                rapper + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                var results = response.data;

                var rapperDiv = $("<div>");

                var rapperImage = $("<img>");

                for (var i = 0; i < results.length; i++) {

                    rapperImage.attr("src", results[i].images.fixed_height_small_still
                        .url
                    );

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

    //assign generated img a class? may not have to and just grab ima g
    //


    function loop() {

        for (var i = 0; i < topics.length; i++) {
            var buttons = $("<button>" + topics[i] + "</button>")
            buttons.attr("data", topics[i])
            buttons.addClass("artistButton")
            buttons.appendTo("#topic-holder")
        }
    };

    $("<img>").on("click", function() {
        var state = $(this).attr("data-state")
        console.log(state);
    });

    loop();
    displayGif();
});