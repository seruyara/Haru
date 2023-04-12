document.addEventListener('DOMContentLoaded', () => {
    const question1Element = document.querySelector('#question-1');
    const answer1Buttons = document.querySelectorAll('#answer-buttons-1 button');
    const nextButton = document.querySelector('#next-btn-1');
  
    let currentQuestionIndex;
    let music;
    let selected = null;
    let score = 0;
  
    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      selected = null;
      nextButton.innerHTML = "Next";
      displayMusic();
    }
  
    function displayMusic() {
      let currentQuestion = music[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      question1Element.innerHTML = questionNo + ". " + currentQuestion.question;
  
      answer1Buttons.forEach((button, index) => {
        button.innerHTML = currentQuestion.answers[index];
  
        if (selected === index) {
          button.classList.add('selected');
        } else {
          button.classList.remove('selected');
        }
  
        button.addEventListener('click', () => {
          selected = index;
  
          if (selected === currentQuestion.correct_answer) {
            score++;
          }
  
          // Disable all answer buttons after one is clicked
          answer1Buttons.forEach((button) => {
            button.disabled = true;
          });
  
          if (currentQuestionIndex === music.length - 1) {
            endQuiz();
          } else {
            currentQuestionIndex++;
            selected = null;
            nextButton.innerHTML = "Next";
            displayMusic();
          }
        });
      });
    }
  
    function endQuiz() {
      question1Element.innerHTML = "Quiz complete! Your score is " + score;
      nextButton.style.display = "none";
      answer1Buttons.forEach((button) => {
        button.disabled = true;
      });
    }
  
    fetch('http://localhost:3000/music')
      .then(response => response.json())
      .then(data => {
        music = data;
        startQuiz();
      })
      .catch(error => console.error(error))
  });
  