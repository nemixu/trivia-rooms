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

//function to call from the api and convert the results into json
const fetchCategories = () => {
  fetch("https://opentdb.com/api_category.php")
    .then(result => result.json())
    .then(data => {
      populateDropDowns(data);
    })
    .catch(error => console.error(error.message));
};

//function to populate the dropdown menus with the resolved promise, iterate through each category and if the category includes and unwanted category - skip and continue
const populateDropDowns = data => {
  const triviaCategories = data.trivia_categories;
  for (let i = 0; i < triviaCategories.length; i++) {
    if (!unwantedCategories.includes(triviaCategories[i].id)) {
      categoryDropDown.append(
        `<option value="${triviaCategories[i].id}">${triviaCategories[i].name}</option>`
      );
    }
  }
  //Populating the difficulty options from the declared variable
  diffArray.forEach(difficulty => {
    difficultyDropDown.append(
      `<option value="${difficulty.toLocaleLowerCase()}">${difficulty}</option>`
    );
  });
};

//shuffling the answers so it does not always have the answer in the same position
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
//Get all elements from the dom, matching the tag to filter based on the string passed, Ending up with an array of elemts that have the matching text strings
const getElementsByString = (str, tag) => {
  return Array.prototype.slice
    .call(document.getElementsByTagName(tag))
    .filter(el => el.textContent.trim() === str.trim());
};

// forcing the score to 0 which can be called whenever needed in the game functionality
const setScore = newScore => {
  score = newScore;
  document.getElementById("score-number").innerHTML = newScore;
};

// Declaring the url using template literals to be able to append what the user chooses and pull from the api the specific categories and difficulty. Pushes the questions into the questionsArray which is declared as empty above.
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

// Setting the questions in the html element
const setQuestionAndAnswers = () => {
  //disable button click during validation of answers
  $(buttonOnClick).prop('disabled', false);
  //return a modal if array length is empty
  if (questionsArray.length === 0) {
    $('#exampleModalCenter').modal('show');
  }
  questions.innerHTML = questionsArray[currentQuestionSet].question;
  const allAnswers = [
    questionsArray[currentQuestionSet].correct_answer,
    ...questionsArray[currentQuestionSet].incorrect_answers
  ];
  //real answer was created to pass the string from the array into the dom as it was not encoded correctly
  realAnswer.innerHTML = questionsArray[currentQuestionSet].correct_answer;
  // shuffle answers and then inputting them to the dom
  const shuffleArr = shuffle(allAnswers);
  let index = 0;
  answers.forEach(answer => {
    index++;
    answer.innerHTML = shuffleArr[index - 1];
  });
  //increment the score counter, this would allow us to know when we got to 10 it would end game.
  questionCounter++;
};
// Adding classes of correct and incorrect by user clicks which will be called by checkanswers, passing in the correct-answer style
const addClasses = (className, selectedAnswer, correctAnswer) => {
  selectedAnswer.classList.add(className);
  if (correctAnswer && className !== "correct-answer") {
    correctAnswer.classList.add("correct-answer");
  }
  selectedAnswer.classList.add(className);
  //disabling the button click after applying the class to stop spam and invalid clicks during validation
  $(buttonOnClick).prop('disabled', true);
};
// removal of the correct-answer from the button, and from the user clicked button
const removeClasses = (className, selectedAnswer, correctAnswer) => {
  selectedAnswer.classList.remove(className);
  correctAnswer.classList.remove("correct-answer");
};

//checking if the question counter is less than the max questions, added a timeout function so the results are not instant and to iterate through the set of questions, set the next questions and answers after 1 and a half seconds. If it reaches maxquestions it calls endGame
const getNextQuestion = (className, selectedAnswer) => {
  const correctAnswer = getElementsByString(realAnswer.innerText, "button")[0];
  if (questionCounter < maxQuestions) {
    addClasses(className, selectedAnswer, correctAnswer);
    setTimeout(() => {
      removeClasses(className, selectedAnswer, correctAnswer);
      currentQuestionSet++;
      setQuestionAndAnswers();
    }, 1500);
  } else {
    addClasses(className, selectedAnswer, correctAnswer);
    setTimeout(() => {
      removeClasses(className, selectedAnswer, correctAnswer);
      endGame();
    }, 1500);
  }
};
// this function checks what the user clicked vs the realanswer, if it is correct increment score by 1, pass the score to setScore, and calling the getnextQuestion function to load the next set of questions
const checkAnswer = selectedAnswerNumber => {
  const selectedAnswer = $(`[data-number=${selectedAnswerNumber}]`)[0];
  if (selectedAnswer.innerText === realAnswer.innerText) {
    score += 1;
    setScore(score);
    getNextQuestion("correct-answer", selectedAnswer);
  } else {
    getNextQuestion("wrong-answer", selectedAnswer);
  }
};
//setting default values to ensure when the game is started it is a fresh game, loads the spinner until the questions have loaded fully, changing styles to none and using a timeoutfunction to remove the spinner
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
//Replay game function resetting values and ensuring the questions array is empty for fresh questions, calling start game and removing the onscreen text from end game.
const replayGame = () => {
  setScore(0);
  questionsArray = [];
  startGame();
  document.getElementById("congrats-text").style.display = "none";
  document.getElementById("play-again-buttons").style.display = "none";
};
//Calling id's and manipulating the styles for smooth interactions
const displayGame = () => {
  document.getElementById("questions-main").style.display = "block";
  document.getElementById("score-counter").style.display = "block";
};

//Endgame function manipulating styles and showing final score for the user.
const endGame = () => {
  document.getElementById("play-again-buttons").style.display = "block";
  document.getElementById("questions-main").style.display = "none";
  document.getElementById("end-game-container").style.display = "block";
  document.getElementById("score-counter").style.display = "none";
  document.getElementById("congrats-text").style.display = "block";
  let finalScoreText = `Congratulations your final score was ${score}/10`;
  document.getElementById("congrats-text").innerHTML = finalScoreText;

};
//fetch categories called to automatically get the categories for a user visiting the application
fetchCategories();