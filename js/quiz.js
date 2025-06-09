        // quiz.js - Quiz logic and question handling
        const Quiz = {
            startQuestions() {
                const userNameInput = document.getElementById('userName');
                const userName = userNameInput.value.trim();
                
                if (!userName) {
                    UI.showError(userNameInput, 'Name is required');
                    return;
                }

                AppState.setUserName(userName);
                UI.goToScreen('quizScreen');
                this.showQuestion(0);
            },

            showQuestion(index) {
                AppState.currentQuestionIndex = index;
                const question = AppState.getCurrentQuestion();
                
                this.updateProgress();
                this.updateQuestionDisplay(question);
                this.createAnswerOptions(question, index);
                this.updateNavigationButtons(index);
            },

            updateProgress() {
                const progress = AppState.getProgress();
                document.getElementById('progressFill').style.width = progress + '%';
                document.getElementById('questionNumber').textContent = 
                    `Question ${AppState.currentQuestionIndex + 1} of ${QUESTIONS.length}`;
            },

            updateQuestionDisplay(question) {
                document.getElementById('questionText').textContent = question.question;
            },

            createAnswerOptions(question, questionIndex) {
                const answersContainer = document.getElementById('answersContainer');
                answersContainer.innerHTML = '';
                
                question.answers.forEach((answer, answerIndex) => {
                    const answerDiv = document.createElement('div');
                    answerDiv.className = 'answer-option';
                    answerDiv.textContent = answer;
                    answerDiv.onclick = () => this.selectAnswer(answerIndex, answer);
                    
                    // Check if this answer was previously selected
                    if (AppState.responses[questionIndex] && AppState.responses[questionIndex].answer === answer) {
                        answerDiv.classList.add('selected');
                        document.getElementById('nextButton').disabled = false;
                    }
                    
                    answersContainer.appendChild(answerDiv);
                });
            },

            updateNavigationButtons(index) {
                document.getElementById('backButton').disabled = index === 0;
                if (!AppState.responses[index]) {
                    document.getElementById('nextButton').disabled = true;
                }
            },

            selectAnswer(answerIndex, answerText) {
                // Remove previous selection
                document.querySelectorAll('.answer-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Add selection to clicked option
                event.target.classList.add('selected');
                
                // Save response
                const currentQuestion = AppState.getCurrentQuestion();
                AppState.setResponse(AppState.currentQuestionIndex, currentQuestion.question, answerText);
                
                // Enable next button
                document.getElementById('nextButton').disabled = false;
                
                // Save progress
                AppState.save();
            },

            nextQuestion() {
                if (AppState.nextQuestion()) {
                    this.showQuestion(AppState.currentQuestionIndex);
                } else {
                    ThankYou.show();
                }
            },

            previousQuestion() {
                if (AppState.previousQuestion()) {
                    this.showQuestion(AppState.currentQuestionIndex);
                }
            }
        };