/*
    Rock Paper Scissor
    Gamachis Yadesa
    University of Minnesota, bootcamp 2018
*/
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDJiiF3xsKm7oRbnoNvwdGCzIGs5526Rvc",
    authDomain: "rockpaperscissordb.firebaseapp.com",
    databaseURL: "https://rockpaperscissordb.firebaseio.com",
    projectId: "rockpaperscissordb",
    storageBucket: "rockpaperscissordb.appspot.com",
    messagingSenderId: "93630317133"
};
// Create a variable to reference the database
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").text(snap.numChildren());
});

//Store objects for players
var storePlayer1 = null;
var storePlayer2 = null;
var computerPlyer = null;

//Store name of players
var nameOfplayer1 = "";
var nameOfplayer2 = "";
var computerPlayer = "";
//Store player choices
var choiceOfplayer1 = "";
var choiceOfplayer2 = "";
var choiceOfcomputer = "";
// Game status and Turen
var isGameOn = 0;
var currentTurn = 1;

// --------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref("/playerData").on("value", function (snapshot) {
    // Display status to starting game

    // Check the existence of players
    if (snapshot.child("storePlayer1").exists()) {

        storePlayer1 = snapshot.val().storePlayer1;
        nameOfplayer1 = storePlayer1.name;

        //update player HTML to reflect the newly updated local values
        document.getElementById("player1Status").style.cssText = "display: none";
        $("#player1Name").text(nameOfplayer1);
        //$("#playerStatusWins").html("Win: " + storePlayer1.win + ", Loss: " + storePlayer1.loss + ", Tie: " + storePlayer1.tie);

        // Print the local data to the console.
        console.log("player 1 exists");
    }
    else {

        storePlayer1 = null;
        nameOfplayer1 = "";

        // Update player1 display
        $("#player1Status").text("Waiting for Player 1...");
        document.getElementById("optionRock1").style.cssText = "display: none";
        document.getElementById("optionPaper1").style.cssText = "display: none";
        document.getElementById("optionScissors1").style.cssText = "display: none";

        //$("#playerPanel1").removeClass("playerPanelTurn");
        //$("#playerPanel2").removeClass("playerPanelTurn");
        //database.ref("/outcome/").remove();
        //$("#roundOutcome").html("Rock-Paper-Scissors");
        //$("#waitingNotice").html("");
        //$("#player1Stats").html("Win: 0, Loss: 0, Tie: 0");

        // Print the local data to the console.
        console.log("Player 1 does NOT exist");
    }

    // Check for existence of player 2 in the database
    if (snapshot.child("storePlayer2").exists()) {

        // Record player2 data
        storePlayer2 = snapshot.val().storePlayer2;
        nameOfplayer2 = storePlayer2.name;

        // Update player2 display
        $("#player2Name").text(nameOfplayer2);
        //$("#player2Stats").html("Win: " + player2.win + ", Loss: " + player2.loss + ", Tie: " + player2.tie);

        //update player HTML to reflect the newly updated local values
        document.getElementById("player2Status").style.cssText = "display: none";
        $("#player2Name").text(nameOfplayer2);

        // Print the local data to the console.
        console.log("Player 2 exists");
    }
    else {

        console.log("Player 2 does NOT exist");

        //playerDefaultState();
        storePlayer2 = null;
        nameOfplayer2 = "";

        // Update player2 display
        $("#player2Status").text("Waiting for Player 2...");
        document.getElementById("optionRock2").style.cssText = "display: none";
        document.getElementById("optionPaper2").style.cssText = "display: none";
        document.getElementById("optionScissors2").style.cssText = "display: none";
        //$("#playerPanel1").removeClass("playerPanelTurn");
        //$("#playerPanel2").removeClass("playerPanelTurn");
        //database.ref("/outcome/").remove();
        //$("#roundOutcome").html("Rock-Paper-Scissors");
        //$("#waitingNotice").html("");
        //$("#player2Stats").html("Win: 0, Loss: 0, Tie: 0");


    }

    // If both players are now present, it's player1's turn
    if (storePlayer1 && storePlayer2) {
        // Update the display with a green border around player 1
        $("#playerPanel1").addClass("playerPanelTurn");

        // Update the center display
        $("#player1Status").html("Make your choice...");
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------
// Whenever a user clicks the click button
$("#add-name").on("click", function (event) {
    event.preventDefault();

    if (($("#name-input").val().trim() !== "") && !(storePlayer1 && storePlayer2)) {
        // Get the input values

        if (storePlayer1 == null) {
            console.log("adding player 1");

            var newNameOfplayer1 = $("#name-input").val().trim();
            nameOfplayer1 = newNameOfplayer1;
            document.getElementById("player1Status").style.cssText = "display: none";
            // Log the Bidder and Price (Even if not the highest)
            console.log(newNameOfplayer1);

            $("#player1Name").text(nameOfplayer1);
        }
        // Add player1 to the database
        database.ref().child("/playerData/player1Status").set(player1Status);

        // Set the turn value to 1, as player1 goes first
        database.ref().child("/turn").set(1);
            
    }
});


function playerDefaultState() {
    if (isGameOn === 0) {
        //Lets hide the text options until they are called
        document.getElementById("optionRock1").style.cssText = "display: none";
        document.getElementById("optionRock2").style.cssText = "display: none";
        document.getElementById("optionRock3").style.cssText = "display: none";

        choiceOfplayer1 = "";
        choiceOfplayer2 = "";
        choiceOfcomputer = "";
    }
}


// //$("#add-Player-btn").on("click", function(snapshot))

// // All of our connections will be stored in this directory.
// var connectionsRef = database.ref("/connections");

// // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
// var connectedRef = database.ref(".info/connected");

// // When the client's connection state changes...
// connectedRef.on("value", function(snap) {

//     // If they are connected..
//     if (snap.val()) {

//       // Add user to the connections list.
//       var con = connectionsRef.push(true);
//       // Remove user from the connection list when they disconnect.
//       con.onDisconnect().remove();
//     }
//   });

//   // When first loaded or when the connections list changes...
// connectionsRef.on("value", function(snap) {

//     // Display the viewer count in the html.
//     // The number of online users is the number of children in the connections list.
//     $("#player1StatusDisplay").text(snap.numChildren());
//   });

// // Initial Values
// var name = "";

// database.ref().on("value")

// // Capture Button Click
// $("#add-player").on("click", function (event) {
//     // Don't refresh the page!
//     event.preventDefault();

//     // YOUR TASK!!!
//     // Code in the logic for storing and retrieving the most recent user.
//     // Don't forget to provide initial data to your Firebase database.
//     var plyerName = $("#inputName").val().trim();

//     // Creates local "temporary" object for holding employee data
//     var newEmp = {
//         name: plyerName,
//     };
//     // Uploads player data to the database
//     database.ref().push(newEmp);

//     // Logs everything to console
//     console.log(newEmp.name);

//     // Clears all of the text-boxes
//     $("#inputName").val("");
// });
// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function (childSnapshot, prevChildKey) {

//     // Log everything that's coming out of snapshot
//     console.log(childSnapshot.val());

//     // Store everything into a variable.
//     var plyerName = childSnapshot.val().name;

//     console.log(plyerName);

//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

// /* var selectableWords =          // Word list
//     [
//         "FIREARMS",
//         "KNIFE",
//         "SPURS",
//         "HORSETACK",
//         "BANDANNA",
//         "CHAPS",
//         "COWBOYHAT",
//         "COWBOYBOOTS",
//         "GLOVES",
//         "PANTS",
//         "TOBACCO",
//         "BOOKS",
//         "COAT",
//         "KNIFE"
//     ];
// const numberOfTries = 10;

// var lettersGuessed = [];
// var currentWordIndex;
// var wordGuessed = [];
// var guessRemaining = 0;
// var hasFinished = false;
// var currentWins = 0;
// var playAgain = "Press Any Key to Try Again!"
// // Game sounds
// var keyPressSound = new Audio("assets/sounds/cowboy.wav");
// var winSound = new Audio("assets/sounds/Cheering.wav")
// var lossSound = new Audio("assets/sounds/OldDoor.wav")
// // Events
// document.onkeydown = function (event) {
//     //
//     if (hasFinished) {
//         gameReset();
//         hasFinished = false;
//     } else {
//         if (event.keyCode >= 65 && event.keyCode <= 90) {
//             keyPressSound.play();
//             makeGuess(event.key.toUpperCase());
//             updateDisplay();
//             checkStatusWin();
//             checkStatusLoss();
//         }
//     }
// }
// // 
// function checkStatusWin() {
//     if (wordGuessed.indexOf("_") === -1) {
//         currentWins++;
//         keyPressSound.pause();
//         keyPressSound.currentTime = 0;
//         winSound.play();
//         document.getElementById("hangmanImage").src = "assets/images/you-win.jpg";
//         document.getElementById("hangmanImage").innerText = playAgain;
//         hasFinished = true;
//     }
// }
// // Check Loss
// function checkStatusLoss() {
//     if (guessRemaining <= 0) {
//         keyPressSound.pause();
//         keyPressSound.currentTime = 0;
//         lossSound.play();
//         //document.getElementById("hangmanImage").src="assets/images/gameover.png";
//         document.getElementById("hangmanImage").innerText = playAgain;
//         hasFinished = true;
//     }
// }
// //  Updates the display on the HTML Page
// function updateDisplay() {
//     //***********************************************************************/
//     // Let's start by grabbing a reference to the <span> below.
//     var userText = document.getElementById("user-text");

//     // Next, we give JavaScript a function to execute when onkeyup event fires.
//     document.onkeyup = function (event) {
//         userText.textContent = event.key;
//     };
//     //***********************************************************************/
//     document.getElementById("totalWins").innerText = currentWins;

//     // Display how much of the word we've already guessed on screen.
//     // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
//     var guessingWordText = "";
//     for (var i = 0; i < wordGuessed.length; i++) {
//         guessingWordText += wordGuessed[i];
//     }
//     //
//     document.getElementById("currentWord").innerText = guessingWordText;
//     document.getElementById("guessesRemain").innerText = guessRemaining;
//     document.getElementById("lettersGuessed").innerText = lettersGuessed;
// };

// // This function takes a letter and finds all instances of 
// // appearance in the string and replaces them in the guess word.
// function evaluateGuess(letter) {
//     // Array to store positions of letters in string
//     var positions = [];

//     // Loop through word finding all instances of guessed letter, store the indicies in an array.
//     for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
//         if (selectableWords[currentWordIndex][i] === letter) {
//             positions.push(i);
//         }
//     }
//     // if there are no indicies, remove a guess and update the hangman image
//     if (positions.length <= 0) {
//         guessRemaining--;
//         updateImages();
//     } else {
//         // Loop through all the indicies and replace the '_' with a letter.
//         for (var i = 0; i < positions.length; i++) {
//             wordGuessed[positions[i]] = letter;
//         }
//     }
// };
// // This updates the images based on the status of the guessed letter words
// function updateImages() {
//     //document.getElementById("cowBoyImage").src = "";
//     document.getElementById("hangmanImage").src = "assets/images/" + (numberOfTries - guessRemaining) + ".png";
// };
// //
// function gameReset() {
//     guessRemaining = numberOfTries;
//     //Math. floor to round the random down to the nearest
//     currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

//     //Clear arrays
//     lettersGuessed = [];
//     wordGuessed = [];

//     // Display cowboys hangout bar image
//     //document.getElementById("cowBoyImage").style.cssText = "display: block";

//     //Clear the hangmanimage
//     for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
//         wordGuessed.push("_");
//     }

//     //Lets hide the images until they are called
//     document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
//     document.getElementById("gameoverImage").style.cssText = "display: none";
//     document.getElementById("youwinImage").style.cssText = "display: none";
// }
// //
// function makeGuess(letter) {
//     if (guessRemaining > 0) {
//         //
//         if (lettersGuessed.indexOf(letter) === -1) {
//             lettersGuessed.push(letter);
//             evaluateGuess(letter);
//         }
//     }
// };

