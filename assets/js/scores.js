let scores = JSON.parse(localStorage.getItem("scores"));

let quizBody = document.querySelector(".quiz-body");
if (scores === null) {
    let scoresEmpty = document.createElement("p");
    scoresEmpty.innerText = "No scores yet!";
    quizBody.appendChild(scoresEmpty);
} else {
    for (let i = 0; i < scores.length; i++) {
        let scoreEntry = document.createElement("li");
        let scoresList = document.createElement("ul");
        let name = scores[i].name;
        let score = scores[i].score;
        scoreEntry.innerText = `${name}: ${score}`;
        quizBody.appendChild(scoresList);
        scoresList.appendChild(scoreEntry);
    }
}

let homeButton = document.querySelector("#go-home");
let clearButton = document.querySelector("#clear-scores");

homeButton.addEventListener("click", function (event) {
    window.location.href = "./index.html";
});
clearButton.addEventListener("click", function (event) {
    localStorage.clear();
});
