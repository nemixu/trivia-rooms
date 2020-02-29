const categoryDropDown = $("#categories");
const difficultyDropDown = $("#difficulty");
const diffArray = ["Easy", "Medium", "Hard"];
let gameReady = false;
let score = 0;
let currentQuestionSet = 0;
let questionsArray = [];
let questionCounter = 0;
const questions = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer"));
const unwantedCategories = [13, 19, 24, 25, 29, 30];
const maxQuestions = 10;


const fetchCategories = () => {
  fetch("https://opentdb.com/api_category.php")
    .then(result => result.json())
    .then(data => {
      populateDropDowns(data);
    })
    .catch(error => console.error(error.message));
};
// Populate catagories
// Populate difficulty

const populateDropDowns = data => {
  console.log("Data in Dropdowns", data);
  const triviaCategories = data.trivia_categories;
  for (let i = 0; i < triviaCategories.length; i++) {
    if (!unwantedCategories.includes(triviaCategories[i].id)) {
      categoryDropDown.append(
        `<option value="${triviaCategories[i].id}">${triviaCategories[i].name}</option>`
      );
    } else {
      console.log("category ignored");
    }
  }
  diffArray.forEach(difficulty => {
    difficultyDropDown.append(
      `<option value="${difficulty.toLocaleLowerCase()}">${difficulty}</option>`
    );
  });
};

//shuffling the answers
const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const getElementsByString = (str, tag) => {

  console.log(str);
  console.log(str.replace(/[^\d\w\są-ż]+/g, ''));
  return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());
}

const setScore = newScore => {
  score = newScore;
  document.getElementById("score-number").innerHTML = newScore;
}

const getQuestions = () => {
  const categoryDropDown = $("#categories")[0].value;
  const difficultyDropDown = $("#difficulty")[0].value;
  const url = `https://opentdb.com/api.php?amount=10&category=${categoryDropDown}&difficulty=${difficultyDropDown}&type=multiple`;
  gameReady = true;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // populate questions
      for (let x = 0; x < data.results.length; x++) {
        questionsArray.push(data.results[x]);
      }
      setQuestionAndAnswers();
    });
};

const setQuestionAndAnswers = () => {
  console.log("Questions array ", questionsArray);
  // Set the question html
  questions.innerHTML = questionsArray[currentQuestionSet].question;
  console.log("Current Question", questionsArray[currentQuestionSet].question);

  // combine all answers to display later
  const allAnswers = [
    questionsArray[currentQuestionSet].correct_answer,
    ...questionsArray[currentQuestionSet].incorrect_answers
  ];
  currentCorrectAnswer = questionsArray[currentQuestionSet].correct_answer;
  // shuffle array
  const shuffleArr = shuffle(allAnswers);
  let index = 0;
  answers.forEach(answer => {
    index++;
    answer.innerHTML = shuffleArr[index - 1];
  });
  console.log("ALL ANSWERS", allAnswers);
  questionCounter++;
  console.log("questions counter", questionCounter);
};

const getNextQuestion = (className, selectedAnswer, currentCorrectAnswer) => {

  if (questionCounter < maxQuestions) {
    const correctAnswer = getElementsByString(currentCorrectAnswer, "button")[0];
    selectedAnswer.classList.add(className);
    if (correctAnswer && className !== "correct-answer") {
      correctAnswer.classList.add("correct-answer");
    }
    selectedAnswer.classList.add(className);
    setTimeout(() => {
      selectedAnswer.classList.remove(className);
      correctAnswer.classList.remove("correct-answer");
      currentQuestionSet++;
      setQuestionAndAnswers();
    }, 1000);

  } else {
    console.log("ending game");
    endGame();
  }

};

const checkAnswer = selectedAnswerNumber => {
  const currentCorrectAnswer = questionsArray[currentQuestionSet].correct_answer;
  const selectedAnswer = $(`[data-number=${selectedAnswerNumber}]`)[0];
  if (selectedAnswer.innerHTML === currentCorrectAnswer) {
    console.log("Correct!");
    console.log("this is the score", score);
    score += 1;
    setScore(score);
    getNextQuestion("correct-answer", selectedAnswer, currentCorrectAnswer);
  } else {
    console.log("Incorrect!");
    getNextQuestion("wrong-answer", selectedAnswer, currentCorrectAnswer);
  }

};

const startGame = () => {
  setScore(0);
  questionCounter = 0;
  currentQuestionSet = 0;
  getQuestions();
  displayGame();
};

const replayGame = () => {
  setScore(0);
  questionsArray = [];
  startGame();
};

const displayGame = () => {
  document.getElementById("questions-main").style.display = "block";
  document.getElementById("opening-game").style.display = "none";
  document.getElementById("dropdown-boxes").style.display = "none";
  document.getElementById("footer-main").style.display = "none";
  document.getElementById("score-counter").style.display = "block";
};

const endGame = () => {
  document.getElementById("play-again-buttons").style.display = "block";
  document.getElementById("questions-main").style.display = "none";
  document.getElementById("end-game-container").style.display = "block";
  document.getElementById("score-counter").style.display = "block";
};

fetchCategories();