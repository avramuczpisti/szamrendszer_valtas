const quizData = [
  {
    question: 'Hogyan írod tizenhatos számrendszerben a 28-at?',
    options: ['1c', '1a', '22', '24'],
    answer: '1c',
  },
  {
    question: 'Hogyan írod tizenhatos számrendszerben a 47-et?',
    options: ['2f', '2b', '32', '4e'],
    answer: '2f',
  },
  {
    question: 'Hogyan írod tizenhatos számrendszerben a 32-t?',
    options: ['20', '32', '22', '3b'],
    answer: '20',
  },
  {
    question: 'Hogyan írod tizenhatos számrendszerben az 56-ot?',
    options: ['38', '5d', '3a', '29'],
    answer: '38',
  },
  {
    question: 'Hogyan írod tízes számrendszerben a 39-t?',
    options: ['57','55','59','63'],
    answer: '57',
  },
  {
    question: 'Hogyan írod tízes számrendszerben a 3d-t?',
    options: ['61', '64', '70', '75'],
    answer: '61',
  },
  {
    question: 'Hogyan írod tízes számrendszerben a 4b-t?',
    options: ['75', '67', '73', '88'],
    answer: '75',
  },
  {
    question: 'Hogyan írod tízes számrendszerben a 64-t?',
    options: ['100', '16', '160', '128'],
    answer: '100',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `${score} pontot szereztél a ${quizData.length} pontból!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Kérdés:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Te válaszod:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Helyes válasz:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>${score} pontot szereztél a ${quizData.length} pontból!</p>
    <p>Hibás válaszok:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();