// Ready to display on html side
$(document).ready(function () {
    // Generates random number between 19 -120 to generated and shown at the start of the game.
    var random = Math.floor(Math.random() * 101 + 19)

    // Display random number between 1-12 for each crystal
    var num1 = Math.floor(Math.random() * 11 + 1)
    var num2 = Math.floor(Math.random() * 11 + 1)
    var num3 = Math.floor(Math.random() * 11 + 1)
    var num4 = Math.floor(Math.random() * 11 + 1)

    // Varialbes to keep track of game status, Wins and Losses
    var yourtotal = 0;
    var wins = 0;
    var losses = 0;

    //Declaring varialbes for wins and losses
    $("#displayRandomNumber").html(random);
    $("#numberofWins").html(wins);
    $("#numberofLosses").html(losses);

    // Reset the game
    function gameReset() {
        random = Math.floor(Math.random() * 101 + 19);
        console.log(random)
        $("#displayRandomNumber").html(random);
        num1 = Math.floor(Math.random() * 11 + 1);
        num2 = Math.floor(Math.random() * 11 + 1);
        num3 = Math.floor(Math.random() * 11 + 1);
        num4 = Math.floor(Math.random() * 11 + 1);
        yourtotal = 0;
        $("#totalScore").html(yourtotal);
    }
    // Display wins
    function yayWiner() {
        alert("Yehaaaa! You Won!");
        wins++;
        $("#numberofWins").html(wins);
        gameReset();
    }

    // Display losses
    function ohLoser() {
        alert("Oh No! You lose!");
        losses++;
        $("#numberofLosses").html(losses);
        gameReset();
    }

    // Blue Crystal click function
    $("#crstlBlue").on("click", function () {
        yourtotal = yourtotal + num1;
        console.log("Your Total = " + yourtotal);
        $("#totalScore").html(yourtotal);
        // chck to see win or lose condition
        if (yourtotal == random) {
            yayWiner();
        }
        else if (yourtotal > random) {
            ohLoser();
        }
    })
    // Yellow Crystal click function
    $("#crstlYellow").on("click", function () {
        yourtotal = yourtotal + num2;
        console.log("Your Total = " + yourtotal);
        $("#totalScore").html(yourtotal);
        // chck to see win or lose condition
        if (yourtotal == random) {
            yayWiner();
        }
        else if (yourtotal > random) {
            ohLoser();
        }
    })
    // DarkBlue Crystal click function
    $("#crstlBlueDark").on("click", function () {
        yourtotal = yourtotal + num3;
        console.log("Your Total = " + yourtotal);
        $("#totalScore").html(yourtotal);
        // chck to see win or lose condition
        if (yourtotal == random) {
            yayWiner();
        }
        else if (yourtotal > random) {
            ohLoser();
        }
    })
    // DarkBlue Crystal click function
    $("#crstlRocks").on("click", function () {
        yourtotal = yourtotal + num4;
        console.log("Your Total = " + yourtotal);
        $("#totalScore").html(yourtotal);
        // chck to see win or lose condition
        if (yourtotal == random) {
            yayWiner();
        }
        else if (yourtotal > random) {
            ohLoser();
        }
    })
});
/*
    // Notice I didn't set $(".jumbotron") to a var this time?
    // If you only plan to use that selector once it doesn't need to be a var
    $("#random-button").on("click", function () {

        // ... we generate a random number
        var random = Math.floor(Math.random() * 1000) + 1;

        // ... and then dump the random number into our random-number div.
        $("#random-number").text(random);

    });

    // Initial Variables
    var computerPick = Math.floor(Math.random() * 4) + 1;
    var lockGame = false;

    // We log the computer's pick to console to make it easier to troubleshoot
    console.log("Computer Pick: " + computerPick);

    // Here we create the on click event that gets the user"s pick
    $(".btn-choice").on("click", function () {

        // Here this lockGame line prevents the user from changing the option after the game is done.
        if (lockGame !== true) {

            // We get the value associated with the button the user picked from here
            var yourPick = $(this).val();
            console.log("Your Pick: " + yourPick);

            // We then reveal the computer's pick in the html
            $("#computer-pick").text(computerPick);

            // If your pick matched the computer's pick you let them know.
            if (parseInt(yourPick) === computerPick) {
                $("#result").text("Yep! You got it! Refresh the page to play again.");
                lockGame = true;
            }

            // If the numbers did not match. You also let them know
            else {
                $("#result").text("Nope. Refresh the page to play again.");
                lockGame = true;
            }
        }

    });
*/

