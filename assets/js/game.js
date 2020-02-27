const categoryDropDown = $("#categories");
const difficultyDropDown = $("#difficulty");
const diffArray = ["Easy", "Medium", "Hard"];
const questionLimit = 10;
let gameReady = false;
let score = 0;
let scoreContainer = document.getElementById("score-number");
let currentQuestionSet = 0;
const questionsArray = [];
const questions = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer"));
const unwantedCategories = [13, 19, 24, 25, 29, 30];
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

  // shuffle array
  const shuffleArr = shuffle(allAnswers);
  let index = 0;
  answers.forEach(answer => {
    index++;
    answer.innerText = shuffleArr[index - 1];
  });
  console.log("ALL ANSWERS", allAnswers);
};

const getNextQuestion = (className, selectedAnswer) => {
  selectedAnswer.classList.add(className);
  setTimeout(() => {
    selectedAnswer.classList.remove(className);
    currentQuestionSet++;
    setQuestionAndAnswers();
  }, 1000);
};

const checkAnswer = selectedAnswerNumber => {
  const selectedAnswer = $(`[data-number=${selectedAnswerNumber}]`)[0];
  if (
    selectedAnswer.innerHTML ===
    questionsArray[currentQuestionSet].correct_answer
  ) {
    console.log("Correct!");
    getNextQuestion("correct-answer", selectedAnswer);
    score++;
    scoreContainer.innerText = score;
  } else {
    console.log("Incorrect!");
    getNextQuestion("wrong-answer", selectedAnswer);
  }
};

const displayGame = () => {
  document.getElementById("questions-main").style.display = "block";
  document.getElementById("opening-game").style.display = "none";
  document.getElementById("dropdown-boxes").style.display = "none";
  document.getElementById("footer-main").style.display = "none";
  document.getElementById("score-counter").style.display = "block";
};

const startGame = () => {
  score = 0;
  getQuestions();
  displayGame();
};

fetchCategories();