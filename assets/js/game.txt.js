const categoryDropDown = $("#categories");
const difficultyDropDown = $("#difficulty");
const diffArray = ["Easy", "Medium", "Hard"];
const questionLimit = 10;
let gameReady = false;
const bonus = 1;
let numberQuestions = 0;
let score = 0;
const questionsArray = [];

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
  // const unwantedCategories = [13, 19, 24, 25, 29, 30];
  let i;
  for (i = 0; i < triviaCategories.length; i++) {
    if (triviaCategories[i].id != 13) {
      if (
        triviaCategories[i].id != 13 &&
        triviaCategories[i].id != 19 &&
        triviaCategories[i].id != 24 &&
        triviaCategories[i].id != 25 &&
        triviaCategories[i].id != 29 &&
        triviaCategories[i].id != 30
      ) {
        categoryDropDown.append(
          `<option value="${triviaCategories[i].id}">${triviaCategories[i].name}</option>`
        );
        console.log(i);
      } else {
        console.log("category removed");
      }
    }
  }
};

diffArray.forEach(difficulty => {
  difficultyDropDown.append(
    `<option value="${difficulty.toLocaleLowerCase()}">${difficulty}</option>`
  );
});

//shuffling the answers
shuffle = array => {
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

spliceQuestion = () => {
  numberQuestions++;
  questionsArray.splice(numberQuestions - 1, 1);
  return questionsArray;
};

getQuestion = () => {
  const categoryDropDown = $("#categories")[0].value;
  const difficultyDropDown = $("#difficulty")[0].value;
  const questions = document.getElementById("question");
  const answers = Array.from(document.getElementsByClassName("answer"));
  const url = `https://opentdb.com/api.php?amount=10&category=${categoryDropDown}&difficulty=${difficultyDropDown}&type=multiple`;
  gameReady = true;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (let x = 0; x < data.results.length; x++) {
        questionsArray.push(data.results[x]);
      }
      console.log("questions array ", questionsArray);
      const liveQuestion = questionsArray[0].question;
      const correctAnswer = questionsArray[0].correct_answer;
      console.log("Correct Answer", correctAnswer);
      const wrongAnswers = questionsArray[0].incorrect_answers;
      const allAnswers = [correctAnswer, ...wrongAnswers];
      const shuffleArr = shuffle(allAnswers);
      let index = 0;
      answers.forEach(answer => {
        index++;
        const number = answer.dataset["number"];
        answer.innerText = shuffleArr[index - 1];
      });
      questions.innerHTML = liveQuestion;
      console.log("Current Question", liveQuestion);
      console.log("ALL ANSWERS", allAnswers);

      answers.forEach(answer => {
        answer.addEventListener("click", event => {
          if (!gameReady) return;

          gameReady = true;
          const selectedChoice = event.target;
          const selectedAnswer = selectedChoice.dataset["number"];
          const classToApply =
            selectedAnswer == selectedChoice ? "correct" : "incorrect";
          console.log(
            "testttt",
            selectedAnswer,
            correctAnswer,
            selectedChoice,
            classToApply
          );
          if (classToApply == "correct") {
            incrementScore(score);
            console.log("WHOHHHHHHHHHHHHHHHHHH");
          }
          selectedChoice.parentElement.classList.add(classToApply);
          setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getQuestion();
          }, 1000);
        });
      });
    });
};

displayGame = () => {
  document.getElementById("questions-main").style.display = "block";
  document.getElementById("opening-game").style.display = "none";
  document.getElementById("dropdown-boxes").style.display = "none";
  document.getElementById("footer-main").style.display = "none";
  document.getElementById("score-counter").style.display = "block";
};

startGame = () => {
  numberQuestions = 0;
  score = 0;
  getQuestion();
  displayGame();
  fetchCategories();
};

fetchCategories();

//     for (i = 0; i < triviaCategories.length; i++) {
//         console.log('test', triviaCategories.indexOf(this.id === 13))
//         if (triviaCategories[i].id === 9) {
//             triviaCategories.splice(i, 1);
//         } else {
//             categoryDropDown.append(`<option value="${triviaCategories[i].id}">${triviaCategories[i].name}</option>`);
//         }
//     }
// };
// let i;
