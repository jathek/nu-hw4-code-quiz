let scores = JSON.parse(localStorage.getItem("scores"));

for (let i = 0; i < scores.length; i++) {
    let scoresList = document.querySelector("#scores-list");
    let scoreEntry = document.createElement("li");
    let name = scores[i].name;
    let score = scores[i].score;
    scoreEntry.innerText = `${name}: ${score}`;
    scoresList.appendChild(scoreEntry);
}
