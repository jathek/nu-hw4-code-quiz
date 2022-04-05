let questions = [
    {
        question: "Color of grass?",
        choices: ["green", "blue", "red"],
        answer: "0",
    },
    {
        question: "Pets allowed at Hogwarts?",
        choices: ["cats", "owls", "toads", "all of the above"],
        answer: "1",
    },
];

let quizHeader = document.querySelector(".quiz-header");
let quizBody = document.querySelector(".quiz-body");
let quizfooterMessage = document.querySelector(".quiz-footer p");

const startButton = document.querySelector("button.start");
startButton.addEventListener("click", startQuiz);
function startQuiz(event) {
    // start timer
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
    // create html for first question
    writeQuestion(0);
}
// questions[0].choices[questions[0].answer]

quizBody.addEventListener("click", advanceQuiz);
function writeQuestion(questionIndex) {
    let quizChoiceOl = document.createElement("ol");
    quizHeader.innerHTML = questions[questionIndex].question;
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

function advanceQuiz(event) {
    if (event.target.matches("button.quiz-choice")) {
        let clickTarget = event.target;
        
        let currentQuestionIndex = clickTarget.dataset.question;
        let choiceIndex = clickTarget.dataset.choice;
        let currentAnswerIndex = questions[currentQuestionIndex].answer;
        if (choiceIndex === currentAnswerIndex) {
            quizfooterMessage.innerText = "Correct!"
        } else {
            quizfooterMessage.innerText = "Wrong!"
        }
        let hideFooter = setTimeout(function () {quizfooterMessage.innerText = ""},1000)
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            writeQuestion(currentQuestionIndex);
        } else {
            console.log(`${currentQuestionIndex} exceeds the questions array.`);
        }
    }
}
