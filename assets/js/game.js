const categoryDropDown = $("#categories");
const difficultyDropDown = $("#difficulty");
const diffArray = ["Easy", "Medium", "Hard"];
let gameReady = false;
let score = 0;
let currentQuestionSet = 0;
let questionsArray = [];
let questionCounter = 0;
let buttonOnClick = $(".button-click");
const realAnswer = document.getElementById("real-answer");
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
  // let enc_str = encodeURIComponent(str);
  // console.log(decodeURI(enc_str));
  return Array.prototype.slice
    .call(document.getElementsByTagName(tag))
    .filter(el => el.textContent.trim() === str.trim());
};

const setScore = newScore => {
  score = newScore;
  document.getElementById("score-number").innerHTML = newScore;
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
  $(buttonOnClick).prop('disabled', false);
  console.log("Questions array ", questionsArray);
  // Set the question html
  questions.innerHTML = questionsArray[currentQuestionSet].question;
  console.log("Current Question", questionsArray[currentQuestionSet].question);
  // combine all answers to display later
  const allAnswers = [
    questionsArray[currentQuestionSet].correct_answer,
    ...questionsArray[currentQuestionSet].incorrect_answers
  ];
  realAnswer.innerHTML = questionsArray[currentQuestionSet].correct_answer;
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

const addClasses = (className, selectedAnswer, correctAnswer) => {
  selectedAnswer.classList.add(className);
  if (correctAnswer && className !== "correct-answer") {
    correctAnswer.classList.add("correct-answer");
  }
  selectedAnswer.classList.add(className);
  $(buttonOnClick).prop('disabled', true);
};

const removeClasses = (className, selectedAnswer, correctAnswer) => {
  selectedAnswer.classList.remove(className);
  correctAnswer.classList.remove("correct-answer");
};

const getNextQuestion = (className, selectedAnswer) => {
  const correctAnswer = getElementsByString(realAnswer.innerText, "button")[0];
  if (questionCounter < maxQuestions) {
    addClasses(className, selectedAnswer, correctAnswer);
    setTimeout(() => {
      removeClasses(className, selectedAnswer, correctAnswer);
      currentQuestionSet++;
      setQuestionAndAnswers();
    }, 1000);
  } else {
    addClasses(className, selectedAnswer, correctAnswer);
    setTimeout(() => {
      console.log("ending game");
      removeClasses(className, selectedAnswer, correctAnswer);
      endGame();
    }, 1500);
  }
};

const checkAnswer = selectedAnswerNumber => {
  const selectedAnswer = $(`[data-number=${selectedAnswerNumber}]`)[0];
  if (selectedAnswer.innerText === realAnswer.innerText) {
    console.log("Correct!");
    console.log("this is the score", score);
    score += 1;
    setScore(score);
    getNextQuestion("correct-answer", selectedAnswer);

  } else {
    console.log("Incorrect!");
    getNextQuestion("wrong-answer", selectedAnswer);
  }
};

const startGame = () => {
  setScore(0);
  questionCounter = 0;
  currentQuestionSet = 0;
  document.querySelector('.main').classList.add('spinner');
  getQuestions();
  document.getElementById("opening-game").style.display = "none";
  document.getElementById("dropdown-boxes").style.display = "none";
  document.getElementById("footer-main").style.display = "none";
  setTimeout(() => {
    displayGame();
    document.querySelector('.main').classList.remove('spinner');
  }, 2000);

  
};

const replayGame = () => {
  setScore(0);
  questionsArray = [];
  startGame();
  document.getElementById("congrats-text").style.display = "none";
  document.getElementById("play-again-buttons").style.display = "none";
};

const displayGame = () => {
  document.getElementById("questions-main").style.display = "block";
  document.getElementById("score-counter").style.display = "block";
};

const endGame = () => {
  document.getElementById("play-again-buttons").style.display = "block";
  document.getElementById("questions-main").style.display = "none";
  document.getElementById("end-game-container").style.display = "block";
  document.getElementById("score-counter").style.display = "none";
  document.getElementById("congrats-text").style.display = "block";
  let finalScoreText = `Congratulations your final score was ${score}/10`;
  console.log(finalScoreText);
  document.getElementById("congrats-text").innerHTML = finalScoreText;

};

fetchCategories();