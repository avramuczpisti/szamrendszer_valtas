const quizData = [
  {
    question: 'Hogyan írod nyolcas számrendszerben a 65-öt?',
    options: ['101', '103', '112', '114'],
    answer: '101',
  },
  {
    question: 'Hogyan írod nyolcas számrendszerben a 74-et?',
    options: ['112', '114', '121', '137'],
    answer: '112',
  },
  {
    question: 'Hogyan írod nyolcas számrendszerben a 254-et?',
    options: ['376', '345', '361', '373'],
    answer: '376',
  },
  {
    question: 'Hogyan írod nyolcas számrendszerben a 102-t?',
    options: ['144', '146', '151', '163'],
    answer: '146',
  },
  {
    question: 'Hogyan írod tízes számrendszerben az 104-t?',
    options: ['68','70','67','72'],
    answer: '68',
  },
  {
    question: 'Hogyan írod tízes számrendszerben az 125-öt?',
    options: ['85', '86', '84', '95'],
    answer: '85',
  },
  {
    question: 'Hogyan írod tízes számrendszerben az 14-t?',
    options: ['14', '12', '20', '18'],
    answer: '12',
  },
  {
    question: 'Hogyan írod tízes számrendszerben a 10-t?',
    options: ['8', '1', '10', '16'],
    answer: '8',
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