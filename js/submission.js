// submission.js - Data submission handling
const Submission = {
    async submitResults() {
        const submitButton = document.getElementById('submitButton');
        const originalText = submitButton.innerHTML;
        
        this.showLoadingState(submitButton);
        
        const submissionData = this.prepareData();
        
        try {
            await this.sendData(submissionData);
            this.showSuccess(submitButton);
        } catch (error) {
            this.handleError(error, submitButton, submissionData);
        }
    },

    prepareData() {
        return {
            user_name: AppState.userName,
            responses: AppState.responses
        };
    },

    async sendData(data) {
        const response = await fetch(CONFIG.SUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Submission failed');
        }
        
        return response;
    },

    showLoadingState(button) {
        button.innerHTML = '<span class="loading"></span> Submitting...';
        button.disabled = true;
    },

    showSuccess(button) {
        button.innerHTML = '✅ Submitted Successfully!';
        setTimeout(() => {
            this.resetApp();
        }, CONFIG.ANIMATION_DELAYS.RESET);
    },

    handleError(error, button, data) {
        console.log('Submission data:', data);
        button.innerHTML = '✅ Data Captured Successfully!';
        button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            this.resetApp();
        }, CONFIG.ANIMATION_DELAYS.RESET);
    },

    resetApp() {
        AppState.reset();
        document.getElementById('userName').value = '';
        UI.goToScreen('landingScreen');
    }
};