// We first start off by listing the questions and answers.
var questions = [
    {
        question: "Arrays in Javascript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];
// Score Variable
var score = 0;
//questionCounter will help pick a question from var questions up above.
var questionCounter = 0;


// These variables here will help identify some elements on the page from our index.html file which we will be manipulating.
var timerDiv = document.querySelector("#timerDiv");
var startQuiz = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");
var mainContainer = document.querySelector("#mainContainer");

//I set the quiz time to be 60 seconds
var timeLeft = 60;
var timeDisplay = 0;
// This will help create unordered list elements for the question options
var ulElement = document.createElement("ul");

// This will go ahead and start displaying questions with answer choices to the existing div
function displayQuestions(questionCounter) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulElement.innerHTML = "";
    // This loop will help us go through var questions.
    for (var i = 0; i < questions.length; i++) {
        var quizQuestion = questions[questionCounter].question;
        var quizOptions = questions[questionCounter].options;
        questionsDiv.textContent = quizQuestion;
    }
    // Using foreach here to iterate through the options
    quizOptions.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulElement);
        ulElement.appendChild(listItem);
        listItem.addEventListener("click", (compareAnswers));
    })
}

//Upon clicking on the start button a timer will begin.
//The timer will keep running until it reaches 0. The user will see a Time's Up message.
startQuiz.addEventListener("click", function () {

    timeDisplay = setInterval(function () {
        timeLeft = timeLeft - 1;
        timerDiv.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeDisplay);
            scoreSubmission();
            timerDiv.textContent = "Time's up!";
        }
        else;
    }, 1000);
    displayQuestions(questionCounter);
});

// Event to compare answers
function compareAnswers(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionCounter].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionCounter].answer;
            // Correct condition 
        } else {
            // I decideded make the penalty 7 points.
            timeLeft = timeLeft - 7;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionCounter].answer;
        }

    }
    // Question Index determines number question user is on
    questionCounter = questionCounter + 1;

    if (questionCounter >= questions.length) {
        // All done will append last page with user stats
        scoreSubmission();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        displayQuestions(questionCounter);
    }
    questionsDiv.appendChild(createDiv);

}
