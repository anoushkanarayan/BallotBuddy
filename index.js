// Create the HTML structure
document.body.innerHTML = `
    <div class="container">
        <div class="logo">
            <h1>BallotBuddy</h1>
        </div>
        
        <div class="search-container">
            <input type="text" placeholder="Enter your full address..." id="locationInput">
            <button id="continueBtn" class="continue-btn">Continue</button>
        </div>
        
        <div class="features">
            <div class="feature">
                <span class="feature-icon">🗳️</span>
                <h3>Find Your Representatives</h3>
                <p>From local to national level</p>
            </div>
            <div class="feature">
                <span class="feature-icon">📊</span>
                <h3>Personalized Guidance</h3>
                <p>Based on your political views</p>
            </div>
            <div class="feature">
                <span class="feature-icon">📋</span>
                <h3>Election Updates</h3>
                <p>Stay informed on candidates & legislation</p>
            </div>
            <div class="feature">
                <span class="feature-icon">🎯</span>
                <h3>Smart Recommendations</h3>
                <p>AI-powered insights for informed decisions</p>
            </div>
        </div>
    </div>
`;

// Add interactivity
const locationInput = document.getElementById('locationInput');
const continueBtn = document.getElementById('continueBtn');

function handleContinue() {
    const location = locationInput.value.trim();
    if (location) {
        // Store the address in localStorage for use across pages
        localStorage.setItem('userAddress', location);
        // Navigate to the political views survey
        window.location.href = 'survey.html';
    } else {
        locationInput.style.borderColor = '#ff6b6b';
        locationInput.placeholder = 'Please enter your address...';
        setTimeout(() => {
            locationInput.style.borderColor = '';
            locationInput.placeholder = 'Enter your full address...';
        }, 2000);
    }
}

locationInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleContinue();
    }
});

continueBtn.addEventListener('click', handleContinue);

// Add focus effects
locationInput.addEventListener('focus', function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
});

locationInput.addEventListener('blur', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});