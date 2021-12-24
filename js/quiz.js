'use strict'
const quiz_state = true; //state of the quiz
const options = document.querySelector('.options'); // the parent for the answers
const nextBtn = document.querySelector('.next-btn');// next button
const question_slider = document.querySelector('.questions-slider')// parent of navigator boxes
let prevBtn = document.querySelector('.previous-btn');
let selected; //the selected option 
let currentQuestionIndex = 0; // index of current question
let startingSeconds = 200; // starting seconds for the timer
let user_choices = {}; // all the answer questions. Format is QuestionIndex: OptionSelected
let answers_to_questions = {}; // all the answer questions. Format is QuestionIndex: OptionSelected
let final_score = 0; // user final score 
const countdownEl = document.getElementById('countdown'); // countdown timer text
const endQuizBtn = document.getElementById('end-quiz'); // 





let questions = [
    {
        "question": "Which type of JavaScript language is ",
        "options": [
            "Object-Oriented",
            "Object-Based",
            "Assembly-language",
            "High-level"
        ],
        "answer": 1
    },
    {
        "question": "Which one of the following also known as Conditional Expression:",
        "options": [
            "Alternative to if-else",
            "Switch statement",
            "If-then-else statement",
            "immediate if"
        ],
        "answer": 3
    },
    {
        "question": "When interpreter encounters an empty statements, what it will do:",
        "options": [
            "Shows a warning",
            "Prompts to complete the statement",
            "Throws an error",
            "Ignores the statements"
        ],
        "answer": 3
    },
    {
        "question": "The 'function' and 'var' are known as:",
        "options": [
            "Keywords",
            "Data types",
            "Declaration statements",
            "Prototypes"
        ],
        "answer": 2
    }
]
const loadQuestions = (questions) => {
    for (let i = 0; i < questions.length; i++) {

        let each_slider = document.createElement('a');
        each_slider.className = `question-mark question-${i}`;
        each_slider.appendChild(document.createTextNode(i + 1));
        question_slider.appendChild(each_slider);
    }

}

const loadAnswers = (questions) => {
    for (let i = 0; i < questions.length; i++) {

        answers_to_questions[i] = questions[i].answer; // gets all the answer to question and loads them into answers_to_questions object
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
    highlight(currentQuestionIndex);//runs general highlighting
}
const prevQuestion = (e) => {
    displayCurrentQuestion(currentQuestionIndex - 1);// display the previous question 
    currentQuestionIndex--; //change the currentQuestionIndex to reflect the new current question you are on
    highlight(currentQuestionIndex);//runs general highlighting
}

const sliderBoxClicked = (e) => {
    let selectedBoxIndex = e.target.textContent; //the index of the slider box that was clicked
    displayCurrentQuestion(Number(selectedBoxIndex) - 1);// display the question when the user clicks that number
    currentQuestionIndex = Number(selectedBoxIndex) - 1;// change the the current question number
    highlight(currentQuestionIndex); //runs general highlighting
}

const highlightNavs = (index) => {
    if (index === 0) {
        prevBtn.classList.remove('nav-active');// remove the className current from all boxes first
        nextBtn.className += ' nav-active';//make the the nextBtn active
    }
    else if (index === questions.length - 1) {
        nextBtn.classList.remove('nav-active');// remove the className nav-active from the nextBtn
        prevBtn.className += ' nav-active'; //make the the prevBtn active
    }

}
const optionSelected = (e) => {
    const selectedOption = document.getElementById(e.target.id);// index of the option selected
    selected = selectedOption.id; //id of the answer selected
    let selectedOptionIndex = Number(selected.slice(-1));
    user_choices[currentQuestionIndex] = selectedOptionIndex;//add the chosen answer to the json object to hold the answers
    highlightAnswer(currentQuestionIndex);//highlights the current chosen answer in the question
}

loadQuestions(questions); // loads all the questions
loadAnswers(questions); // loads all the answers


// creates navigator slider event handlers
let questionBoxes = Array.from(question_slider.children);
questionBoxes.forEach((box) => {
    box.addEventListener('click', sliderBoxClicked);

})

const highlightAnswer = (currentQuestionIndex) => {
    [0, 1, 2, 3].forEach((option) => {

        document.getElementById(`option-${option}`).className = 'option';// remove all the green backgroundColor  from all options
    });

    if (Object.keys(user_choices).includes((currentQuestionIndex).toString())) {
        let initial_answer = user_choices[currentQuestionIndex];
        let oldSelectedOption = document.getElementById(`option-${initial_answer}`);// old selected option
        oldSelectedOption.className += ' selected-opt';


    }
}
const highlightBox = (currentQuestionIndex) => { //adds green highlight to box to show it's active
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
        computeScore()
        window.location.href = `../completed.html?score=${final_score}_${questions.length}`;// go the completed page with the user final score

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
    highlightBox(1);// highlight the first box
    highlightNavs(0);// highlight the next btn
    startTimer();// starts the timer engine


}

const highlight = (index) => { // function making btns active
    highlightBox(index + 1);//highlights the current question in the navigator slider
    highlightAnswer(index);//highlights the current chosen answer in the question
    highlightNavs(index); //highlights the prev or next btn depending on the questionNumber
}
const computeScore = () => {
    for (let i = 0; i < questions.length; i++) {

        // calculate the final score by check if answers and the user choices are the same
        if (answers_to_questions[i] === user_choices[i]) {
            final_score++

        }
    }
}
const endQuizEarly = (e) => {
    startingSeconds = 0; // resets the timer to 0 and ends the quiz immediately
}

options.addEventListener('click', optionSelected);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
endQuizBtn.addEventListener('click', endQuizEarly);
