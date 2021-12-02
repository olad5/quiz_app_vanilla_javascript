'use strict'


const quiz_state = true; //state of the quiz
let options = document.querySelector('.options'); // the parent for the answers
let nextBtn = document.querySelector('.next-btn');// next button
const question_slider = document.querySelector('.questions-slider')// parent of navigator boxes
let prevBtn = document.querySelector('.previous-btn');
let selected; //the selected option 
let currentQuestionIndex = 0; // index of current question
let startingSeconds = 5; // starting seconds for the timer
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
    // get the previous question index
    displayCurrentQuestion(currentQuestionIndex + 1);
    currentQuestionIndex++;
    highlightBox(currentQuestionIndex + 1);

}
const prevQuestion = (e) => {
    // get the previous question index
    displayCurrentQuestion(currentQuestionIndex - 1);
    currentQuestionIndex--;
    highlightBox(currentQuestionIndex + 1);

}
const sliderBoxClicked = (e) => {
    let selectedBoxIndex = e.target.textContent;
    // get the index of the selected box
    displayCurrentQuestion(Number(selectedBoxIndex) - 1);
    currentQuestionIndex = Number(selectedBoxIndex);
    highlightBox(currentQuestionIndex);


}
const optionSelected = (e) => {
    // index of the option selected
    const selectedOption = document.getElementById(e.target.id);

    // checks that a Selection  exists and that new selection is not the same id as the previous Option
    if (Boolean(selected) == true && selected != selectedOption.id) {

        // reverse the old option styles to the default state
        let oldOption = document.getElementById(`${selected}`);
        oldOption.style.backgroundColor = '';
        oldOption.style.color = '';
        oldOption.className = 'option';
    }
    selectedOption.className += ' selected-opt';
    selected = selectedOption.id;

}

// loads all the questions
loadQuestions(questions);


// creates navigator slider event handlers
let questionBoxes = Array.from(question_slider.children);
questionBoxes.forEach((box) => {
    box.addEventListener('click', sliderBoxClicked);

})

const highlightBox = (currentQuestionIndex) => {
    // remove the className from all boxes first
    questionBoxes.forEach((box) => {
        box.classList.remove('current');

    })

    // then apply it to the current question
    document.querySelector(`.question-${currentQuestionIndex - 1}`).className += ' current';

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
let timerIntervalId = setInterval(startTimer, 1000);// runs the changes in the timer

const endTimer = () => { // code to end the timer
    clearInterval(timerIntervalId);
    // release our intervalId from the variable
    timerIntervalId = null;

}

if (quiz_state) {
    displayCurrentQuestion(0); // prints the first question
    highlightBox(1);// highlight the first box(not a clean implementation)
    startTimer();// starts the timer engine
}

options.addEventListener('click', optionSelected);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
