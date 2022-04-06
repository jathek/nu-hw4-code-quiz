// questions array
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
        question: "Arrays in JavaScript can be used to store ______.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
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
    },
];
// establish initial variables
let quizHeader = document.querySelector(".quiz-header");
let quizBody = document.querySelector(".quiz-body");
let quizfooterMessage = document.querySelector(".quiz-footer p");
let scores = [];
let timerSecondsLeft = 75;
let timer;
let timerSpan = document.querySelector("#timeLeft");

// add click to start button to start quiz
const startButton = document.querySelector("button.start");
startButton.addEventListener("click", startQuiz);
function startQuiz(event) {
    // start timer
    timer = setInterval(function () {
        timerSecondsLeft--;
        timerSpan.innerText = `${timerSecondsLeft} seconds left.`;
        if (timerSecondsLeft <= 0) {
            // if timer ends or goes negative, end quiz and write score form
            clearInterval(timer);
            timerSpan.innerHTML = "Time expired";
            writeScoreForm();
        }
    }, 1000);
    // create html for first question
    writeQuestion(0);
}
// add click to advance quiz to all quiz buttons
quizBody.addEventListener("click", advanceQuiz);
function advanceQuiz(event) {
    if (event.target.matches("button.quiz-choice")) {
        // get current question and choice index from clicked button
        let currentQuestionIndex = event.target.dataset.question;
        let choiceIndex = event.target.dataset.choice;
        // get answer using currentQuestionIndex
        let currentAnswerIndex = questions[currentQuestionIndex].answer;
        // compare choice and answer, write footer, and modify timer accordingly
        if (choiceIndex === currentAnswerIndex) {
            quizfooterMessage.innerText = "Correct!";
        } else {
            quizfooterMessage.innerText = "Wrong!";
            timerSecondsLeft -= 10;
        }
        // empty footer after 2 second
        let hideFooter = setTimeout(function () {
            quizfooterMessage.innerText = "";
        }, 2000);
        // advance currentQuestionIndex and write next question if still within array
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            writeQuestion(currentQuestionIndex);
            // if currentQuestionIndex outside array, clear timer and write score form
        } else {
            clearInterval(timer);
            timerSpan.innerText = `${timerSecondsLeft} seconds left.`;
            writeScoreForm();
        }
    }
}
// write question card using questionIndex received from advanceQuiz
function writeQuestion(questionIndex) {
    let quizChoiceOl = document.createElement("ol");
    // write question to header
    quizHeader.innerHTML = `<h2>${questions[questionIndex].question}</h2>`;
    // iterate through current question object and write li and button elements for choices
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
// write score form
function writeScoreForm() {
    quizHeader.innerHTML = `<h2>Finished with ${timerSecondsLeft} seconds left. Submit your score!</h2>`;
    quizBody.innerHTML =
        '<form id="score-form"><input type="text"><button class="score">Submit</button></form>';
}
// submit listener for score submit button
quizBody.addEventListener("submit", saveScore);
function saveScore(event) {
    if (event.target.matches("#score-form")) {
        event.preventDefault();
        let scoreForm = quizBody.querySelector("#score-form");
        // use time remaining as score
        let currentScore = timerSecondsLeft;
        // get current input
        let nameInput = scoreForm.querySelector("input");
        let name = nameInput.value.trim();
        // create object for current score and name
        let currentRecord = { score: currentScore, name: name };
        // get stored scores from localStorage
        let storedScores = JSON.parse(localStorage.getItem("scores"));
        if (storedScores !== null) {
            scores = storedScores;
        }
        // push current score to scores
        scores.push(currentRecord);
        // store scores in localStorage
        localStorage.setItem("scores", JSON.stringify(scores));
        nameInput.value = "";
        // redirect to scores page
        window.location.href = "./scores.html";
    }
}
