'use strict'


const quiz_state = true; //state of the quiz
let options = document.querySelector('.options'); // the parent for the answers
let nextBtn = document.querySelector('.next-btn');// next button
const question_slider = document.querySelector('.questions-slider')// parent of navigator boxes
let prevBtn = document.querySelector('.previous-btn');
let selected; //the selected option 
let currentQuestionIndex = 0; // index of current question
let startingSeconds = 5; // starting seconds for the timer
let questions_answered = {}; // all the answer questions. Format is QuestionIndex: OptionSelected
const countdownEl = document.getElementById('countdown'); // countdown timer text





let questions = [
    {"question": "Yo what's good?", "options": ["stuff", 'mike', 'tony', 'kanye'], "answer": 2},
    {"question": "If west coast is to west, east coast is to?", "options": ["North", 'South', 'East', 'West'], "answer": 1},
    {"question": "What's good", "options": ["North", 'South', 'East', 'West'], "answer": 0},
    {"question": "How are you", "options": ["North", 'South', 'East', 'West'], "answer": 3},
]

const loadQuestions = (questions) => {
    for (let i = 0; i < questions.length; i++) {

        let each_slider = document.createElement('div');
        each_slider.className = `question-mark question-${i}`;
        each_slider.appendChild(document.createTextNode(i + 1));
        question_slider.appendChild(each_slider);
    }

}

const displayCurrentQuestion = (question_index) => {
    let question_num = document.querySelector('.question-num');
    let question_text = document.querySelector('.question-text');
    question_text.textContent = questions[question_index].question;
    question_num.textContent = `${question_index + 1}.  `;
    for (let i = 0; i < options.children.length; i++) {
        options.children[i].innerHTML = `<span class="checkbox"></span>${questions[question_index].options[i]}`
        options.children[i].id = `option-${i}`

    }
    return true;

}



const nextQuestion = (e) => {
    displayCurrentQuestion(currentQuestionIndex + 1);// display the next question 
    currentQuestionIndex++;//change the currentQuestionIndex to reflect the new current question you are on
    highlightBox(currentQuestionIndex + 1);//highlights the current question in the navigator slider
    highlightAnswer(currentQuestionIndex);//highlights the current chosen answer in the question

}
const prevQuestion = (e) => {
    displayCurrentQuestion(currentQuestionIndex - 1);// display the previous question 
    currentQuestionIndex--; //change the currentQuestionIndex to reflect the new current question you are on
    highlightBox(currentQuestionIndex + 1)//highlights the current question in the navigator slider;
    highlightAnswer(currentQuestionIndex); //highlights the current chosen answer in the question

}
const sliderBoxClicked = (e) => {
    let selectedBoxIndex = e.target.textContent; //the index of the slider box that was clicked
    displayCurrentQuestion(Number(selectedBoxIndex) - 1);// display the question when the user clicks that number
    currentQuestionIndex = Number(selectedBoxIndex) - 1;// change the the current question number
    highlightBox(currentQuestionIndex + 1);//highlights the current question in the navigator slider 

}
const optionSelected = (e) => {

    const selectedOption = document.getElementById(e.target.id);// index of the option selected

    selected = selectedOption.id; //id of the answer selected
    let selectedOptionIndex = Number(selected.slice(-1));
    questions_answered[currentQuestionIndex] = selectedOptionIndex;//add the chosen answer to the json object to hold the answers
    highlightAnswer(currentQuestionIndex);//highlights the current chosen answer in the question


}

// loads all the questions
loadQuestions(questions);


// creates navigator slider event handlers
let questionBoxes = Array.from(question_slider.children);
questionBoxes.forEach((box) => {
    box.addEventListener('click', sliderBoxClicked);

})

const highlightAnswer = (currentQuestionIndex) => {
    [0, 1, 2, 3].forEach((option) => {

        document.getElementById(`option-${option}`).className = 'option';// remove all the green backgroundColor  from all options
    });

    if (Object.keys(questions_answered).includes((currentQuestionIndex).toString())) {
        let initial_answer = questions_answered[currentQuestionIndex];
        let oldSelectedOption = document.getElementById(`option-${initial_answer}`);// old selected option
        oldSelectedOption.className += ' selected-opt';


    }
}
const highlightBox = (currentQuestionIndex) => {
    questionBoxes.forEach((box) => {
        box.classList.remove('current');// remove the className current from all boxes first

    })

    document.querySelector(`.question-${currentQuestionIndex - 1}`).className += ' current';// then apply it to the current question

}

const startTimer = () => { // code to start the timer
    const minutes = Math.floor(startingSeconds / 60);
    let seconds = startingSeconds % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`
    startingSeconds--;
    if (startingSeconds < 0) {
        endTimer();
        window.location.href = "../completed.html";// go the completed page

    }

}

const endTimer = () => { // code to end the timer
    clearInterval(timerIntervalId);
    // release our intervalId from the variable
    timerIntervalId = null;

}

let timerIntervalId = setInterval(startTimer, 1000);// runs the changes in the timer
if (quiz_state) {
    displayCurrentQuestion(0); // prints the first question
    highlightBox(1);// highlight the first box(not a clean implementation)
    startTimer();// starts the timer engine
}

options.addEventListener('click', optionSelected);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
