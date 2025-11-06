// ====== Math Multiplication Quiz Logic (English) ======

// Defining variables and DOM elements
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
let correctAnswer = 0; // Variable to hold the correct answer

// Displaying total number of questions in HTML
totalQuestionsEl.textContent = totalQuestions;

// Function to generate a random number
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a new question
function generateNewQuestion() {
    if (currentQuestionNumber >= totalQuestions) {
        // Quiz finished
        quizContainer.innerHTML = `
            <h3>Quiz Finished!</h3>
            <p>Your total score is: ${currentScore} / ${totalQuestions}.</p>
            <p style="color: green; font-weight: bold;">Congratulations, you worked hard!</p>
        `;
        return;
    }

    currentQuestionNumber++;
    
    // Selecting two random numbers between 1 and 10
    const num1 = generateRandomNumber(1, 10);
    const num2 = generateRandomNumber(1, 10);
    
    correctAnswer = num1 * num2;
    
    // Question text in English
    questionEl.textContent = `Question ${currentQuestionNumber}: ${num1} x ${num2} = ?`;
    answerInput.value = ''; // Clear the input box
    feedbackEl.textContent = ''; // Clear feedback
    submitButton.disabled = false; // Enable the button
    answerInput.focus(); // Focus on the input box
}

// Function to check the answer
function checkAnswer() {
    // Eğer buton devre dışıysa, işlemi durdur
    if (submitButton.disabled) return; 
    
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        feedbackEl.textContent = "Please enter a number.";
        feedbackEl.style.color = 'orange';
        return;
    }

    if (userAnswer === correctAnswer) {
        // Correct answer!
        currentScore++;
        scoreEl.textContent = currentScore;
        feedbackEl.textContent = 'CORRECT! You are great.';
        feedbackEl.style.color = 'green';
        submitButton.disabled = true; // Prevent checking again
        
        // Load the new question after one second
        setTimeout(generateNewQuestion, 1000);
    } else {
        // Wrong answer
        feedbackEl.textContent = 'WRONG! Try again.';
        feedbackEl.style.color = 'red';
    }
}

// Adding Event Listeners
submitButton.addEventListener('click', checkAnswer);

// Check when the user presses Enter
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // Enter'a basıldığında da kontrol et
        checkAnswer();
    }
});

// Generate the first question when the page loads
generateNewQuestion();
// ====== Irregular Verbs Quiz Logic (English) ======

// Düzensiz fiiller listesi (daha sonra genişletilebilir)
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

// Fiil Quizi DOM elementleri
const verbBaseFormEl = document.getElementById('verb-base-form');
const verbV2Input = document.getElementById('verb-v2-input');
const verbV3Input = document.getElementById('verb-v3-input');
const verbSubmitButton = document.getElementById('verb-submit-button');
const verbFeedbackEl = document.getElementById('verb-feedback');
const verbScoreEl = document.getElementById('verb-score');
const verbTotalQuestionsEl = document.getElementById('verb-total-questions');

let currentVerbScore = 0;
let currentVerbIndex = -1; // Hangi fiili sorduğumuzu tutar
const totalVerbQuestions = irregularVerbs.length;

// Toplam soru sayısını güncelle
verbTotalQuestionsEl.textContent = totalVerbQuestions;

// Rastgele fiil sırası oluştur
let shuffledVerbs = shuffleArray(irregularVerbs);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Yeni fiil sorusu oluşturma
function generateNewVerbQuestion() {
    currentVerbIndex++;

    if (currentVerbIndex >= totalVerbQuestions) {
        // Quiz bitti
        verbBaseFormEl.innerHTML = `
            <h3>Quiz Finished!</h3>
            <p>Your Irregular Verbs score: ${currentVerbScore} / ${totalVerbQuestions}.</p>
            <p style="color: green; font-weight: bold;">Great job, Selin!</p>
        `;
        verbV2Input.style.display = 'none';
        verbV3Input.style.display = 'none';
        verbSubmitButton.style.display = 'none';
        verbFeedbackEl.textContent = '';
        return;
    }

    const currentVerb = shuffledVerbs[currentVerbIndex];
    
    // Soru metnini güncelle (Base Form)
    verbBaseFormEl.textContent = `Verb Base Form (V1): ${currentVerb.v1}`;
    
    verbV2Input.value = ''; // Giriş kutularını temizle
    verbV3Input.value = '';
    verbFeedbackEl.textContent = ''; // Geri bildirimi temizle
    verbSubmitButton.disabled = false;
    verbV2Input.focus(); // İlk giriş kutusuna odaklan
}

// Fiil cevabını kontrol etme fonksiyonu
function checkVerbAnswer() {
    if (verbSubmitButton.disabled) return;

    const currentVerb = shuffledVerbs[currentVerbIndex];
    
    // Kullanıcı cevaplarını alma ve boşlukları temizleme
    const userAnswerV2 = verbV2Input.value.trim().toLowerCase();
    const userAnswerV3 = verbV3Input.value.trim().toLowerCase();
    
    // Doğru cevapları alma ve birden fazla doğru cevabı (was/were gibi) kontrol etmek için dizi oluşturma
    const correctV2s = currentVerb.v2.split('/').map(c => c.trim().toLowerCase());
    const correctV3s = currentVerb.v3.split('/').map(c => c.trim().toLowerCase());
    
    // Cevapları kontrol etme
    const isV2Correct = correctV2s.includes(userAnswerV2);
    const isV3Correct = correctV3s.includes(userAnswerV3);
    
    let feedbackMessage = '';
    let isCorrect = false;

    if (isV2Correct && isV3Correct) {
        // Tamamen doğru
        currentVerbScore++;
        verbScoreEl.textContent = currentVerbScore;
        feedbackMessage = 'PERFECT! Both forms are correct.';
        verbFeedbackEl.style.color = 'green';
        isCorrect = true;
    } else {
        // Yanlış veya kısmen yanlış
        feedbackMessage = 'WRONG! The correct forms are: ';
        feedbackMessage += `V2: ${currentVerb.v2}, `;
        feedbackMessage += `V3: ${currentVerb.v3}.`;
        verbFeedbackEl.style.color = 'red';
        isCorrect = false;
    }

    verbFeedbackEl.textContent = feedbackMessage;
    verbSubmitButton.disabled = true; // Tekrar kontrol etmeyi engelle

    if (isCorrect) {
        // Doğruysa 2 saniye sonra yeni soru yükle
        setTimeout(generateNewVerbQuestion, 2000);
    } else {
        // Yanlışsa, 3 saniye sonra yeni soruyu yükle (Cevapları görmesi için biraz zaman tanı)
        setTimeout(generateNewVerbQuestion, 3000);
    }
}

// Olay dinleyicilerini (Event Listeners) ekleme
verbSubmitButton.addEventListener('click', checkVerbAnswer);

// Kullanıcı Enter'a bastığında da kontrol et (V3 alanındayken)
verbV3Input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkVerbAnswer();
    }
});

// Sayfa yüklendiğinde fiil quizini başlat
// NOT: Quiz'in başlaması için bu satırı eklemeyi unutmayın!
generateNewVerbQuestion();
