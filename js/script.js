import quiz from './quizData.js'; //import quiz data

const questionCounterElem = document.querySelector('#questionCounter'),
    answerForm = document.querySelector('#answerForm'),
    questionElem = document.querySelector('#question'),
    answersBlock = document.querySelector('#answers');
const resultBlock = document.querySelector('#resultBlock'),
    resultTitleElem = document.querySelector('#resultTitle'),
    resultScoreElem = document.querySelector('#resultScore'),
    checkAnswerBtn = document.querySelector('#checkAnswer');
const backToScore = document.querySelector('#backToScore'),
    prevBtn = document.querySelector('#prev'),
    nextBtn = document.querySelector('#next');


let quizStep = 1, //from 1
    userAnswers = [], //user answers for all question
    score = 0,
    isRight;

function showQuestion () {
    let question = quiz[quizStep].question,
        answers = quiz[quizStep].answers,
        answerType = quiz[quizStep].answerType;


    questionCounterElem.textContent = `${quizStep} / ${quiz.length - 1}`;
    questionElem.textContent = question;

    answersBlock.innerHTML = '';
    answers.forEach((item, index) => {
        answersBlock.innerHTML += 
        `
        <label for="answer-${index}" class="answer-${answerType}">
            <input type="${answerType}" class="answer" id="answer-${index}" name="answer">
            <span>${item}</span>
        </label>
        `
    });
}
showQuestion();

function formSubmit (e) {
    e.preventDefault();
    let userAnswer = []; //Answers for one question

    answerForm['answer'].forEach((item, index) => {
        if (item.checked) {
            userAnswer.push(index);
        }
    })
    userAnswers.push(userAnswer);

    quizStep++;
    if (quizStep < quiz.length) {
        showQuestion();
    } else {
        quizStep = 1;
        quizEnd();
    }
}

function quizEnd () {
    answerForm.style.display = 'none';
    questionCounterElem.style.display = 'none';
    answerForm['submit'].remove();
    resultBlock.style.display = 'flex'; //!important flex only

    if (!quiz[0].allRight) {
        compareAnswers();
        resultScoreElem.textContent = `${score} / ${quiz.length - 1}`;
    } else {
        resultTitleElem.innerHTML = "Great! </br> You've completed test";
    }
}

function compareAnswers () {
    let rightAnswers = quiz.map(item => item.rightAnswer)
    rightAnswers.splice(0,1);
    
    isRight = rightAnswers.map((item, index) => {
        if (item.join() === userAnswers[index].join() && quiz[index + 1].answerType === 'radio') {
            score++;
            return true;
        } else {
            return false;
        }

        // if (quiz[index + 1].answerType == 'checkbox') {
        // }
    })
}

function showAnswers () {
    showQuestion();
    answerForm['answer'].forEach((item, index) => {
        item.disabled = true;
        if (userAnswers[quizStep - 1] == index) {
            item.checked = true;
            if (!quiz[0].allRight) {
                isRight[quizStep - 1] ? item.classList.add('right') : item.classList.add('wrong');
            }
        }

        if (quiz[quizStep].rightAnswer[0] == index && quiz[0].showRight && !quiz[0].allRight) {
            item.checked = true;
            item.classList.add('right');
        }
    });
}


answerForm.addEventListener('submit', formSubmit);
checkAnswerBtn.addEventListener('click', () => {
    resultBlock.style.display = 'none';
    answerForm.style.display = 'flex'; //!important flex only
    backToScore.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    questionCounterElem.style.display = 'block';
    showAnswers();
});


backToScore.addEventListener('click', () => {
    answerForm.style.display = 'none';
    questionCounterElem.style.display = 'none';
    resultBlock.style.display = 'flex'; //!important flex only
});
nextBtn.addEventListener('click', () => {
    quizStep++;

    if (quizStep < quiz.length) {
        showAnswers();
    } else {
        quizStep = 1;
        showAnswers();
    }
});
prevBtn.addEventListener('click', () => {
    quizStep--;

    if (quizStep > 0) {
        showAnswers();
    } else {
        quizStep = quiz.length - 1;
        showAnswers();
    }
});