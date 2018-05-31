/*
    Hangman source
    Gamachis Yadesa
    University of Minnesota, bootcamp 2018
*/
//'use strict';

var selectableWords =          // Word list
    [
        "FIREARMS",
        "KNIFE",
        "SPURS",
        "HORSETACK",
        "BANDANNA",
        "CHAPS",
        "COWBOYHAT",
        "COWBOYBOOTS",
        "GLOVES",
        "PANTS",
        "TOBACCO",
        "BOOKS",
        "COAT",
        "KNIFE"
    ];
const numberOfTries = 10;

var lettersGuessed = [];
var currentWordIndex;
var wordGuessed = [];
var guessRemaining = 0;
var hasFinished = false;
var currentWins = 0;
var playAgain = "Press Any Key to Try Again!"
// Game sounds
var keyPressSound = new Audio("assets/sounds/cowboy.wav");
var winSound = new Audio("assets/sounds/Cheering.wav")
var lossSound = new Audio("assets/sounds/OldDoor.wav")
// Events
document.onkeydown = function (event) {
    //
    if (hasFinished) {
        gameReset();
        hasFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            keyPressSound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkStatusWin();
            checkStatusLoss();
        }
    }
}
// 
function checkStatusWin() {
    if (wordGuessed.indexOf("_") === -1) {
        currentWins++;
        keyPressSound.pause();
        keyPressSound.currentTime = 0;
        winSound.play();
        document.getElementById("hangmanImage").src = "assets/images/you-win.jpg";
        document.getElementById("hangmanImage").innerText = playAgain;
        hasFinished = true;
    }
}
// Check Loss
function checkStatusLoss() {
    if (guessRemaining <= 0) {
        keyPressSound.pause();
        keyPressSound.currentTime = 0;
        lossSound.play();
        //document.getElementById("hangmanImage").src="assets/images/gameover.png";
        document.getElementById("hangmanImage").innerText = playAgain;
        hasFinished = true;
    }
}
//  Updates the display on the HTML Page
function updateDisplay() {
    //***********************************************************************/
    // Let's start by grabbing a reference to the <span> below.
    var userText = document.getElementById("user-text");

    // Next, we give JavaScript a function to execute when onkeyup event fires.
    document.onkeyup = function (event) {
        userText.textContent = event.key;
    };
    //***********************************************************************/
    document.getElementById("totalWins").innerText = currentWins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }
    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesRemain").innerText = guessRemaining;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        guessRemaining--;
        updateImages();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};
// This updates the images based on the status of the guessed letter words
function updateImages() {
    //document.getElementById("cowBoyImage").src = "";
    document.getElementById("hangmanImage").src = "assets/images/" + (numberOfTries - guessRemaining) + ".png";
};
//
function gameReset() {
    guessRemaining = numberOfTries;
    //Math. floor to round the random down to the nearest
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    //Clear arrays
    lettersGuessed = [];
    wordGuessed = [];

    // Display cowboys hangout bar image
    //document.getElementById("cowBoyImage").style.cssText = "display: block";

    //Clear the hangmanimage
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        wordGuessed.push("_");
    }

    //Lets hide the images until they are called
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameoverImage").style.cssText = "display: none";
    document.getElementById("youwinImage").style.cssText = "display: none";
}
//
function makeGuess(letter) {
    if (guessRemaining > 0) {
        //
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            evaluateGuess(letter);
        }
    }
};


