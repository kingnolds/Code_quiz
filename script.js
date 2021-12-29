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

function timer() {
    timeLeft = 80;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    let timeInterval = setInterval(function () {
      timerDisplay.textContent = timeLeft;
      timeLeft--; // countdown by 1
      timerDisplay.textContent = timeLeft; // display remaining time
  
      if(timeLeft === 0) { // when timer hits zero
        clearInterval(timeInterval); // stop the timer
        
        // gameOver(); 
      }
  
    }, 1000);
  }
  
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
    if (quizIndex < shuffledQuiz.length) {
        quizIndex++; 
        showQuestion();
    } else {
        gameOver()
    }
}

function quizStart() {
    quizBase.setAttribute("style", "display: none;"); //hide frontpage
    shuffledQuiz = questionList.sort((a, b) => 0.5 - Math.random());
    showQuestion();
    quizBase.setAttribute("style", "display: block;"); //display quiz page
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
document.querySelectorAll(".answer").forEach(element => {
    element.addEventListener("click", event =>{
    const clicked = event.target;
    if (clicked.matches("button")) {
        readAnswer(clicked.value)
    }
})
    
});
