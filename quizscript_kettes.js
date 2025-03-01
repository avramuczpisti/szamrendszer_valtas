const quizData = [
    {
      question: 'Hogyan írod kettes számrendszerben a 325-öt?',
      options: ['101000101', '101000100', '101000111', '101000000'],
      answer: '101000101',
    },
    {
      question: 'Hogyan írod kettes számrendszerben az 1024-et?',
      options: ['10000000000', '11000000000', '10100000000', '10000000001'],
      answer: '10000000000',
    },
    {
      question: 'Hogyan írod kettes számrendszerben az 51-et?',
      options: ['110011', '110010', '110001', '100011'],
      answer: '110011',
    },
    {
      question: 'Hogyan írod kettes számrendszerben a 17-et?',
      options: ['10011', '11001', '10001', '11111'],
      answer: '10001',
    },
    {
      question: 'Hogyan írod tízes számrendszerben az 1111010-t?',
      options: ['122','126','120','102'],
      answer: '122',
    },
    {
      question: 'Hogyan írod tízes számrendszerben az 1000111-t?',
      options: ['71', '73', '75', '67'],
      answer: '71',
    },
    {
      question: 'Hogyan írod tízes számrendszerben az 100001-t?',
      options: ['33', '31', '35', '37'],
      answer: '33',
    },
    {
      question: 'Hogyan írod tízes számrendszerben a 101-t?',
      options: ['5', '6', '7', '8'],
      answer: '5',
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