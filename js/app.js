// app.js - Main application initialization
const App = {
    async init() {
        document.addEventListener('DOMContentLoaded', async () => {
            // Show loading state
            this.showLoadingState();

            try {
                // Initialize questions from API
                await ApiService.initializeQuestions();

                // Initialize UI after questions are loaded
                UI.init();

                console.log('Match X Score App initialized successfully');
            } catch (error) {
                console.error('App initialization failed:', error);
                // Still initialize UI with fallback questions
                UI.init();
            } finally {
                this.hideLoadingState();
            }
        });
    },

    showLoadingState() {
        // Create and show loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'app-loading';
        loadingOverlay.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(102, 126, 234, 0.9);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                color: white;
                font-family: 'Poppins', sans-serif;
            ">
                <div class="loading" style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                    margin-bottom: 20px;
                "></div>
                <h2 style="margin: 0; font-weight: 300;">Loading Match X Score...</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.8;">Preparing your relationship quiz</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    },

    hideLoadingState() {
        const loadingOverlay = document.getElementById('app-loading');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }
    }
};

// Initialize the app
App.init();