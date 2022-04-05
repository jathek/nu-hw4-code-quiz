let questions = [
    {
        question: "Color of grass?",
        choices: ["green", "blue", "red"],
        answer: 0,
    },
    {
        question: "Color of sky?",
        choices: ["green", "blue", "red"],
        answer: 1,
    },
];

let timerSecondsLeft = 75;
let timer = setInterval(function () {
    let timerSpan = document.querySelector("#timeLeft");
    timerSecondsLeft--;
    timerSpan.innerText = `${timerSecondsLeft} seconds left.`;
    if (timerSecondsLeft === 0) {
        clearInterval(timer);
        timerSpan.innerHTML = "Time expired";
    }
}, 1000);

let quizHeader = document.querySelector(".quiz-header");
let quizBody = document.querySelector(".quiz-body");
let quizfooter = document.querySelector(".quiz-footer");

const startButton = document.querySelector("button.start");
startButton.addEventListener("click", startQuiz);
function startQuiz(event) {
    let quizChoiceOl = document.createElement("ol");
    quizHeader.innerHTML = questions[0].question;
    quizChoiceOl.dataset.question = 0;
    quizBody.innerHTML = "";
    quizBody.appendChild(quizChoiceOl);
    for (let i = 0; i < questions[0].choices.length; i++) {
        let choiceLi = document.createElement("li");
        let choiceButton = document.createElement("button");
        choiceButton.dataset.choice = i;
        choiceButton.setAttribute("class", "quiz-choice");
        choiceButton.innerText = questions[0].choices[i];
        quizChoiceOl.appendChild(choiceLi);
        choiceLi.append(choiceButton);
    }
}
// questions[0].choices[questions[0].answer]

quizBody.addEventListener("click", advanceQuestion);
function advanceQuestion(event) {
    if (event.target.matches("button.quiz-choice")) {
        let clickTarget = event.target;
        let currentQuestion = clickTarget.dataset.question;

        currentQuestion++;
        if (currentQuestion < questions.length) {
            let quizChoiceOl = document.createElement("ul");
            let choiceID = clickTarget.getAttribute("data-state");
            console.log(questions[currentQuestion].question);
            quizHeader.innerHTML = questions[currentQuestion].question;
            quizChoiceOl.style("list-style", "none;");
            quizBody.innerHTML = "";
            quizBody.appendChild(quizChoiceOl);
            for (
                let i = 0;
                i < questions[currentQuestion].choices.length;
                i++
            ) {
                let choiceLi = document.createElement("li");
                let choiceButton = document.createElement("button");
                choiceButton.dataset.question = currentQuestion;
                choiceButton.dataset.choice = i;
                choiceButton.innerText = questions[currentQuestion].choices[i];
                quizChoiceOl.appendChild(choiceLi);
                choiceLi.append(choiceButton);
            }
        } else {
            console.log(`${currentQuestion} is the last question.`);
        }
    }
}
