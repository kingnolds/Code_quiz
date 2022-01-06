
// Selectors for HTML elements:
const quizBase = document.querySelector("#welcome");
const startButton = document.querySelector("#quiz-button");
const quizGame = document.querySelector("#quiz");
const quizQuestion = document.querySelector("#question");
const quizEnd = document.querySelector("#quiz-end");
const highScores = document.querySelector("#score-page");
const playAgain = document.getElementsByClassName("play-again");
const scoreList = document.querySelector("#score-list");
const quizAnswers = document.getElementsByClassName("answer");
const rightWrong = document.querySelector("#answer-result");
const viewHighscores = document.querySelector('.highscore-redirect');
const header = document.querySelector("#header");
const timerDisplay = document.querySelector("#time-left"); 

// Quiz variables
let quizIndex = 0
let shuffledQuiz = []
let shuffledAnswers = []




// Timer

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
  
      if(timeLeft <= 0) { // when timer hits zero or below in case of wrong answer
        timeLeft = 0
        timerDisplay.textContent = timeLeft;
        clearInterval(timeInterval); // stop the timer
        
        gameOver(); // go to end game screen
      }
  
    }, 1000);
  }
  

// Question Bank
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

// Quiz Functions
function showQuestion() {
    
    quizQuestion.textContent = shuffledQuiz[quizIndex].question; // load question into the h1
    for (let i = 0; i < quizAnswers.length; i++) {
    quizAnswers[i].textContent = shuffledQuiz[quizIndex].answers[i];    
    } // put answer options into every button
    
  }

function newQuestion() { // if there are questions left, go to the next question
    if (quizIndex < (shuffledQuiz.length-1)) {
        quizIndex++; 
        showQuestion();
    } else { // if there are no questions left end the quiz
        clearInterval(timeInterval)
        setTimeout(function() { // stay on quiz to show if the last answer was right or wrong
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

    shuffledQuiz = questionList.sort((a, b) => 0.5 - Math.random()); // shuffle the questions
    for (let i = 0; i < questionList.length; i++) { // shuffle the answers for each question
        shuffledAnswers = questionList[i].answers.sort((a, b) => 0.5 - Math.random());
        shuffledQuiz.answers = shuffledAnswers
    }
    
    quizIndex = 0 // set question index to 0
    showQuestion(); // display a question
    timer(); //start time
}

let showRightWrong

function readAnswer(answer) { // for the selected answer determine if it is correct or not, the answer is read from the event listener on the answer buttons
    if (questionList[quizIndex].correct === answer) { // if the answer button clicked has the same value as the question's correct value
        rightWrong.textContent = "Correct!"
        rightWrong.classList.add("correct"); // add text with class correct 
        clearTimeout(showRightWrong);
        showRightWrong = setTimeout(function () { // remove the text and class after 1 second
            rightWrong.textContent = ""
            rightWrong.classList.remove("correct");
        }, 1000);
    } else { // if incorrect
        timeLeft -= 15; // lose 15 seconds
        rightWrong.textContent = "Wrong."
        rightWrong.classList.add("wrong"); // add text with red background
        clearTimeout(showRightWrong);
        showRightWrong = setTimeout(function () { // remove after 1 second
            rightWrong.textContent = ""
            rightWrong.classList.remove("wrong");
        }, 1000);
    }
    newQuestion(); // show next question
}

startButton.addEventListener("click", quizStart); // when start button is clicked start quiz
for (let i = 0; i < playAgain.length; i++) { // when any play again button is pressed 
    playAgain[i].addEventListener("click", function () {
        quizEnd.setAttribute("style", "display: none;"); // hide all but the welcome screen
        quizBase.setAttribute("style", "display: flex;");
        quizGame.setAttribute("style", "display: none;");
        highScores.setAttribute("style", "display: none;");
        header.setAttribute("style", "visibility: visible;"); // show the header if coming from highscore screen
    })
    }
    

document.querySelectorAll(".answer").forEach(element => { // when any one of the answers are clicked send the text content of that answer button to be checked in the read answer function 
    element.addEventListener("click", event =>{
    const clicked = event.target;
    if (clicked.matches("button")) {
        readAnswer(clicked.textContent)
    }
})
    
});

// End Game screen
const quizResult = document.querySelector("#quiz-result");
const endPrompt = document.querySelector("#result-prompt");
const scoreInput = document.querySelector("#score");

function gameOver() { 
    clearInterval(timeInterval) // stop timer
    quizGame.setAttribute("style", "display: none;") // hide quiz screen
    quizEnd.setAttribute("style", "display: flex;") // show end game screen
    if (timeLeft <= 0) { // if timer is 0 or below
        timeLeft = 0; // set to 0
        quizResult.textContent = "Game Over!"
        endPrompt.textContent = "You must answer all questions and get at least one correct. Better luck next time!"
        scoreInput.setAttribute("style", "display: none;"); // hide score input
        rightWrong.classList.remove("correct"); // remove right wrong case in edge case
        rightWrong.classList.remove("wrong");
    } else {
        quizResult.textContent = "You Win!"
        endPrompt.textContent = "Save your Highscore!"
        scoreInput.setAttribute("style", "display: block;"); // show score input
    }

}

function toHighscorePage() { // hide all but highscore page
    quizEnd.setAttribute("style", "display: none;");
    quizBase.setAttribute("style", "display: none;");
    quizGame.setAttribute("style", "display: none;");
    highScores.setAttribute("style", "display: block;");
    header.setAttribute("style", "visibility: hidden;"); // hide header with timer and view high score prompt
}

// Highscore page 
const submitScoreBtn = document.querySelector("#submit-score")
const initialsInput = document.querySelector("#score-initials")
const clearScores = document.querySelector("#clear-scores")

let scores = [];

function sortScores(a, b) { // sort scores descending by time
   return b.time - a.time;
}

function renderScores() { // create score list
    scoreList.innerHTML = ""; // clear scores

    scores.sort(sortScores);

    for (let i = 0; i < scores.length; i++) { // add list element for every score with rank initials and time
        let score = scores[i];
        let scoreLi = document.createElement("li");
        scoreLi.textContent = `${i+1}. ${score.initials} ${score.time}`;
        scoreList.appendChild(scoreLi) 
    }
}

function init() {
    let storedScores = JSON.parse(localStorage.getItem("scores")); // pull any stored scores from local storage

    if (storedScores !== null) {
        scores = storedScores;
    }
    renderScores();
}

function storeScores() { // store scores in local storage
    localStorage.setItem("scores", JSON.stringify(scores));
}


submitScoreBtn.addEventListener("click", function (event) { // when scores are submitted
    event.preventDefault();
    let playerScore = {
        initials: initialsInput.value.trim(),
        time: timeLeft
    }
    if(playerScore.initials === "") { // if nothing in initials stop function
        return;
    }
    scores.push(playerScore); // add the submitted score to the scores list
    storeScores();
    renderScores();
    toHighscorePage(); // send to highscore page
})

clearScores.addEventListener("click", function () { // clear scores function empties all recorded scores in local storage
    scores = []
    localStorage.removeItem("scores")
    renderScores();
})

viewHighscores.addEventListener("click",toHighscorePage); // when view highscores is pressed send to highscore screen

init(); // pull local storage and create score list on opening page