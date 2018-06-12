// Ready to display on html side
$(document).ready(function () {
    // Define variables
    var clockTime = 25;
    var count = 0;
    var notCorrect = 0;
    var isSelected = false;
    var correctAnswer = 0;
    var clockTicker;
    var notAswered = 0;

    // Arrays for the trivia questions
    var triviaQuestions = ["What does FIFA stands for?",
        "What year was the first world cup held in?", "Which two teams played the 1st ever official international association football match?",
        "Who decided to stage the 1st international football tournament?", "Which country has won the most World Cups?", "Who is a player with a World Cup goal scoring record?",
        "Which country hosts the 2018 World Cup?", "Which country will host the 2022 World Cup?", "What country has played in every World Cup?", "Which country won the 2014 World Cup?"];
    // Arrays for the trivia
    var triviaAnswere = ["Federal International Football Association", "1930", "Scotland vs England", "FIFA president Jules Rimet", "Brazil", "German player Miroslav Klose",
        "Russia", "Qatar", "Brazil", "Germany"];
    // Arrays for first choices
    var choiceOne = ["Football In Field Association", "1872", "Uruguay vs England", "FIFA president Robert Guerin", "England", "German player Miroslav Klose",
        "Russia", "USA", "Brazil", "England"];

    // Arrays for seconed choice
    var choiceTwo = ["Federal International Football Association", "1930", "Scotland vs England", "FIFA president Gianni Infantino", "Italy", "Brazil player Ronaldo",
        "France", "Mexico", "Germany", "Portugal"];

    // Arrays for thired choice
    var choiceThree = ["Football In Federal Assistant", "1908", "France vs England", "FIFA president Jules Rimet", "Germany", "Portugal player Cristiano Ronaldo",
        "Brazil", "Qatar", "France", "Germany"];

    // Arrays for fourth choice
    var choiceFour = ["Football International For All", "1990", "Scotland vs Germany", "FIFA president Sepp Blatter", "Brazil", "Brazil player Pele",
        "Qatar", "Sweden", "Italy", "Scotland"];

    // Show & Hide Functions
    function showHoldersFunc() {
        $("#questionsBox").show();
        $("#choiceBox-1").show();
        $("#choiceBox-2").show();
        $("#choiceBox-3").show();
        $("#choiceBox-4").show();
    }
    function hideHoldersFunc() {
        $("#questionsBox").hide();
        $("#choiceBox-1").hide();
        $("#choiceBox-2").hide();
        $("#choiceBox-3").hide();
        $("#choiceBox-4").hide();
    }
    function resultsHideFunc() {
        $("#correctAnswerBox").hide();
        $("#incorrectAnswerBox").hide();
        $("#unansweredBox").hide();
        $("#restartBox").hide();
    }
    // Display Questions 
    function displayQuestionFunc() {
        resultsHideFunc();
        $("#answerBox").hide();
        $("#imageBox").hide();
        $("#timeBox").show();
        showHoldersFunc();
        $("#questionsBox").html(triviaQuestions[count]);
        $("#choiceBox-1").html(choiceOne[count]);
        $("#choiceBox-2").html(choiceTwo[count]);
        $("#choiceBox-3").html(choiceThree[count]);
        $("#choiceBox-4").html(choiceFour[count]);

        // Hover CSS
        $("#choiceBox-1").hover(function () {
            $(this).css("color", "gray");
        },
            function () {
                $(this).css("color", "black");
            });
        $("#choiceBox-2").hover(function () {
            $(this).css("color", "gray");
        },
            function () {
                $(this).css("color", "black");
            });
        $("#choiceBox-3").hover(function () {
            $(this).css("color", "gray");
        },
            function () {
                $(this).css("color", "black");
            });
        $("#choiceBox-4").hover(function () {
            $(this).css("color", "gray");
        },
            function () {
                $(this).css("color", "black");
            });
    }
    $("#choiceBox-1").on("click", checkAnswerFunction)
    $("#choiceBox-2").on("click", checkAnswerFunction)
    $("#choiceBox-3").on("click", checkAnswerFunction)
    $("#choiceBox-4").on("click", checkAnswerFunction)

    // Check the aswers for the Function
    function checkAnswerFunction() {

        if ($(this).text() === triviaAnswere[count]) {
            stopTimeFunc();
            isSelected = true;
            $("#answerBox").show();
            $("#answerBox").html("Right! The answer is: " + triviaAnswere[count]);
            displayImageFunc();
            correctAnswer++;
            count++;
        }
        else {
            stopTimeFunc();
            isSelected = true;
            $("#answerBox").show();
            $("#answerBox").html("Wrong! The answer is: " + triviaAnswere[count]);
            displayImageFunc();
            notCorrect++;
            count++;
        }

        checkGameEndFunction();
    }
    // Chekc End of Game Function
    function checkGameEndFunction() {
        if (count === triviaQuestions.length) {
            $("#timeBox").hide();
            showResults();
            count = 0;
            $(".btn-primary").show();
            $(".btn-primary").on("click", function () {
                resetResults();
                startGame();
            });
        }
    }

    function resetTimeFunc() {
        clockTime = 10;
    }

    function displayTimeFunc() {
        clockTime--;
        $("#timeBox").html("Time remaining: " + clockTime);

        if (clockTime <= 0) {
            hideHoldersFunc();
            stopTimeFunc();
            $("#answerBox").show();
            $("#answerBox").html("Time is up! The answer is: " + triviaAnswere[count]);
            displayImageFunc();
            notAswered++;
            count++;
            checkGameEndFunction();
        }
    }
    // Function to start time and start tick
    function startTime() {
        clearInterval(clockTicker);
        clockTicker = setInterval(displayTimeFunc, 1000);
    }
    function stopTimeFunc() {
        clearInterval(clockTicker);
        resetTimeFunc();
        if (count < triviaQuestions.length - 1) {
            setTimeout(startTime, 2000);
            setTimeout(displayQuestionFunc, 3000);
        }
    }

    resetTimeFunc();

    // Display Images With Answer
    function displayImageFunc() {
        if (count === 0) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/Fifa-abbreviation.jpg">');
        }
        else if (count === 1) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/Urugay1930.jpg">');
        }
        else if (count === 2) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/EnglandvsScotland.jpg">');
        }
        else if (count === 3) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/Jules_Rimet1920.jpg">');
        }
        else if (count === 4) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/brazilMostWin.jpg">');
        }
        else if (count === 5) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/scoringRecord.jpg">');
        }
        else if (count === 6) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/Russia2018-2.jpg">');
        }
        else if (count === 7) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/qatar2022.jpg">');
        }
        else if (count === 8) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/brazilMostParticipated.jpg">');
        }
        else if (count === 9) {
            $("#imageBox").show();
            $("#imageBox").html('<img src="assets/images/worldcup2014winers.jpg">');
        }
    }
    // Show Results Function   
    function showResults() {
        $("#correctAnswerBox").show();
        $("#correctAnswerBox").html("Correct: " + correctAnswer);
        $("#incorrectAnswerBox").show();
        $("#incorrectAnswerBox").html("Incorrect: " + notCorrect);
        $("#unansweredBox").show();
        $("#unansweredBox").html("Unanswered: " + notAswered);
        $("#restartBox").show();
        $("#restartBox").html("Click Start above to play again!");
    }
    // Reset Results Function 
    function resetResults() {
        correctAnswer = 0;
        notCorrect = 0;
        notAswered = 0;
    }

    // Start Game Function
    function startGame() {
        $(".btn-primary").hide();
        startTime();
        displayQuestionFunc();
    }

    // Start Game On Click
    $(".btn-primary").on("click", function () {
        startGame();
    });
})