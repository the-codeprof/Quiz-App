

const questionNumber  = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter  = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


// pushes the question into availableQuestions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }
   
}

// set question number, question and options
function getNewQuestion(){
    // set question number
       questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text

    // get random question
        const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        currentQuestion = questionIndex;
        questionText.innerHTML = currentQuestion.q;
//      get the position of questionIndex from the availableQuestions array
const index1 = availableQuestions.indexOf(questionIndex);

// remove the questionIndex from the availableQuestions array, to avoid repetition of questions in the same session.
availableQuestions.splice(index1, 1);

// set options
// get the length of options

const optionLen = currentQuestion.options.length;
for(let i=0; i<optionLen; i++){
    availableOptions.push(i);
   
}

// create options in HTML
optionContainer.innerHTML = '';
let animationDelay = 0.15;

for(let i=0; i<optionLen; i++){

    // random option

    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of the optionIndex in the availableOptions array
    const index2 = availableOptions.indexOf(optionIndex);
    // remove the optionIndex from the availableOptions array to avoid displaying the same option twice
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay += 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
    
}

        questionCounter++;

}

// get result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    // get the answer by comparing id of the clicked option
    if(id === currentQuestion.answer){
        //set the background color of correct option to green
        element.classList.add("correct");
        // add indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }else{
         //set the background color of wrong option to red
         element.classList.add("wrong");
          // add indicator to wrong mark
        updateAnswerIndicator("wrong");
         // if the chosen option is wrong, then show the correct option by adding green background to the correct option
         
         const optionLen = optionContainer.children.length;
         for(let i=0; i<optionLen; i++){
             if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
             }
         }
    }


    attempt++;
    unclickableOptions();
}

// this is to disable all other options after the user selected one
function unclickableOptions(){
    const optionLen  = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType){
     answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
};
function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }else{
        getNewQuestion();
    }
}

function quizOver(){
    // hide the quiz box
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

// get quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    // hide the result box
    resultBox.classList.add("hide");
    // show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result box
    resultBox.classList.add("hide");

    // show the home-box
    homeBox.classList.remove("hide");
    resetQuiz();
}


/// starting point 

function startQuiz(){
    //hide home-box

    homeBox.classList.add("hide");

    // show quiz-box

    quizBox.classList.remove("hide");

    // first we will set all questions in availableQuestions Array
    setAvailableQuestions();

    // second we will call getNewQuestion() function
    getNewQuestion();

    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}