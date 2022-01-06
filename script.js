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
let timeLeft = 60
let timeInterval

function timer() {
    timeLeft = 60;
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
    },
    {
    question: "Who is Morse Code named after?",
    answers: ["Samuel Morse", "Matthew Morse", "John Morse", "Eli Morse"],
    correct: "Samuel Morse"
    },
    {
    question: "What TV show has a book called 'The Bro Code'?",
    answers: ["How I Met Your Mother", "The League", "Seinfeld", "Friends"],
    correct: "How I Met Your Mother"
    },
    {
    question: "In the Code systems used by many Hospitals, what does Code Blue mean?",
    answers: ["Medical Emergency", "Fire", "Weapon", "Sad Doctor"],
    correct: "Medical Emergency"
    },
    {
    question: "The US Military famously recruited what Native American Tribe as Code Talkers in WWII?",
    answers: ["Navajo", "Cherokee", "Sioux", "Caddo"],
    correct: "Navajo"
    },
    {
    question: "What is the Code of Conduct followed by medieval Knights?",
    answers: ["Chivalric Code", "Chauceric Code", "Germanic Code", "Bushido Code"],
    correct: "Chivalric Code"
    },
]

  // Quiz start
const quizBase = document.querySelector("#welcome");
const startButton = document.querySelector("#quiz-button");
const quizGame = document.querySelector("#quiz");
const quizQuestion = document.querySelector("#question");
const quizEnd = document.querySelector("#quiz-end");
const highScores = document.querySelector("#score-page");
const playAgain = document.getElementsByClassName("play-again");
const scoreList = document.querySelector("#score-list")
var quizAnswers = document.getElementsByClassName("answer");
let rightWrong = document.querySelector("#answer-result");
const viewHighscores = document.querySelector('.highscore-redirect');
const header = document.querySelector("#header")
let quizIndex = 0
let shuffledQuiz = []
let shuffledAnswers = []


console.log(playAgain)
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
    header.setAttribute("style", "visibility: visible;"); // show header if coming from highscore page
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
        rightWrong.classList.add("correct");
        rightWrong.setAttribute("style", "visibility: visible;")
        clearTimeout(showRightWrong);
        showRightWrong = setTimeout(function () {
            rightWrong.textContent = ""
            rightWrong.classList.remove("correct");
        }, 1000);
    } else {
        timeLeft -= 15;
        rightWrong.textContent = "Wrong."
        rightWrong.classList.add("wrong");
        rightWrong.setAttribute("style", "visibility: visible;")
        clearTimeout(showRightWrong);
        showRightWrong = setTimeout(function () {
            rightWrong.textContent = ""
            rightWrong.classList.remove("wrong");
        }, 1000);
    }
    newQuestion();
}

startButton.addEventListener("click", quizStart); // start when start button is pressed  \
for (let i = 0; i < playAgain.length; i++) {
    playAgain[i].addEventListener("click", function () {
        quizEnd.setAttribute("style", "display: none;");
        quizBase.setAttribute("style", "display: flex;");
        quizGame.setAttribute("style", "display: none;");
        highScores.setAttribute("style", "display: none;");
        header.setAttribute("style", "visibility: visible;")
    })
    }
    

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
    quizEnd.setAttribute("style", "display: flex;")
    if (timeLeft <= 0) {
        timeLeft = 0;
        quizResult.textContent = "Game Over!"
        endPrompt.textContent = "You must answer all questions and get at least one correct. Better luck next time!"
        scoreInput.setAttribute("style", "display: none;");
        rightWrong.classList.remove("correct");
        rightWrong.classList.remove("wrong");
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
    header.setAttribute("style", "visibility: hidden;")
}
console.log(header)
const submitScoreBtn = document.querySelector("#submit-score")
const initialsInput = document.querySelector("#score-initials")
const clearScores = document.querySelector("#clear-scores")


// highscore page
//    hide game over screen show highscore page
//    input and sort high scores 
//    clear highscores button and play again button
//    highscores set to local storage

let scores = [];

function sortScores(a, b) {
   return b.time - a.time;
}

function renderScores() {
    scoreList.innerHTML = "";

    scores.sort(sortScores);

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];
        let scoreLi = document.createElement("li");
        scoreLi.textContent = `${i+1}. ${score.initials} ${score.time}`;
        console.log(score)
        scoreList.appendChild(scoreLi)
    }
}

function init() {
    let storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null) {
        scores = storedScores;
    }
    renderScores();
}

function storeScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}


submitScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let playerScore = {
        initials: initialsInput.value.trim(),
        time: timeLeft
    }
    if(playerScore.initials === "") {
        return;
    }
    scores.push(playerScore);
    storeScores();
    renderScores();
    toHighscorePage();
})

clearScores.addEventListener("click", function () {
    scores = []
    localStorage.removeItem("scores")
    renderScores();
})

viewHighscores.addEventListener("click",toHighscorePage);

init();