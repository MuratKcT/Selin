// ===============================================
// 1. Math Multiplication Quiz Logic (English)
// ===============================================

const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions');
const quizContainer = document.getElementById('quiz-container');

let currentScore = 0;
let currentQuestionNumber = 0;
const totalQuestions = 10;
let correctAnswer = 0;

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNewQuestion() {
    if (currentQuestionNumber >= totalQuestions) {
        quizContainer.innerHTML = `
            <h3>Quiz Finished!</h3>
            <p>Your total score is: ${currentScore} / ${totalQuestions}.</p>
            <p style="color: green; font-weight: bold;">Congratulations, you worked hard!</p>
        `;
        return;
    }

    currentQuestionNumber++;
    const num1 = generateRandomNumber(1, 10);
    const num2 = generateRandomNumber(1, 10);
    correctAnswer = num1 * num2;
    
    questionEl.textContent = `Question ${currentQuestionNumber}: ${num1} x ${num2} = ?`;
    answerInput.value = '';
    feedbackEl.textContent = '';
    submitButton.disabled = false;
    answerInput.focus();
}

function checkAnswer() {
    if (submitButton.disabled) return; 
    
    const userAnswer = parseInt(answerInput.value);
    if (isNaN(userAnswer)) {
        feedbackEl.textContent = "Please enter a number.";
        feedbackEl.style.color = 'orange';
        return;
    }

    if (userAnswer === correctAnswer) {
        currentScore++;
        scoreEl.textContent = currentScore;
        feedbackEl.textContent = 'CORRECT! You are great.';
        feedbackEl.style.color = 'green';
        submitButton.disabled = true;
        setTimeout(generateNewQuestion, 1000);
    } else {
        feedbackEl.textContent = 'WRONG! Try again.';
        feedbackEl.style.color = 'red';
    }
}

submitButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Sayfa yüklendiğinde ilk soruyu oluştur
generateNewQuestion();

// ===============================================
// 2. Irregular Verbs Quiz Logic (English)
// ===============================================

const irregularVerbs = [
    { v1: "be", v2: "was/were", v3: "been" },
    { v1: "go", v2: "went", v3: "gone" },
    { v1: "do", v2: "did", v3: "done" },
    { v1: "see", v2: "saw", v3: "seen" },
    { v1: "come", v2: "came", v3: "come" },
    { v1: "eat", v2: "ate", v3: "eaten" },
    { v1: "write", v2: "wrote", v3: "written" },
    { v1: "run", v2: "ran", v3: "run" },
    { v1: "take", v2: "took", v3: "taken" },
    { v1: "make", v2: "made", v3: "made" },
];

const verbBaseFormEl = document.getElementById('verb-base-form');
const verbV2Input = document.getElementById('verb-v2-input');
const verbV3Input = document.getElementById('verb-v3-input');
const verbSubmitButton = document.getElementById('verb-submit-button');
const verbFeedbackEl = document.getElementById('verb-feedback');
const verbScoreEl = document.getElementById('verb-score');
const verbTotalQuestionsEl = document.getElementById('verb-total-questions');
const irregularVerbQuizContainer = document.getElementById('irregular-verb-quiz-container');


let currentVerbScore = 0;
let currentVerbIndex = -1;
const totalVerbQuestions = irregularVerbs.length;
verbTotalQuestionsEl.textContent = totalVerbQuestions;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let shuffledVerbs = shuffleArray(irregularVerbs); // Karıştırılmış fiil listesi

function generateNewVerbQuestion() {
    currentVerbIndex++;

    if (currentVerbIndex >= totalVerbQuestions) {
        // Quiz bittiğinde fiil quizini temizle ve sonucu göster
        irregularVerbQuizContainer.innerHTML = `
            <h3>Quiz Finished!</h3>
            <p>Your Irregular Verbs score: ${currentVerbScore} / ${totalVerbQuestions}.</p>
            <p style="color: green; font-weight: bold;">Great job, Selin!</p>
        `;
        return;
    }

    const currentVerb = shuffledVerbs[currentVerbIndex];
    verbBaseFormEl.textContent = `Verb Base Form (V1): ${currentVerb.v1}`;
    
    verbV2Input.value = '';
    verbV3Input.value = '';
    verbFeedbackEl.textContent = '';
    verbSubmitButton.disabled = false;
    verbV2Input.focus();
}

function checkVerbAnswer() {
    if (verbSubmitButton.disabled) return;

    const currentVerb = shuffledVerbs[currentVerbIndex];
    const userAnswerV2 = verbV2Input.value.trim().toLowerCase();
    const userAnswerV3 = verbV3Input.value.trim().toLowerCase();
    
    // Birden fazla doğru cevabı (was/were gibi) kontrol etmek için
    const correctV2s = currentVerb.v2.split('/').map(c => c.trim().toLowerCase());
    const correctV3s = currentVerb.v3.split('/').map(c => c.trim().toLowerCase());
    
    const isV2Correct = correctV2s.includes(userAnswerV2);
    const isV3Correct = correctV3s.includes(userAnswerV3);
    
    let feedbackMessage = '';
    let isCorrect = false;

    if (isV2Correct && isV3Correct) {
        currentVerbScore++;
        verbScoreEl.textContent = currentVerbScore;
        feedbackMessage = 'PERFECT! Both forms are correct.';
        verbFeedbackEl.style.color = 'green';
        isCorrect = true;
    } else {
        feedbackMessage = 'WRONG! The correct forms are: ';
        feedbackMessage += `V2: ${currentVerb.v2}, V3: ${currentVerb.v3}.`;
        verbFeedbackEl.style.color = 'red';
        isCorrect = false;
    }

    verbFeedbackEl.textContent = feedbackMessage;
    verbSubmitButton.disabled = true;

    if (isCorrect) {
        setTimeout(generateNewVerbQuestion, 2000);
    } else {
        setTimeout(generateNewVerbQuestion, 3000);
    }
}

verbSubmitButton.addEventListener('click', checkVerbAnswer);

verbV3Input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkVerbAnswer();
    }
});

// Sayfa yüklendiğinde fiil quizini başlat
generateNewVerbQuestion();
