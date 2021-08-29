const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What do we say to the god of death?',
        choice1: 'What is dead may never die',
        choice2: 'Valar morghulis',
        choice3: 'Not today',
        choice4: 'Valar dohaeris',
        answer: 3,
    },
    {
        question: "Towards the end of season two, who finds dragonglass north of the wall?",
        choice1: "Samwell Tarley",
        choice2: "Eddison Tollett",
        choice3: "Jon Snow",
        choice4: "Benjen Stark",
        answer: 1,
    },
    {
        question: "Which pair conspired and successfully poisoned King Joffrey?",
        choice1: "Sansa & Tyrion",
        choice2: "Arya & Jaqen H'ghar",
        choice3: "Olenna Tyrell & Littlefinger",
        choice4: "Olenna Tyrell & Ellaria Sand",
        answer: 3,
    },
    {
        question: "What is the name of Rickon Stark's direwolf?",
        choice1: "Lady",
        choice2: "Grey Wind",
        choice3: "Nymeria",
        choice4: "Shaggydog",
        answer: 4,
    },
    {
        question: "Chaos isn't a pit. Chaos is a ladder. Who said this?",
        choice1: "Lord Varys",
        choice2: "Cersei",
        choice3: "Sansa",
        choice4: "Littlefinger",
        answer: 4,
    },
    {
        question: "War is war, but killing a man at a wedding, horrid. Who said this?",
        choice1: "Catelyn Stark",
        choice2: "Lady Olenna",
        choice3: "Cersei",
        choice4: "Samwell",
        answer: 2,
    },
    {
        question: "Which castle did both Stannis Baratheon and Daenerys Targaryen spend some time waging out battle plans in?",
        choice1: "Dragonstone",
        choice2: "Casterly Rock",
        choice3: "Castle Black",
        choice4: "Highgarden",
        answer: 1,
    },
    {
        question: "Who ended up marrying one of Walder Frey's daughters in lieu of Robb Stark's broken promise?",
        choice1: "Theon Greyjoy",
        choice2: "Edmure Tully",
        choice3: "Tormund Giantsbane",
        choice4: "Littlefinger",
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()