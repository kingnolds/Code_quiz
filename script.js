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

const questionList = [
    {
    question: "Which of these are the names of Joe's cats?",
    answers: ["Shiva / Bahamut", "Shiva / Ifrit", "Rahum / Bahamut", "Rahum / Ifrit"],
    correct: "Shiva / Bahamut"
    },
    {
    question: "Hammurabi's code, the oldest known legal code, comes from where?",
    answers: ["Babylon", "Ancient Egypt", "Ancient Greece","Ancient Rome"],
    correct: "Babylon"
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
let shuffledAnswers = []

function showQuestion() {
    
    quizQuestion.textContent = shuffledQuiz[quizIndex].question; // load question into the h1
    for (let i = 0; i < quizAnswers.length; i++) {
    quizAnswers[i].textContent = shuffledQuiz[quizIndex].answers[i];    
    } // put answer options into every button
    
  }

function newQuestion() {
    if (quizIndex < (shuffledQuiz.length-1)) {
        quizIndex++; 
        showQuestion();
    } else {
        clearInterval(timeInterval)
        setTimeout(function() {
            gameOver()
        }, 500)
    }
}

function quizStart() {
    quizBase.setAttribute("style", "display: none;"); //hide frontpage
    quizEnd.setAttribute("style", "display: none;"); //hide end page
    highScores.setAttribute("style", "display: none;"); //hide highscores page
    quizGame.setAttribute("style", "display: flex;"); // display quiz

    shuffledQuiz = questionList.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < questionList.length; i++) {
        shuffledAnswers = questionList[i].answers.sort((a, b) => 0.5 - Math.random());
        shuffledQuiz.answers = shuffledAnswers
    }
    console.log(shuffledAnswers)
    console.log(questionList)
    
    quizIndex = 0
    showQuestion();
    // quizBase.setAttribute("style", "display: block;"); //display quiz page
    timer(); //start time
}

let showRightWrong
console.log(questionList)
function readAnswer(answer) {
    console.log(answer)
    console.log(questionList)
    console.log(questionList[quizIndex].answers[0])
    if (questionList[quizIndex].correct === answer) {
        rightWrong.textContent = "Correct!"
        clearTimeout(showRightWrong);
        showRightWrong = setTimeout(function () {
            rightWrong.textContent = ""
        }, 1500);
    } else {
        timeLeft -= 15;
        rightWrong.textContent = "Wrong."
        clearTimeout(showRightWrong);
        showRightWrong = setTimeout(function () {
            rightWrong.textContent = ""
        }, 1500);
    }
    newQuestion();
}

startButton.addEventListener("click", quizStart); // start when start button is pressed  \
playAgain.addEventListener("click", quizStart);
document.querySelectorAll(".answer").forEach(element => {
    element.addEventListener("click", event =>{
    const clicked = event.target;
    if (clicked.matches("button")) {
        readAnswer(clicked.textContent)
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
        scoreInput.setAttribute("style", "display: block;");
    }

}

function toHighscorePage() {
    quizEnd.setAttribute("style", "display: none;");
    quizBase.setAttribute("style", "display: none;");
    quizGame.setAttribute("style", "display: none;");
    highScores.setAttribute("style", "display: block;");
    
}

const submitScoreBtn = document.querySelector("#submit-score")
const initialsInput = document.querySelector("#score-initials")

submitScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let playerScore = {
        initials: initialsInput.value,
        time: timeLeft.value
    }
    localStorage.setItem("playerScore", JSON.stringify("playerScore"));
    toHighscorePage()
})

// highscore page
//    hide game over screen show highscore page
//    input and sort high scores 
//    clear highscores button and play again button
//    highscores set to local storage

let scores = [];


