var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clearButton");
var goBack = document.querySelector("#goBackButton");

// This will clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreive local data 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Go back to quiz
goBack.addEventListener("click", function () {
    window.location.replace("../index.html");
});