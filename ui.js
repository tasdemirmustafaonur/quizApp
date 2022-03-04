class UI {
  constructor() {
    this.infoBox = document.querySelector(".info-box");
    this.quizBox = document.querySelector(".quiz-box");
    this.resultBox = document.querySelector(".result-box");
    this.queText = document.querySelector(".que-text");
    this.optionList = document.querySelector(".option-list");
    this.quesCounter = document.querySelector(".total-que");
    this.timeCount = this.quizBox.querySelector(".timer .timer-sec");
    this.timeLine = this.quizBox.querySelector("header .time-line");
    this.scoreText = this.resultBox.querySelector(".score-text");
    this.questionsField = this.infoBox.querySelector("#questionField");
    let counter, counterLine;
  }

  enableInfoBox(fields) {
    this.infoBox.classList.add("activeInfo");
    this.questionsField.innerHTML = `
    <option value="" selected disabled>Lütfen bir alan seçiniz..</option>
    ${fields.map((field) => {
      return `<option value="${field}">${field}</option>`;
    })}
    `;
  }

  disableInfoBox() {
    this.infoBox.classList.remove("activeInfo");
  }

  enableQuizBox() {
    this.quizBox.classList.add("activeQuiz");
  }

  enableResultBox() {
    this.quizBox.classList.remove("activeQuiz");
    this.resultBox.classList.add("activeResult");
  }

  showQuestion(question, index) {
    let queTag = `
        <span>${index + 1}.${question.question}<span>
    `;
    this.queText.innerHTML = queTag;
    nextBtn.style.display = "none";
  }

  showOptions(options) {
    this.optionList.innerHTML = "";
    options.forEach((option) => {
      let optionTag = `
        <div class="option">
            <span>${option}</span>
        </div>
        `;
      this.optionList.innerHTML += optionTag;
    });
    const quesOptions = this.optionList.querySelectorAll(".option");

    for (let i = 0; i < quesOptions.length; i++) {
      quesOptions[i].setAttribute("onclick", "optionSelected(this)");
    }
  }

  totalQues(question, index) {
    this.quesCounter.innerHTML = `
    <span>
        <p>${index + 1}</p>
        of
        <p>${question.length}</p>
        Questions
    </span>
    `;
  }

  optionIsCorrect(answer, className, status, correctAns) {
    const allOptions = this.optionList.children.length;
    const tickIcon =
      '<div class="icon tick"><i class="fas fa-check"></i></div>';
    const crossIcon =
      '<div class="icon cross"><i class="fas fa-times"></i></div>';
    answer.classList.add(className);
    if (status) {
      answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
      answer.insertAdjacentHTML("beforeend", crossIcon);
    }
    for (let i = 0; i < allOptions; i++) {
      this.optionList.children[i].classList.add("disabled");
      if (this.optionList.children[i].textContent.trim() == correctAns) {
        this.optionList.children[i].setAttribute(
          "class",
          "option correct disabled"
        );
        this.optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
    nextBtn.style.display = "block";
  }

  timeLeft(time, correctAns) {
    counter = setInterval(timer, 1000);
    var self = this;
    function timer() {
      self.timeCount.textContent = time;
      time--;
      if (time < 9) {
        let addZero = self.timeCount.textContent;
        self.timeCount.textContent = "0" + addZero;
      }
      if (time < 0) {
        clearInterval(counter);
        self.timeCount.textContent = "00";

        const tickIcon =
          '<div class="icon tick"><i class="fas fa-check"></i></div>';
        const allOptions = self.optionList.children.length;
        for (let i = 0; i < allOptions; i++) {
          self.optionList.children[i].classList.add("disabled");
          if (self.optionList.children[i].textContent.trim() == correctAns) {
            self.optionList.children[i].setAttribute(
              "class",
              "option correct disabled"
            );
            self.optionList.children[i].insertAdjacentHTML(
              "beforeend",
              tickIcon
            );
          }
        }
        nextBtn.style.display = "block";
      }
    }
  }

  timeLiner(width) {
    counterLine = setInterval(liner, 29);
    var self = this;
    function liner() {
      width += 1;
      self.timeLine.style.width = width + "px";
      if (width > 549) {
        clearInterval(counterLine);
      }
    }
  }

  showScore(score, numberOfQues) {
    this.scoreText.innerHTML = `
      <span>and congrats! You got only<p>${score}</p>out of<p>${numberOfQues}</p></span>
    `;
  }
}
