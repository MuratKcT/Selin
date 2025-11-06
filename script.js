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
