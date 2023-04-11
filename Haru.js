document.addEventListener('DOMContentLoaded', () => {
    const question = document.querySelector('#question');
    const answerButtons = question.querySelectorAll('#answer-buttons');
    const nextButton = question.querySelector('#next-btn');
    const resultText = question.querySelector('#result');
  
    let currentQuestionIndex = 0;
    let currentScore = 0;
    let data = {};
    let category = '';
  
    function startQuiz(category) {
      currentQuestionIndex = 0;
      currentScore = 0;
      nextButton.innerText = 'Next';
      resultText.innerText = '';
      data = getData(category);
      displayQuestion();
    }
  
    function getData(category) {
      switch (category) {
        case 'movie':
          return movieData;
        case 'music':
          return musicData;
        case 'video game':
          return videoGameData;
      }
    }

    fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    // Call the function to display the questions based on the category
    if (data.category === 'movie') {
      displayMovieQuestions(data);
    } else if (data.category === 'music') {
      displayMusicQuestions(data);
    } else if (data.category === 'video game') {
      displayVideoGameQuestions(data);
    } else {
      console.error('Invalid category');
    }
  })
  .catch(error => console.error(error));

  async function getData(category) {
    try {
      const response = await fetch('db.json');
      const data = await response.json();
      
      switch (category) {
        case 'movie':
          return data.movieQuestions;
        case 'music':
          return data.musicQuestions;
        case 'video game':
          return data.videoGameQuestions;
        default:
          console.error('Invalid category');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
    function displayQuestion() {
      const currentQuestion = data.questions[currentQuestionIndex];
  
      question.innerHTML = `
        <div class="question-header">
          <h2>${currentQuestion.question}</h2>
        </div>
        <div class="answer-options">
          ${currentQuestion.answers.map(answer => `
            <button class="btn" data-correct="${answer.correct}">
              ${answer.text}
            </button>
          `).join('')}
        </div>
      `;
  
      answerButtons.forEach(button => {
        button.addEventListener('click', selectAnswer);
      });
      nextButton.disabled = true;
    }
  
    function selectAnswer(event) {
      const selectedButton = event.target;
      const isCorrect = selectedButton.dataset.correct === 'true';
  
      if (isCorrect) {
        currentScore++;
        resultText.innerText = 'Correct!';
      } else {
        resultText.innerText = 'Incorrect.';
      }
  
      answerButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
      });
      nextButton.disabled = false;
    }
  
    function showResults() {
      const totalQuestions = data.questions.length;
  
      question.innerHTML = `
        <div class="question-header">
          <h2>You scored ${currentScore} out of ${totalQuestions} questions!</h2>
        </div>
        <button class="btn" id="restart-btn">Restart</button>
      `;
  
      const restartButton = question.querySelector('#restart-btn');
      restartButton.addEventListener('click', () => {
        startQuiz(category);
      });
    }
  
    // Event listeners
    document.querySelectorAll('.category-btn').forEach(button => {
      button.addEventListener('click', event => {
        category = event.target.dataset.category;
        startQuiz(category);
      });
    });
  
    nextButton.addEventListener('click', () => {
      currentQuestionIndex++;
  
      if (currentQuestionIndex < data.questions.length) {
        displayQuestion();
      } else {
        showResults();
      }
    });
  });
  