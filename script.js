// TODO: Make a timer
//          starts when start quiz button is pressed
//          subtracts time when a wrong answer is pressed
//          when the timer hits 0 the game ends

// TODO: Make the quiz
//          Question text changes when game starts and after questions are entered
//          buttons appear with the answer options
//          when answer is clicked, changes to next question and displays either correct or incorrect
//          if incorrect timer loses time
//          once all questions are answered input name or initials and submit
//          open highscore page
//              EXTRA: randomize quiz questions and answers

// TODO: Make Highscore page
//          on end of quiz and submit highscore or click view highscore show screen with all highscores and a clear button
//          on clear button press remove all highscores


// Timer
const timerDisplay = document.querySelector("#time-left"); 
let timeLeft = 80
let timeInterval

function timer() {
    timeLeft = 80;
    timerDisplay.textContent = timeLeft;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      timerDisplay.textContent = timeLeft;
      timeLeft--; // countdown by 1
      timerDisplay.textContent = timeLeft; // display remaining time
  
      if(timeLeft <= 0) { // when timer hits zero
        timeLeft = 0
        timerDisplay.textContent = timeLeft;
        clearInterval(timeInterval); // stop the timer
        
        gameOver(); 
      }
  
    }, 1000);
  }
  
// all questions available 

let questionList = [
    {
    question: "Which of these are the names of Joe's cats?",
    answers: ["Shiva / Bahamut", "Shiva / Ifrit", "Rahum / Bahamut", "Rahum / Ifrit"],
    correct: 1
    },
    {
    question: "Hammurabi's code, the oldest known legal code, comes from where?",
    answers: ["Ancient Egypt", "Ancient Greece","Babylon","Ancient Rome"],
    correct: 3
    }
]

  // Quiz start
const quizBase = document.querySelector("#welcome");
const startButton = document.querySelector("#quiz-button");
const quizGame = document.querySelector("#quiz");
const quizQuestion = document.querySelector("#question");
const quizEnd = document.querySelector("#quiz-end");
const highScores = document.querySelector("#score-page");
const playAgain = document.querySelector(".play-again");
var quizAnswers = document.getElementsByClassName("answer");
let rightWrong = document.querySelector("#answer-result");
let quizIndex = 0
let shuffledQuiz = []

function showQuestion() {
    
    quizQuestion.textContent = shuffledQuiz[quizIndex].question; // load question into the h1
    for (let i = 0; i < quizAnswers.length; i++) {
    quizAnswers[i].innerHTML = shuffledQuiz[quizIndex].answers[i];    
    } // put answer options into every button
    
  }

function newQuestion() {
    if (quizIndex < (shuffledQuiz.length-1)) {
        quizIndex++; 
        showQuestion();
    } else {
        gameOver()
    }
}
console.log(quizBase)
function quizStart() {
    quizBase.setAttribute("style", "display: none;"); //hide frontpage
    quizEnd.setAttribute("style", "display: none;"); //hide end page
    highScores.setAttribute("style", "display: none;"); //hide highscores page
    quizGame.setAttribute("style", "display: block;"); // display quiz

    shuffledQuiz = questionList.sort((a, b) => 0.5 - Math.random());
    quizIndex = 0
    showQuestion();
    // quizBase.setAttribute("style", "display: block;"); //display quiz page
    timer(); //start time
}

function readAnswer(answer) {
    if (shuffledQuiz[quizIndex].correct == answer) {
        rightWrong.textContent = "Correct!"
    } else {
        timeLeft -= 15;
        rightWrong.textContent = "Wrong."
    }
    newQuestion();
}

startButton.addEventListener("click", quizStart); // start when start button is pressed  \
playAgain.addEventListener("click", quizStart);
document.querySelectorAll(".answer").forEach(element => {
    element.addEventListener("click", event =>{
    const clicked = event.target;
    if (clicked.matches("button")) {
        readAnswer(clicked.value)
    }
})
    
});

// gameover: stop timer at 0 or set to 0 if lower
//      hide quiz screen, show end game screen
//      display too bad try again message if score is 0
//      display you win and enter your initials if score is > 0
//      once you enter score send to highscore screen
const quizResult = document.querySelector("#quiz-result");
const endPrompt = document.querySelector("#result-prompt");
const scoreInput = document.querySelector("#score");

function gameOver() {
    clearInterval(timeInterval)
    quizGame.setAttribute("style", "display: none;")
    quizEnd.setAttribute("style", "display: block;")
    if (timeLeft <= 0) {
        timeLeft = 0;
        quizResult.textContent = "Game Over!"
        endPrompt.textContent = "Better luck next time!"
        scoreInput.setAttribute("style", "display: none;");
    } else {
        quizResult.textContent = "You Win!"
        endPrompt.textContent = "Save your Highscore!"
    }

}
