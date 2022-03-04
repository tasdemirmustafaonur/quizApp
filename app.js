const ui = new UI();

const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");
const nextBtn = quizBox.querySelector(".next-btn");
const questionsField = infoBox.querySelector("#questionField");

let queCount = 0;
let questions;
let questionsResponse;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
let userField;
let uniqueField;
let selectedFieldQue = [];

// If Start Quiz Button Clicked
startBtn.onclick = () => {
  getQuestionsFields();
};

//If Exit Quiz Button Clicked
exitBtn.onclick = () => {
  ui.disableInfoBox();
};

//If Continue Button Clicked
continueBtn.onclick = () => {
  if (questionsField.value === "") {
    Swal.fire({
      icon: "error",
      title: "Hata...",
      text: "Lütfen hangi alan ile ilgilendiğinizi giriniz!",
    });
  } else {
    ui.disableInfoBox();
    ui.enableQuizBox();
    getQuestions(queCount, questionsField.value);
  }
};

// If Next Button Clicked
nextBtn.onclick = () => {
  queCount++;
  getQuestions(queCount);
};

quitQuiz.onclick = () => {
  window.location.reload();
};

async function loadQuestions(questionsFile) {
  questionsResponse = await fetch(questionsFile)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return questionsResponse;
}

async function getQuestionsFields() {
  questions = await loadQuestions("questions.json");
  console.log(questions);
  uniqueFields = [...new Set(questions.map((question) => question.field))];
  console.log(uniqueFields);
  ui.enableInfoBox(uniqueFields);
}

async function getQuestions(index, field) {
  questions = await loadQuestions("questions.json");
  questions.map((question) => {
    if (question.field == field) {
      selectedFieldQue.push(question);
    }
  });
  // console.log(selectedFieldQue);
  // console.log(questions);
  // a = a.push(questions.map((question) => question.field == field));

  if (index < selectedFieldQue.length) {
    ui.showQuestion(selectedFieldQue[index], index);
    ui.showOptions(selectedFieldQue[index].options);
    ui.totalQues(selectedFieldQue, index);
    clearInterval(counter);
    startTimer(timeValue, selectedFieldQue, index);
    clearInterval(counterLine);
    startTimerLine(widthValue);
  } else {
    ui.enableResultBox();
    ui.showScore(userScore, selectedFieldQue.length);
  }
}

async function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  questions = await loadQuestions("questions.json");

  let userAns = answer.textContent.trim();
  let correctAns = selectedFieldQue[queCount].answer;
  if (userAns == correctAns) {
    let className = "correct";
    userScore++;
    console.log(userScore);
    ui.optionIsCorrect(answer, className, true);
  } else {
    let className = "incorrect";
    ui.optionIsCorrect(answer, className, false, correctAns);
  }
}

async function startTimer(time, questions, queCount) {
  let correctAns = questions[queCount].answer;
  ui.timeLeft(time, correctAns);
}

function startTimerLine(width) {
  ui.timeLiner(width);
}
