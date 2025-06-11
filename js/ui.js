// ui.js - UI management and screen navigation
const UI = {
    init() {
        this.setupEventListeners();
        this.setupMusicToggle();
        AppState.load();

        // Show API status indicator
        this.showApiStatus();
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
        musicToggle.style.background = AppState.musicEnabled ? 'rgba(102, 126, 234, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        musicToggle.style.color = AppState.musicEnabled ? 'white' : '#333';
    },

    goToScreen(screenId) {
        // Check if questions are loaded before allowing quiz to start
        if (screenId === 'quizScreen' && (!QUESTIONS || QUESTIONS.length === 0)) {
            this.showError(document.getElementById('userName'), 'Questions are still loading. Please wait...');
            return;
        }

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
        element.style.borderColor = '#ff6b9d';
        element.focus();

        // Show error message
        this.showNotification(message, 'error');
    },

    clearError(element) {
        element.style.borderColor = '#e1e8f0';
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#ff6b9d' : '#667eea'};
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            notification.style.transition = 'all 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    showApiStatus() {
        // Check if questions were loaded from API or fallback
        const isUsingApi = QUESTIONS !== MOCK_QUESTIONS;
        const statusMessage = isUsingApi ?
            'Questions loaded from server' :
            'Using offline questions';

        console.log(statusMessage);

        // Optionally show a subtle indicator to users
        if (!isUsingApi) {
            setTimeout(() => {
                this.showNotification('Running in offline mode', 'info');
            }, 1000);
        }
    }
};