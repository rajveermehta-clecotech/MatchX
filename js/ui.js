// ui.js - UI management and screen navigation
const UI = {
    init() {
        this.setupEventListeners();
        this.setupMusicToggle();
        AppState.load();
    },

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (AppState.currentScreen === 'quizScreen') {
                if (event.key === 'ArrowLeft' && !document.getElementById('backButton').disabled) {
                    Quiz.previousQuestion();
                } else if (event.key === 'ArrowRight' && !document.getElementById('nextButton').disabled) {
                    Quiz.nextQuestion();
                }
            }
        });

        // Enter key for name input
        document.getElementById('userName').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                Quiz.startQuestions();
            }
        });
    },

    setupMusicToggle() {
        const musicToggle = document.getElementById('musicToggle');
        musicToggle.addEventListener('click', this.toggleMusic);
    },

    toggleMusic() {
        AppState.musicEnabled = !AppState.musicEnabled;
        const musicToggle = document.getElementById('musicToggle');
        musicToggle.textContent = AppState.musicEnabled ? '🎵' : '🔇';
        musicToggle.style.background = AppState.musicEnabled ?
            'linear-gradient(135deg, #f7b49b, #e89a7e)' : 'rgba(255, 255, 255, 0.95)';
        musicToggle.style.color = AppState.musicEnabled ? 'white' : '#704033';
        musicToggle.style.borderColor = AppState.musicEnabled ?
            'rgba(232, 154, 126, 0.5)' : 'rgba(247, 180, 155, 0.3)';
    },

    goToScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        AppState.currentScreen = screenId;

        // Add slide-in animation
        const card = document.querySelector('.card');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'slideIn 0.8s ease-out forwards';
        }, 10);
    },

    startQuiz() {
        this.goToScreen('userInfoScreen');
    },

    showError(element, message) {
        element.style.borderColor = '#e89a7e';
        element.focus();
        // Could add error message display here
    },

    clearError(element) {
        element.style.borderColor = '#f2ddd4';
    }
};