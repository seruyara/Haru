document.addEventListener('DOMContentLoaded', () => {
    const question1Element = document.querySelector('#question-1');
    const answer1Buttons = document.querySelectorAll('#answer-buttons-1 button');
    const nextButton1 = document.querySelector('#next-btn-1');
    
    const question2Element = document.querySelector('#question-2');
    const answer2Buttons = document.querySelectorAll('#answer-buttons-2 button');
    const nextButton2 = document.querySelector('#next-btn-2');
    
    let currentQuestionIndex1 = 0;
    let score1 = 0;
    let music = [];
    
    let currentQuestionIndex2 = 0;
    let score2 = 0;
    let videoGames = [];
    
    function startQuiz1() {
      currentQuestionIndex1 = 0;
      score1 = 0;
      nextButton1.innerHTML = "Next";
      displayMusic(); // Call the function to display the first question
    }
    
    function startQuiz2() {
      currentQuestionIndex2 = 0;
      score2 = 0;
      nextButton2.innerHTML = "Next";
      displayVideoGames(); // Call the function to display the first question
    }
    
    function resetState1() {
      nextButton1.style.display = "none";
      answer1Buttons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
        button.innerHTML = '';
      });
    }
    
    function resetState2() {
      nextButton2.style.display = "none";
      answer2Buttons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
        button.innerHTML = '';
      });
    }
    fetch('http://localhost:3000/music')
    .then(response => response.json())
    .then(data => {
      music = data;
      startQuiz1();
    })
    .catch(error => console.error(error))
  
  fetch('http://localhost:3000/VideoGames')
    .then(response => response.json())
    .then(data => {
        videoGames = data;
        startQuiz2();
    })
    .catch(error => console.error(error));
  
    function displayMusic() {
      resetState1();
      let currentQuestion = music[currentQuestionIndex1];
      let questionNo = currentQuestionIndex1 + 1;
      question1Element.innerHTML = questionNo + ". " + currentQuestion.question;
    
      answer1Buttons.forEach((button, index) => {
        button.innerHTML = currentQuestion.answers[index];
        button.dataset.answerIndex = index; // Add a data attribute to store the answer index
        button.addEventListener('click', () => {
          selectAnswer1(index);
        });
      });
    }
    
    function displayVideoGames() {
      resetState2();
      let currentQuestion = videoGames[currentQuestionIndex2];
      let questionNo = currentQuestionIndex2 + 1;
      question2Element.innerHTML = questionNo + ". " + currentQuestion.question;
    
      answer2Buttons.forEach((button, index) => {
        button.innerHTML = currentQuestion.answers[index];
        button.dataset.answerIndex = index; // Add a data attribute to store the answer index
        button.addEventListener('click', () => {
          selectAnswer2(index);
        });
      });
    }
    
    function selectAnswer1(selectedAnswerIndex) {
      const selectedButton = answer1Buttons[selectedAnswerIndex];
      const currentQuestion = music[currentQuestionIndex1];
      const correctAnswerIndex = currentQuestion.correct_answer;
      if (selectedAnswerIndex === correctAnswerIndex) {
        selectedButton.classList.add('correct');
        score1++;
      } else {
        selectedButton.classList.add('incorrect');
        answer1Buttons[correctAnswerIndex].classList.add('correct');
      }
      answer1Buttons.forEach(button => {
        button.disabled = true;
      });
      nextButton1.style.display = "block";
    }
    
    function selectAnswer2(selectedAnswerIndex) {
        const selectedButton = answer2Buttons[selectedAnswerIndex];
        const currentQuestion = videoGames[currentQuestionIndex2];
        const correctAnswerIndex = currentQuestion.correct_answer;
        if (selectedAnswerIndex === correctAnswerIndex) {
          selectedButton.classList.add('correct');
          score2++;
        } else {
            selectedButton.classList.add('incorrect');
            answer2Buttons[correctAnswerIndex].classList.add('correct');
          }
          answer1Buttons.forEach(button => {
            button.disabled = true;
          });
          nextButton2.style.display = "block";
      }
      
      function showScore1() {
        quizContainer1.innerHTML = `
          <h1>Music Trivia Quiz Results</h1>
          <p>You scored ${score1} out of ${music.length} questions.</p>
          <button id="restart-btn-1">Restart Quiz</button>
        `;
        const restartButton1 = document.getElementById("restart-btn-1");
        restartButton1.addEventListener("click", restartQuiz1);
      }
      
      function showScore2() {
        quizContainer2.innerHTML = `
          <h1>Video Game Trivia Quiz Results</h1>
          <p>You scored ${score2} out of ${videoGames.length} questions.</p>
          <button id="restart-btn-2">Restart Quiz</button>
        `;
        const restartButton2 = document.getElementById("restart-btn-2");
        restartButton2.addEventListener("click", restartQuiz2);
      }
      
      function handleNextButton1() {
        currentQuestionIndex1++;
        if (currentQuestionIndex1 < music.length) {
          displayMusic();
        } else {
          showScore1();
        }
      }
      
      nextButton1.addEventListener("click", () => {
        if (currentQuestionIndex1 < music.length) {
          handleNextButton1();
        } else {
          startQuiz1();
        }
      });
      
      function handleNextButton2() {
        currentQuestionIndex2++;
        if (currentQuestionIndex2 < videoGames.length) {
          displayVideoGames();
        } else {
          showScore2();
        }
      }
      
      nextButton2.addEventListener("click", () => {
        if (currentQuestionIndex2 < videoGames.length) {
          handleNextButton2();
        } else {
          startQuiz2();
        }
      });
      
    })  