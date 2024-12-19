const questions = [
    {
        question: 'What is the most important thing in life?',
        answers: [
            { text: 'Money', correct: false },
            { text: 'Health', correct: true },
            { text: 'Fame', correct: false },
            { text: 'Material possessions', correct: false },
        ]
    },
    {
        question: 'What is the key to a successful life?',
        answers: [
            { text: 'Luck', correct: false },
            { text: 'Connections', correct: false },
            { text: 'Wealth', correct: false },
            { text: 'Hard work', correct: true },
        ]
    },
    {
        question: 'Which of the following is the best way to deal with stress?',
        answers: [
            { text: 'Ignore it and move on', correct: false },
            { text: 'Work harder', correct: false },
            { text: 'Take a break and relax', correct: true },
            { text: 'Keep thinking about it', correct: false },
        ]
    },
    {
        question: 'What is the most valuable resource in life?',
        answers: [
            { text: 'Knowledge', correct: false },
            { text: 'Money', correct: false },
            { text: 'Friends', correct: false },
            { text: 'Time', correct: true },
        ]
    },
    {
        question: 'What makes life truly meaningful?',
        answers: [
            { text: 'Achievements', correct: false },
            { text: 'Relationships', correct: true },
            { text: 'Adventures', correct: false },
            { text: 'Wealth', correct: false },
        ]
    }
];

const questionElement = document.querySelector('#question')
const answerButtons = document.querySelector('#answer-buttons')
const nextButton = document.querySelector('#next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'Next'
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = 'none'
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if (isCorrect) {
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextButton.style.display = 'block'
}

let audio = new Audio('./quiz.mp3')
function showScore() {
    resetState()
    audio.play()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉🎉🎊🎊`
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
        audio.pause()
    }
})

startQuiz()