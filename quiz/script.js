let currentQuestionIndex = 0;
let score = 0;
let username = '';

const questions = [
    {
        question: "Qual é a melhor maneira de evitar a procrastinação?",
        options: ["Fazer as tarefas mais difíceis primeiro", "Deixar para depois o que é complicado", "Assistir TV até se sentir motivado"],
        answer: 0
    },
    {
        question: "O que é a técnica Pomodoro?",
        options: ["Uma técnica de culinária", "Dividir o trabalho em intervalos de tempo com pausas", "Trabalhar continuamente sem parar"],
        answer: 1
    },
    {
        question: "Qual é uma boa prática para gerenciar seu tempo?",
        options: ["Multitarefa sempre", "Priorizar tarefas importantes", "Não planejar nada"],
        answer: 1
    }
];

function startQuiz() {
    username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    document.getElementById('username-display').textContent = `Olá, ${username}!`;
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <p>${questionData.question}</p>
        ${questionData.options.map((option, index) => `
            <label><input type="radio" name="answer" value="${index}"> ${option}</label><br>
        `).join('')}
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Por favor, selecione uma resposta.');
        return;
    }

    const answer = parseInt(selectedOption.value);
    if (answer === questions[currentQuestionIndex].answer) {
        score++;
    }

    document.getElementById('score').textContent = score;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    localStorage.setItem('quizResult', JSON.stringify({ username: username, score: score }));
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-username').textContent = username;
    document.getElementById('final-score').textContent = score;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('username').value = '';
}
