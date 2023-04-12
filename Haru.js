document.addEventListener('DOMContentLoaded', () => {
    const question1Element = document.querySelector('#question-1');
    const answer1Buttons = document.querySelectorAll('#answer-buttons-1 button');
    const nextButton = document.querySelector('#next-btn-1');
  
    let currentQuestionIndex = 0;
    let score = 0;
    let music = [];
  
    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      displayMusic();
    }
  
    function resetState() {
      nextButton.style.display = "none";
      answer1Buttons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
      });
    }
  
    fetch('http://localhost:3000/music')
      .then(response => response.json())
      .then(data => {
        music = data;
        startQuiz();
      })
      .catch(error => console.error(error))
  
    function displayMusic() {
      resetState();
      let currentQuestion = music[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      question1Element.innerHTML = questionNo + ". " + currentQuestion.question;
  
      answer1Buttons.forEach((button, index) => {
        button.innerHTML = currentQuestion.answers[index];
        button.dataset.answerIndex = index; // Add a data attribute to store the answer index
        button.addEventListener('click', () => {
          selectAnswer(index);
        });
      });
    }
  
    function selectAnswer(selectedAnswerIndex) {
      const selectedButton = answer1Buttons[selectedAnswerIndex];
      const currentQuestion = music[currentQuestionIndex];
      const correctAnswerIndex = currentQuestion.correct_answer;
      if (selectedAnswerIndex === correctAnswerIndex) {
        selectedButton.classList.add('correct');
        score++;
      } else {
        selectedButton.classList.add('incorrect');
        answer1Buttons[correctAnswerIndex].classList.add('correct');
      }
      answer1Buttons.forEach(button => {
        button.disabled = true;
      });
      nextButton.style.display = "block";
    }
  
    function showScore() {
      resetState();
      question1Element.innerHTML = `You got ${score} out of ${music.length}!`;
      nextButton.innerHTML = "Play Again?";
      nextButton.style.display = "block";
    }
  
    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < music.length) {
        displayMusic();
      } else {
        showScore()
      }
    }
  
    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < music.length) {
        handleNextButton();
      } else {
        startQuiz();
      }
    })
  
  });
  