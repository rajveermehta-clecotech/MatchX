// config.js - Application configuration and constants
const CONFIG = {
    SUBMIT_URL: 'https://your-api-endpoint.com/submit',
    MAX_NAME_LENGTH: 50,
    CONFETTI_COUNT: 50,
    ANIMATION_DELAYS: {
        CONFETTI_MIN: 2,
        CONFETTI_MAX: 5,
        CELEBRATION: 2000,
        RESET: 2000
    }
};

const QUESTIONS = [
    {
        question: "What do you expect from a relationship?",
        answers: [
            "Mutual respect and understanding",
            "Fun and adventure together",
            "Deep emotional connection",
            "Shared goals and future plans"
        ]
    },
    {
        question: "What is your ideal weekend?",
        answers: [
            "Spending quality time together",
            "Exploring new places",
            "Relaxing at home",
            "Meeting friends and family"
        ]
    },
    {
        question: "How do you handle disagreements?",
        answers: [
            "Talk it out calmly",
            "Give each other space first",
            "Find a compromise together",
            "Seek advice from others"
        ]
    },
    {
        question: "What makes you feel most loved?",
        answers: [
            "Words of affirmation",
            "Quality time together",
            "Physical affection",
            "Acts of service"
        ]
    },
    {
        question: "How important is communication in a relationship?",
        answers: [
            "Extremely important - it's everything",
            "Very important but actions matter more",
            "Important but we need space too",
            "Essential for resolving conflicts"
        ]
    }
];