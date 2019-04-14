var userPick = []; //Array to hold the user choices Variables declared with the var keyword can have Block Scope.
var correctAnswers = 0;
var wrongAnswers = 0;
var missedAnswers = 0;
var timeDisplay;
var counter = 61;
var intervalID;
var questions = [
    {
        question: "What is the name of Atlanta’s major league baseball team?",
        choices: ["Atlanta Indians", "Atlanta Cubs", "Atlanta Braves", "Atlanta Rams"],
        answer: 2
    },
    {
        question: "Which team did the Chicago Cubs play in the 1945 World Series?",
        choices: ["California Angels", "Detroit Tigers", "Ohio Reds Leggs", "Chicago White Sox"],
        answer: 1
    },
    {
        question: "What was major league baseball’s Yogi Berra’s real name?",
        choices: ["Lawrence Peter Berra", "Jerry Springer", "Angelo Amelio", "George Christain"],
        answer: 0
    },
    {
        question: "The Major League Baseball (MLB) season schedule consists of how many games?",
        choices: ["135", "100", "158", "162"],
        answer: 3
    },

    {
        question: "How many bases did Rickey Henderson steal in 1982?",
        choices: ["178", "222", "130", "57"],
        answer: 2
    },

];
//To capture the missed responses
for (var i = 0; i < questions.length; i++) {
    userPick[i] = null;
}

//Quiz starts 
$(document).ready(function () {

    $("#startGame").on("click", function() {

        // setInterval to stop
        intervalID = setInterval(decrement, 1000);

        writeQuestions();

        $("#startGame").hide();

        SubmitButton();

        $("#quizDone").on("click", function() {
            // console.log("clicked!" + showResults);
            showResults();
        });

        // function for user pick
        $("input").on("click", function() {
            userPick[this.name] = this.value;
            //console.log("input" + userPick[this.name]);
        });
    });
});


function writeQuestions() {
    for (var i = 0; i < questions.length; i++) {
        $("#quizForm").append(questions[i].question + "</br>");
        //console.log("quizForm" + questions[i].question + "</br>");
        for (var x = 0; x < questions[i].choices.length; x++) {
            //console.log("quizForm" + questions[i].choices.length + "</br>");
            $("#quizForm").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questions[i].choices[x] + "</label>");
        }
        $("#quizForm").append("<br/><br/>");
    }
}

function SubmitButton() {
    $("#formSubmit").append("<button id='quizDone' class='btn btn-primary btn-lg'>Done</button>");
    alert("You will have 60 seconds to complete 5 questions.");
}


function decrement() {
    counter--;
    $("#timeRemaining").html("<h2><mark>" + counter + " seconds remaining.</mark></h2>");
    if (counter === 0) {
        alert("Time has expired Whatzup!! ");
        showResults();
    }
}
//Write the results of the quiz answers to the HTML
function showResults() {
    $("#quizForm").hide();
    $("#timeRemaining").hide();
    $("#quizDone").hide();

    for (i = 0; i < questions.length; i++) {
        //correct answer count
        if (questions[i].answer == userPick[i]) {
            correctAnswers++; 
            console.log("Correct Answer " + correctAnswers)
        }
        // Unanswered questions count
        else if (userPick[i] === null) {
            missedAnswers++;
        }
        // wrong answer count
        else {
            wrongAnswers++;
            console.log("Wrong Answer " + wrongAnswers)
        }
    }

    var DONE = $("#quizResults");
    $(DONE).append("<p>ALL DONE!</p>");
    $(DONE).append("<p>Correct Answers: " + correctAnswers + "</p>");
    $(DONE).append("<p>Incorrect Answers: " + wrongAnswers + "</p>");
    $(DONE).append("<p>Unanswered: " + missedAnswers + "</p>");

    clearInterval(intervalID);
}

