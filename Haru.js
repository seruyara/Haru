document.addEventListener('DOMContentLoaded', () => {
    const question = document.querySelector('#question');
    const answerButtons = question.querySelectorAll('#answer-buttons');
    const nextButton = question.querySelector('#next-btn');
    const resultText = question.querySelector('#result-text'); // new line
  
    let currentQuestionIndex = 0;
    let score = 0;
    let movie = [];
    let data = {};

    function startQuiz(){
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }
   
    function showQuestion(){
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex +1;
        questionElement.innerHTML =questionNo + ". " + currentQuestion.
        question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
        })
    }
  
    fetch('http://localhost:3000/data')   
      .then(response => response.json())
      .then(movie => {
        data = movie[0];
        displayMovie();
      })
      .catch(error => console.error(error));
  
    function displayMovie() {
      let currentCategory = data.category;
      let currentQuestion;
        
      if (currentCategory === 'movie') {
        currentQuestion = data.questions[currentQuestionIndex];
      } else if (currentCategory === 'music') {
        currentQuestion = data.questions[currentQuestionIndex];
      }
  
      question.innerText = currentQuestion.question;
      answerButtons.forEach((button, index) => {
        button.innerText = currentQuestion.incorrect_answers[index];
        if (currentQuestion.correct_answer === button.innerText) {
          button.innerText = currentQuestion.correct_answer;
          button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
      });
      nextButton.disabled = true;
      resultText.innerText = '';
    }
  
    function selectAnswer(event) {
      const selectedButton = event.target;
      const isCorrect = selectedButton.dataset.correct === 'true';
  
      if (data.category === 'movie') {
        if (isCorrect) {
          currentScore++;
          resultText.innerText = 'Correct!';
        } else {
          resultText.innerText = 'Incorrect.';
        }
      } else if (data.category === 'music') {
        // Add logic for music questions
      }
  
      answerButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
      });
      nextButton.disabled = false;
    }
  
    function showResults() {
      let totalQuestions;
  
      if (data.category === 'movie') {
        totalQuestions = data.questions.length;
      } else if (data.category === 'music') {
        // Add logic for music questions
      }
  
      question.innerText = `You scored ${currentScore} out of ${totalQuestions} questions!`;
      answerButtons.forEach(button => {
        button.disabled = true;
      });
      nextButton.innerText = 'Restart';
      nextButton.addEventListener('click', () => {
        resetState();
        displayMovie();
      });
      resultText.innerText = '';
    }
  
  });
 //{"text": "", "correct":false},
 //{"text": "", "correct":true},
 //{"text": "", "correct":false},
 //{"text": "", "correct":false}