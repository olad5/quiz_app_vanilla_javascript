// 'use strict'


const quiz_state = true;
let options = document.querySelector('.options');
let nextBtn = document.querySelector('.next-btn');
let prevBtn = document.querySelector('.previous-btn');
let selected;
let currentQuestionIndex = 0;




let questions = [
    {"question": "Yo what's good?", "options": ["stuff", 'mike', 'tony', 'kanye'], "answer": 2},
    {"question": "If west coast is to west, east coast is to?", "options": ["North", 'South', 'East', 'West'], "answer": 1},
    {"question": "What's good", "options": ["North", 'South', 'East', 'West'], "answer": 0},
    {"question": "How are you", "options": ["North", 'South', 'East', 'West'], "answer": 3},
]

const loadQuestions = (questions) => {
    const question_slider = document.querySelector('.questions-slider')
    for (let i = 0; i < questions.length; i++) {

        let each_slider = document.createElement('div');
        each_slider.className = `question-mark question-${i + 1}`;
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

}
const prevQuestion = (e) => {
    // get the previous question index
    displayCurrentQuestion(currentQuestionIndex - 1);
    currentQuestionIndex--;

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

if (quiz_state) {
    // print the first question
    displayCurrentQuestion(0);
}

options.addEventListener('click', optionSelected);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
