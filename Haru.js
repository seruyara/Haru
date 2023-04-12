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
        button.addEventListener('click', (e) => {
            selectAnswer(e);
          }); 
      });
    }
    function selectAnswer(e) {
        const selectedButton = e.target;
        const selectedAnswerIndex = parseInt(selectedButton.dataset.answerIndex);
      
        // Get the current question from the quiz data
        const currentQuestion = music[currentQuestionIndex];
      
        // Get the index of the correct answer
        const correctAnswerIndex = currentQuestion.correct_answer;
      
        // Check if the selected answer is correct
        if (selectedAnswerIndex === correctAnswerIndex) {
            selectedButton.classList.add('correct');
            score++;
          } else {
            selectedButton.classList.add('incorrect');
            selectedButton.classList.remove('correct');
          }
          
          // Disable all answer buttons
          const answerButtons = document.querySelectorAll('#answer-buttons-1 button');
          answerButtons.forEach(button => {
            button.disabled = true;
            if (button.dataset.answerIndex == correctAnswerIndex) {
              button.classList.add('correct');
              button.classList.remove('incorrect');
            }
          });
          
          
      
        // Show the next button
        nextButton.classList.remove('hide');
      }
      
      
    startQuiz(); // Call the function to display the first question
  });
  