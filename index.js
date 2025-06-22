// Create the HTML structure
document.body.innerHTML = `
    <div class="container">
        <div class="logo">
            <h1>BallotBuddy</h1>
        </div>
        
        <div class="search-container">
            <div class="input-wrapper">
                <input type="text" placeholder="Enter your full address..." id="locationInput">
                <div class="autocomplete-suggestions" id="autocompleteSuggestions"></div>
            </div>
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

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initializeAutocomplete`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Add interactivity
const locationInput = document.getElementById('locationInput');
const continueBtn = document.getElementById('continueBtn');
const autocompleteSuggestions = document.getElementById('autocompleteSuggestions');

// Initialize Google Places Autocomplete
let autocomplete;
let selectedSuggestion = -1;

window.initializeAutocomplete = function() {
    // Check if Google Places API is available
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        console.warn('Google Places API not available. Using fallback input.');
        return;
    }

    // Don't create Google Places Autocomplete instance - we'll use our custom implementation
    // This prevents the ugly default dropdown from appearing
    
    // Handle input changes for custom suggestions
    locationInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            searchPlaces(query);
        } else {
            hideSuggestions();
        }
    });

    // Handle keyboard navigation
    locationInput.addEventListener('keydown', function(e) {
        const suggestions = autocompleteSuggestions.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedSuggestion = Math.min(selectedSuggestion + 1, suggestions.length - 1);
            updateSelectedSuggestion(suggestions);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedSuggestion = Math.max(selectedSuggestion - 1, -1);
            updateSelectedSuggestion(suggestions);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
                locationInput.value = suggestions[selectedSuggestion].textContent;
                hideSuggestions();
                handleContinue();
            } else {
                handleContinue();
            }
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!locationInput.contains(e.target) && !autocompleteSuggestions.contains(e.target)) {
            hideSuggestions();
        }
    });
}

function searchPlaces(query) {
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        return;
    }

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({
        input: query,
        types: ['address'],
        componentRestrictions: { country: 'us' }
    }, function(predictions, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            showSuggestions(predictions);
        } else {
            hideSuggestions();
        }
    });
}

function showSuggestions(predictions) {
    autocompleteSuggestions.innerHTML = '';
    selectedSuggestion = -1;

    predictions.forEach((prediction, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = prediction.description;
        suggestionItem.addEventListener('click', function() {
            locationInput.value = prediction.description;
            hideSuggestions();
        });
        suggestionItem.addEventListener('mouseenter', function() {
            selectedSuggestion = index;
            updateSelectedSuggestion(autocompleteSuggestions.querySelectorAll('.suggestion-item'));
        });
        autocompleteSuggestions.appendChild(suggestionItem);
    });

    autocompleteSuggestions.style.display = 'block';
}

function updateSelectedSuggestion(suggestions) {
    suggestions.forEach((item, index) => {
        if (index === selectedSuggestion) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

function hideSuggestions() {
    autocompleteSuggestions.style.display = 'none';
    selectedSuggestion = -1;
}

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

loadGoogleMapsScript();