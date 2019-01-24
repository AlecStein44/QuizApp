$(function() {
let questionNumber = 0;
let score = 0;

function generateQuestion () {
  if (questionNumber < questionsBase.length) {
    return `<div class="question-${questionNumber}">
    <h2 class = "questionText">${questionsBase[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${questionsBase[questionNumber].answers[0]}" name="answer" required>
    <span>${questionsBase[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionsBase[questionNumber].answers[1]}" name="answer" required>
    <span>${questionsBase[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionsBase[questionNumber].answers[2]}" name="answer" required>
    <span>${questionsBase[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionsBase[questionNumber].answers[3]}" name="answer" required>
    <span>${questionsBase[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

function addQuestNum(){
  questionNumber++;
  $('.questionNumber').text(questionNumber+1);
}

function addScore() {
  score++;
}

function startQuiz () {
  $('.startButton').on('click', function(event) {
   $('.startScreen').hide();
   $('.questionForm').show();
   $('.questionNumber').text(questionNumber+1);
});
}

function showQuestion() {
  $('.questionForm').html(generateQuestion());
}

function userAnswer() {
  $('form').on('submit',function(event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${questionsBase[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnsweredCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnsweredWrong();
    }
  });
}

function ifAnsweredCorrect () {
  userGotRight();
  updateScore();
}

function ifAnsweredWrong () {
  userGotWrong();
}

function userGotRight () {
  let correctAnswer = `${questionsBase[questionNumber].correctAnswer}`;
  $('.questionForm').html(`<div class="correctFeedback"><div class="icon"><img src="${questionsBase[questionNumber].icon}" alt="${questionsBase[questionNumber].alt}"/></div><p><b>Well Done You Got It Right!!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userGotWrong () {
  let correctAnswer = `${questionsBase[questionNumber].correctAnswer}`;
  $('.questionForm').html(`<div class="correctFeedback"><div class="icon"><img src="${questionsBase[questionNumber].icon}" alt="${questionsBase[questionNumber].alt}"/></div><p><b>Darn You Got It Wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  addScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 8) {
    $('.questionForm').html(`<div class="results correctFeedback"><h3></h3><img src="" alt=""/><p>You got ${score} / 10</p><p>Congrats You Definitely Know Your History!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 6) {
    $('.questionForm').html(`<div class="results correctFeedback"><h3></h3><img src="" alt=""/><p>You got ${score} / 10</p><p>Well done you some what know your history!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionForm').html(`<div class="results correctFeedback"><h3></h3><img src="" alt=""/><p>You got ${score} / 10</p><p>You might wanna retake your high school history class...</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    addQuestNum();
    showQuestion();
    userAnswer();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createQuiz () {
  startQuiz();
  showQuestion();
  userAnswer();
  renderNextQuestion();
}

$(createQuiz);


});