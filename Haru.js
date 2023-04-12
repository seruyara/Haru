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
      showQuestion();
    }
  
    fetch('http://localhost:3000/music')
      .then(response => response.json())
      .then(data => {
        music = data;
        displayMusic();
      })
      .catch(error => console.error(error))
  
    function displayMusic() {
      let currentQuestion = music[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      question1Element.innerHTML = questionNo + ". " + currentQuestion.question;
  
      answer1Buttons.forEach((button, index) => {
        button.innerHTML = currentQuestion.answers[index];
      });
    }
  
    startQuiz(); // Call the function to display the first question
  });
  