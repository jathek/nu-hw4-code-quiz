let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "2",
    },
    {
        question:
            "The condition in an if/else statement is enclosed within ______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "2",
    },
    {
        question:
            "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "3",
    },
    {
        question:
            "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "2",
    },
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["console log", "terminal/bash", "for loops", "JavaScript"],
        answer: "0",
    }
];

let quizHeader = document.querySelector(".quiz-header");
let quizBody = document.querySelector(".quiz-body");
let quizfooterMessage = document.querySelector(".quiz-footer p");
let scores = [];
let timerSecondsLeft = 75;
let timer;
let timerSpan = document.querySelector("#timeLeft");

const startButton = document.querySelector("button.start");
startButton.addEventListener("click", startQuiz);
function startQuiz(event) {
    // start timer
    timer = setInterval(function () {
        timerSecondsLeft--;
        timerSpan.innerText = `${timerSecondsLeft} seconds left.`;
        if (timerSecondsLeft <= 0) {
            clearInterval(timer);
            timerSpan.innerHTML = "Time expired";
            writeScoreForm();
        }
    }, 1000);
    // create html for first question
    writeQuestion(0);
    // debug shortcut - REMOVE below
    // clearInterval(timer);
    // writeScoreForm();
}

quizBody.addEventListener("click", advanceQuiz);
function advanceQuiz(event) {
    if (event.target.matches("button.quiz-choice")) {
        let currentQuestionIndex = event.target.dataset.question;
        let choiceIndex = event.target.dataset.choice;
        let currentAnswerIndex = questions[currentQuestionIndex].answer;
        if (choiceIndex === currentAnswerIndex) {
            quizfooterMessage.innerText = "Correct!";
        } else {
            quizfooterMessage.innerText = "Wrong!";
            timerSecondsLeft -= 10;
        }
        let hideFooter = setTimeout(function () {
            quizfooterMessage.innerText = "";
        }, 1000);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            writeQuestion(currentQuestionIndex);
        } else {
            clearInterval(timer);
            timerSpan.innerText = `${timerSecondsLeft} seconds left.`;
            writeScoreForm();
        }
    }
}
function writeQuestion(questionIndex) {
    let quizChoiceOl = document.createElement("ol");
    quizHeader.innerHTML = `<h2>${questions[questionIndex].question}</h2>`;
    quizBody.innerHTML = "";
    quizBody.appendChild(quizChoiceOl);
    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        let choiceLi = document.createElement("li");
        let choiceButton = document.createElement("button");
        choiceButton.dataset.choice = i;
        choiceButton.dataset.question = questionIndex;
        choiceButton.setAttribute("class", "quiz-choice");
        choiceButton.innerText = questions[questionIndex].choices[i];
        quizChoiceOl.appendChild(choiceLi);
        choiceLi.append(choiceButton);
    }
}
function writeScoreForm() {
    quizHeader.innerHTML = "<h2>Submit your score!</h2>";
    quizBody.innerHTML =
        '<form id="score-form"><input type="text"><button class="score">Submit</button></form>';
}

quizBody.addEventListener("submit", saveScore);
function saveScore(event) {
    if (event.target.matches("#score-form")) {
        event.preventDefault();
        let scoreForm = quizBody.querySelector("#score-form");
        let currentScore = timerSecondsLeft;
        let nameInput = scoreForm.querySelector("input");
        let name = nameInput.value.trim();
        let currentRecord = { score: currentScore, name: name };
        let storedScores = JSON.parse(localStorage.getItem("scores"));
        if (storedScores !== null) {
            scores = storedScores;
        }
        scores.push(currentRecord);
        localStorage.setItem("scores", JSON.stringify(scores));
        nameInput.value = "";
        window.location.href = "./scores.html";
    }
}
