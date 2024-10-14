const words = ["javascript", "hangman", "developer", "keyboard", "challenge"];
let selectedWord = "";
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const messageDisplay = document.getElementById("message");
const virtualKeyboard = document.getElementById("virtual-keyboard");
const resetButton = document.getElementById("reset-btn");

// Initialize the game
function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    messageDisplay.textContent = "";
    generateKeyboard();
    updateWordDisplay();
}

function generateKeyboard() {
    virtualKeyboard.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const keyButton = document.createElement("button");
        keyButton.textContent = letter;
        keyButton.classList.add("key");
        keyButton.addEventListener("click", () => handleGuess(letter));
        virtualKeyboard.appendChild(keyButton);
    }
}

// Update the displayed word with underscores and guessed letters
function updateWordDisplay() {
    const wordWithBlanks = selectedWord
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    wordDisplay.textContent = wordWithBlanks;

    if (!wordWithBlanks.includes("_")) {
        messageDisplay.textContent = "You Win! 🎉";
        disableAllKeys();
    }
}

// Handle user guesses (via click or keyboard)
function handleGuess(letter) {
    letter = letter.toLowerCase(); // Normalize input to match the word

    if (guessedLetters.includes(letter) || remainingAttempts <= 0) return;

    guessedLetters.push(letter);
    if (!selectedWord.includes(letter)) {
        remainingAttempts--;
        if (remainingAttempts === 0) {
            messageDisplay.textContent = `Game Over! The word was: ${selectedWord}`;
            disableAllKeys();
        }
    }
    updateWordDisplay();
    disableKey(letter.toUpperCase()); // Disable the key on virtual keyboard
}

// Disable a specific key button
function disableKey(letter) {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
        if (key.textContent === letter) {
            key.classList.add("disabled");
        }
    });
}

// Disable all keys when the game is over
function disableAllKeys() {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => key.classList.add("disabled"));
}

// Handle keyboard input
window.addEventListener("keydown", (event) => {
    const letter = event.key.toUpperCase();
    if (letter >= "A" && letter <= "Z") {
        handleGuess(letter);
    }
});

// Reset the game
resetButton.addEventListener("click", initializeGame);

// Start the game when the page loads
initializeGame();
