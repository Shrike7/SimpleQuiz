const quiz = [
    /**
     * 
        { Quiz settings
            allRight: false, If true then rightAnswer isn't important and all answers will be right
            showRight: false, If true then in the end of the quiz user will be able to check correct answers
        }

     * { Question settings
            question: 'Question',
            answers: ['first answer', 'second answer'],
            answerType: 'checkbox/radio',
            rightAnswer: [0],
        }

    */
    {   //Quiz settings
        allRight: false,
        showRight: true,
    },
    {
        question: 'First question of this quiz',
        answers: ['first answer', 'second answer', 'third answer'],
        answerType: 'radio',
        rightAnswer: [0],
    },
    {
        question: 'Second question of this quiz',
        answers: ['first answer', 'second answer', 'third answer', 'fourth answer'],
        answerType: 'radio',
        rightAnswer: [2],
    },
    {
        question: 'Third question of this quiz',
        answers: ['first answer', 'second answer', 'third answer', 'fourth answer'],
        answerType: 'radio',
        rightAnswer: [3],
    },
];

export default quiz;