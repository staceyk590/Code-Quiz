const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

var questions = [
    //{
     // title: "Commonly used data types DO NOT include:",
     // choices: ["strings", "booleans", "alerts", "numbers"],
     // answer: "alerts"
   // },
    //{
     // title: "The condition in an if / else statement is enclosed within ____.",
     // choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
     // answer: "parentheses"
   // },

   {
    question: "Commonly used data types DO NOT include:",
    choice1: "<strings>",
    choice2: "<booleans>",
    choice3: "<alerts>",
    choice4: "<numbers>",
    answer: 3
  },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      choice1: "<quotes>",
      choice2: "<curly brackets>",
      choice3: "<parentheses>",
      choice4: "<square brackets>",
      answer: 3
    },

  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

function startGame(){
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  startTimer();
};

function startTimer() {
  var tobj = document.getElementById("timespent")
   var t = "16:30";
   var s = 30;
   var d = new Date();
   var timeint = setInterval(function () {
     s += 1;
     d.setMinutes("16");
     d.setSeconds(s);
     min = d.getMinutes();
     sec = d.getSeconds();
     if (sec < 10) sec = "0" + sec;
     document.getElementById("timespent").value = min + ":" + sec;
   }, 1000);
   tobj.value = t;
 }
 if (window.addEventListener) {              
   window.addEventListener("load", startTimer);
 } else if (window.attachEvent) {                 
   window.attachEvent("onload", startTimer);
 }
 

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/highscores.html");   //need to update the full url

  }
  questionCounter++;
  //progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  console.log("progressbarfull", progressBarFull);
  if(progressBarFull){
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  }

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};



startGame();



//;