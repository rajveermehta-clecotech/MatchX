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
                musicToggle.style.background = AppState.musicEnabled ? 'rgba(102, 126, 234, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                musicToggle.style.color = AppState.musicEnabled ? 'white' : '#333';
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
                element.style.borderColor = '#ff6b9d';
                element.focus();
                // Could add error message display here
            },

            clearError(element) {
                element.style.borderColor = '#e1e8f0';
            }
        };