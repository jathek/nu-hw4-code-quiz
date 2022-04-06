// read current scores from localStorage

let scores = JSON.parse(localStorage.getItem("scores"));
let quizBody = document.querySelector(".quiz-body");
// if scores are empty, write card accordingly
if (scores === null) {
    let scoresEmpty = document.createElement("p");
    scoresEmpty.innerText = "No scores yet!";
    quizBody.appendChild(scoresEmpty);
} else {
    // write ul to hold score list
    let scoresList = document.createElement("ul");
    scoresList.setAttribute("id","scores-list")
    // write li elements for each score
    quizBody.appendChild(scoresList);
    for (let i = 0; i < scores.length; i++) {
        let scoreEntry = document.createElement("li");
        let name = scores[i].name;
        let score = scores[i].score;
        scoreEntry.innerText = `${name}: ${score}`;
        scoresList.appendChild(scoreEntry);
    }
}

// add click listener for #go-home to redirect to quiz start
let homeButton = document.querySelector("#go-home");
homeButton.addEventListener("click", function (event) {
    window.location.href = "./index.html";
});

// add click listener for #clear-scores to clear localStorage of scores
let clearButton = document.querySelector("#clear-scores");
clearButton.addEventListener("click", function (event) {
    localStorage.removeItem("scores");
});
