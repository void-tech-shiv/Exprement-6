// Get DOM elements
const userNameInput = document.getElementById('userName');
const userMoodSelect = document.getElementById('userMood');
const generateBtn = document.getElementById('generateBtn');
const greetingMessage = document.getElementById('greetingMessage');

// Add event listener to the button
generateBtn.addEventListener('click', generateGreeting);

// Also allow Enter key to trigger greeting
userNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateGreeting();
    }
});

// Main function to generate personalized greeting
function generateGreeting() {
    // Get user inputs
    const name = userNameInput.value.trim();
    const mood = userMoodSelect.value;
    
    // Validate inputs
    if (!name) {
        showMessage("Hey there! Please tell me your name first! 😊", "mood-neutral");
        return;
    }
    
    if (!mood) {
        showMessage(`Hello ${name}! Don't forget to share your mood with me! 🤗`, "mood-neutral");
        return;
    }
    
    // Get current time-based greeting
    const timeGreeting = getTimeBasedGreeting();
    
    // Get mood-based message
    const moodMessage = getMoodBasedMessage(mood, name);
    
    // Combine messages
    const fullMessage = `${timeGreeting} ${name}! ${moodMessage}`;
    
    // Display the message with appropriate styling
    showMessage(fullMessage, `mood-${mood}`);
}

// Function to get time-based greeting
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    const timeClass = getTimeClass(hour);
    
    // Add time class to container for visual indication
    greetingMessage.classList.add(timeClass);
    
    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good evening";
    } else {
        return "Good night";
    }
}

// Function to determine time class for styling
function getTimeClass(hour) {
    if (hour >= 5 && hour < 12) {
        return "time-morning";
    } else if (hour >= 12 && hour < 17) {
        return "time-afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "time-evening";
    } else {
        return "time-night";
    }
}

// Function to get mood-based message
function getMoodBasedMessage(mood, name) {
    const messages = {
        happy: [
            `That's awesome! Happiness looks good on you! 😄`,
            `Fantastic! Keep spreading that joy, ${name}! ✨`,
            `Wonderful! A happy ${name} makes my day too! 🌟`
        ],
        sad: [
            `I'm sending you virtual hugs! Tomorrow will be better! 🤗`,
            `Cheer up! Even clouds have silver linings! ☁️`,
            `It's okay to feel down sometimes. You're stronger than you know! 💪`
        ],
        excited: [
            `Wow, that energy is contagious! Let's make magic happen! ✨`,
            `Excitement! Ready to conquer the world today? 🌍`,
            `Fantastic! Your enthusiasm is inspiring! 🔥`
        ],
        tired: [
            `Time for a break! You deserve some rest and relaxation! 😴`,
            `Take care of yourself! Maybe grab a cup of tea? ☕`,
            `You've been working hard! Don't forget to recharge! 🔋`
        ],
        neutral: [
            `Hope your day gets more interesting soon! 🌈`,
            `Sometimes neutral is perfectly fine! How can I brighten your day? 🌟`,
            `Balanced and steady! That's a great place to be! ⚖️`
        ]
    };
    
    // Get random message from the mood array
    const moodMessages = messages[mood];
    const randomIndex = Math.floor(Math.random() * moodMessages.length);
    return moodMessages[randomIndex];
}

// Function to display message with animation
function showMessage(message, moodClass) {
    // Clear any existing time classes
    greetingMessage.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
    
    // Set the message
    greetingMessage.textContent = message;
    
    // Remove any existing mood classes
    greetingMessage.className = 'greeting-message';
    
    // Add the new mood class
    greetingMessage.classList.add(moodClass);
    
    // Trigger reflow to restart animation
    void greetingMessage.offsetWidth;
    
    // Add show class to trigger animation
    greetingMessage.classList.add('show');
}

// Add a little surprise when the page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        showMessage("👋 Welcome! Enter your name and mood to get started!", "mood-neutral");
    }, 1000);
});