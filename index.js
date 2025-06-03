// Create the HTML structure
document.body.innerHTML = `
    <div class="container">
        <h1>WHERE DO YOU LIVE?</h1>
        <div class="search-container">
            <input type="text" placeholder="Enter your location..." id="locationInput">
        </div>
    </div>
`;

// Add some basic interactivity
const locationInput = document.getElementById('locationInput');

locationInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const location = locationInput.value.trim();
        if (location) {
            console.log(`User entered location: ${location}`);
            // You can add more functionality here, like API calls or navigation
        }
    }
});

// Optional: Add focus effect
locationInput.addEventListener('focus', function() {
    this.style.transform = 'translateY(-2px)';
});

locationInput.addEventListener('blur', function() {
    this.style.transform = 'translateY(0)';
});