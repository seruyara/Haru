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
    }
  
    fetch('http://localhost:3000/music')
      .then(response => response.json())
      .then(data => {
        music = data;
        displayMusic();
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
    function resetState(){
        nextButton.style.display = "none";
    }

    function selectAnswer(selectedAnswerIndex) {
      const selectedButton = answer1Buttons[selectedAnswerIndex];
  
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
        // Highlight the correct answer
        answer1Buttons[correctAnswerIndex].classList.add('correct');
      }
  
      // Disable all answer buttons
      answer1Buttons.forEach(button => {
        button.disabled = true;
      });
  
      // Show the next button
      nextButton.style.display="block";
    }

    function showScore(){
        resetState();
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < qustions.length){
            displayMusic();
        }else{
            showScore()
        }
    }

    nextButton.addEventListener("click", ()=>{
        if (currentQuestionIndex > qustions.length){
            handleNextButton();
        }else {
            startQuiz();
        }
    })

    startQuiz(); // Call the function to display the first question
  });
  