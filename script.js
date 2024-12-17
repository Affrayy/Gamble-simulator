let userWinProbability = 0.8; // Start with high probability of winning (80%)
let balance = 1000000000; // Initial balance

function gamble() {
    let randomNumber = Math.random();
    if (randomNumber < userWinProbability) {
        userWinProbability -= 0.05;
        if (userWinProbability < 0.1) userWinProbability = 0.1;
        return "Win!";
    } else {
        return "Lose!";
    }
}

// DOM Elements
const gambleButton = document.getElementById("gambleButton");
const card = document.getElementById("card");
const cardResult = document.getElementById("cardResult");
const resultDiv = document.getElementById("result");
const balanceDisplay = document.getElementById("balance");
const betAmountInput = document.getElementById("betAmount");

// Update balance display
function updateBalanceDisplay() {
    balanceDisplay.textContent = balance.toLocaleString();
}

// Event Listener
gambleButton.addEventListener("click", () => {
    const betAmount = parseInt(betAmountInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        resultDiv.textContent = "Invalid bet amount!";
        return;
    }

    if (betAmount > balance) {
        resultDiv.textContent = "Insufficient balance!";
        return;
    }

    // Disable button during animation
    gambleButton.disabled = true;

    // Start card spin
    card.style.transform = "rotateY(360deg)";
    
    // Wait for animation to complete
    setTimeout(() => {
        const result = gamble();

        if (result === "Win!") {
            const winnings = betAmount * 2; // User wins double the bet
            balance += winnings;
            resultDiv.textContent = `You win! You gained ${winnings.toLocaleString()}!`;
        } else {
            balance -= betAmount;
            resultDiv.textContent = `You lose! You lost ${betAmount.toLocaleString()}!`;
        }

        // Update balance display
        updateBalanceDisplay();

        // Show result side of the card
        cardResult.textContent = result === "Win!" ? "🎉" : "💔";
        card.style.transform = "rotateY(180deg)";

        // Re-enable button after showing result
        setTimeout(() => {
            gambleButton.disabled = false;
            // Reset card for next round
            card.style.transform = "rotateY(0deg)";
            cardResult.textContent = "?";
        }, 2000);
    }, 1000); // Card spinning animation duration
});

// Initialize display
updateBalanceDisplay();
