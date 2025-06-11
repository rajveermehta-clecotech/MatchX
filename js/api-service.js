// api-service.js - API service for loading questions
const ApiService = {
    async loadQuestions() {
        try {
            console.log('Attempting to load questions from API...');

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);

            const response = await fetch(CONFIG.QUESTIONS_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Validate the response structure
            if (!this.validateQuestionsData(data)) {
                throw new Error('Invalid questions data structure');
            }

            console.log('Questions loaded successfully from API');
            return data.questions || data; // Support both {questions: [...]} and [...]

        } catch (error) {
            console.error('Failed to load questions from API:', error.message);
            console.log('Falling back to mock questions');
            return MOCK_QUESTIONS;
        }
    },

    validateQuestionsData(data) {
        // Check if data is an array or has a questions property that's an array
        const questions = data.questions || data;

        if (!Array.isArray(questions) || questions.length === 0) {
            return false;
        }

        // Validate each question has required structure
        return questions.every(question =>
            question.question &&
            Array.isArray(question.answers) &&
            question.answers.length > 0
        );
    },

    async initializeQuestions() {
        try {
            QUESTIONS = await this.loadQuestions();
            console.log(`Loaded ${QUESTIONS.length} questions`);
            return true;
        } catch (error) {
            console.error('Failed to initialize questions:', error);
            QUESTIONS = MOCK_QUESTIONS;
            return false;
        }
    }
};