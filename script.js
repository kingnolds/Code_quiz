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
  
  