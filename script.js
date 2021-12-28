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
let timerDisplay = document.querySelector("#time-left"); 

function timer() {
    var timeLeft = 80;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      timerDisplay.textContent = timeLeft;
      timeLeft--; // countdown by 1
      timerDisplay.textContent = timeLeft; // display remaining time
  
      if(timeLeft === 0) { // when timer hits zero
        clearInterval(timeInterval); // stop the timer
        
        // gameOver(); 
      }
  
    }, 1000);
  }
  
var questionBank = [
    {
    question: "Which of these are the names of Joe's cats?",
    answers: [
        { answerText: "Shiva / Bahamut",
        answerValue: true, },
        { answerText: "Shiva / Ifrit",
        answerValue: false, },
        { answerText: "Rahum / Bahamut",
        answerValue: false,},
        { answerText: "Rahum / Ifrit",
        answerValue: false,},
    ]
    },
    {
    question: "Hammurabi's code, the oldest known legal code, comes from where?",
    answers: [
            { answerText: "Babylon",
            answerValue: true, },
            { answerText: "Ancient Egypt",
            answerValue: false, },
            { answerText: "Ancient Greece",
            answerValue: false,},
            { answerTex: "Ancient Rome",
            answerValue: false,}]
    }
]

  // Quiz start
let quizBase = document.querySelector("#welcome");
let startButton = document.querySelector("#quiz-button");
let quizGame = document.querySelector("#quiz");
let quizQuestion = document.querySelector("#question");
var quizAnswers = document.getElementsByClassName("answer");
let quizIndex = 0

  function quizStart() {
quizBase.setAttribute("style", "display: none;"); //hide frontpage
quizQuestion.textContent = questionBank[quizIndex].question;
for (let i = 0; i < quizAnswers.length; i++) {
    quizAnswers[i].innerHTML = questionBank[quizIndex].answers[i].answerText;
    
}

  }

startButton.addEventListener("click", quizStart);
  