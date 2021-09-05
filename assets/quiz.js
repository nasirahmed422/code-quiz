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

        var createDivElement = document.createElement("div");
        createDivElement.setAttribute("id", "createDivElement");
        // Correct condition 
        if (element.textContent == questions[questionCounter].answer) {
            score++;
            createDivElement.textContent = "Your previous answer was Correct!";
            // Correct condition 
        } else {
            // I decideded make the penalty 7 points.
            timeLeft = timeLeft - 7;
            createDivElement.textContent = "Your previous answer was Wrong!";
        }

    }
    // Question Index determines number question user is on
    questionCounter = questionCounter + 1;

    if (questionCounter >= questions.length) {
        // All done will append last page with user stats
        scoreSubmission();
        createDivElement.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        displayQuestions(questionCounter);
    }
    questionsDiv.appendChild(createDivElement);

}

// The following will run after the last question is answered.
function scoreSubmission() {
    questionsDiv.innerHTML = "";
    timerDiv.innerHTML = "";

    //Display All Done message when quiz is done and append to questionsDiv from the original html doc.
    var allDoneElement = document.createElement("h1");
    allDoneElement.setAttribute("id", "allDoneElement");
    allDoneElement.textContent = "All Done!"
    questionsDiv.appendChild(allDoneElement);

    // This will create the element to add the score to display on the main questionsDiv.
    var yourScoreElement = document.createElement("p");
    yourScoreElement.setAttribute("id", "yourScoreElement");
    questionsDiv.appendChild(yourScoreElement);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var pElement = document.createElement("p");
        //Window clearInterval() Method to stop the time.
        clearInterval(timeDisplay);
        yourScoreElement.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(pElement);
    }

    // This will ask you to enter your initials
    var initalsRequestElement = document.createElement("label");
    initalsRequestElement.setAttribute("id", "initalsRequestElement");
    initalsRequestElement.textContent = "Enter your initials: ";
    questionsDiv.appendChild(initalsRequestElement);

    // This is where you input your initials
    var enterInitialsElement = document.createElement("input");
    enterInitialsElement.setAttribute("type", "text");
    enterInitialsElement.setAttribute("id", "enterInitialsElement");
    enterInitialsElement.textContent = "";
    questionsDiv.appendChild(enterInitialsElement);

    // This will create a submit button after the quiz is done.
    var createSubmitElement = document.createElement("button");
    createSubmitElement.setAttribute("type", "submit");
    createSubmitElement.setAttribute("id", "createSubmitElement");
    createSubmitElement.textContent = "Submit";
    questionsDiv.appendChild(createSubmitElement);

    // Event listener to capture initials and local storage for initials and score
    createSubmitElement.addEventListener("click", function () {
        var initials = enterInitialsElement.value;

        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        // We will be reusing the scores page. That is why we are using replace and adding it to that corresponding html file. 
        window.location.replace("assets/scores.html");
    });

}
