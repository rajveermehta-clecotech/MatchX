// thankyou.js - Thank you screen and confetti animation
const ThankYou = {
    show() {
        this.updateMessage();
        UI.goToScreen('thankYouScreen');
        this.createConfetti();
    },

    updateMessage() {
        document.getElementById('thankYouMessage').innerHTML = 
            `Thank you <strong>${AppState.userName}</strong> for completing the Match X Score! 🌟<br><br>
            Your responses will help verify compatibility and mutual interest in your relationship journey.`;
    },

    createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < CONFIG.CONFETTI_COUNT; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti-piece';
            confettiPiece.style.left = Math.random() * 100 + '%';
            confettiPiece.style.animationDelay = Math.random() * 3 + 's';
            confettiPiece.style.animationDuration = 
                (Math.random() * (CONFIG.ANIMATION_DELAYS.CONFETTI_MAX - CONFIG.ANIMATION_DELAYS.CONFETTI_MIN) + CONFIG.ANIMATION_DELAYS.CONFETTI_MIN) + 's';
            confettiContainer.appendChild(confettiPiece);
        }
    }
};