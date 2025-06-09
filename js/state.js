       // state.js - Application state management
       const AppState = {
        currentScreen: 'landingScreen',
        currentQuestionIndex: 0,
        userName: '',
        responses: [],
        musicEnabled: false,

        // State getters
        getCurrentQuestion() {
            return QUESTIONS[this.currentQuestionIndex];
        },

        getProgress() {
            return ((this.currentQuestionIndex + 1) / QUESTIONS.length) * 100;
        },

        // State setters
        setUserName(name) {
            this.userName = name.trim();
        },

        setResponse(questionIndex, question, answer) {
            this.responses[questionIndex] = { question, answer };
        },

        nextQuestion() {
            if (this.currentQuestionIndex < QUESTIONS.length - 1) {
                this.currentQuestionIndex++;
                return true;
            }
            return false;
        },

        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                return true;
            }
            return false;
        },

        reset() {
            this.currentQuestionIndex = 0;
            this.userName = '';
            this.responses = [];
            this.currentScreen = 'landingScreen';
        },

        // Data persistence (in memory for this demo)
        save() {
            // In real app: localStorage.setItem('matchXScore', JSON.stringify(this));
            console.log('State saved:', this);
        },

        load() {
            // In real app: const saved = localStorage.getItem('matchXScore');
            // if (saved) Object.assign(this, JSON.parse(saved));
            console.log('State loaded:', this);
        }
    };