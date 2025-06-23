// Survey Navigation and Data Management
let currentSection = 0;
const sections = ['politicalViews', 'circumstances', 'personalDetails'];

// Initialize survey
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    updateProgress();
    
    const draftData = localStorage.getItem('surveyDataDraft');
    if (draftData) {
        const data = JSON.parse(draftData);
        
        // Restore slider values
        Object.keys(data.politicalViews).forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            if (slider) {
                slider.value = data.politicalViews[sliderId];
                updateSliderValue(slider);
            }
        });
        
        // Restore checkbox values
        Object.keys(data.circumstances).forEach(checkboxId => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.checked = data.circumstances[checkboxId];
            }
        });
        
        // Restore textarea value
        const personalDetailsText = document.getElementById('personalDetailsText');
        if (personalDetailsText) {
            personalDetailsText.value = data.personalDetails;
        }
    }
});

// Initialize slider functionality
function initializeSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            updateSliderValue(this);
            updateProgress();
        });
        
        // Set initial slider appearance
        updateSliderValue(slider);
    });
}

// Update slider visual feedback
function updateSliderValue(slider) {
    const value = parseInt(slider.value);
    const percentage = ((value - 1) / 4) * 100; // Convert 1-5 to 0-100%
    
    // Update slider background based on value
    if (value <= 2) {
        slider.style.background = `linear-gradient(to right, #ff6b6b 0%, #ff6b6b ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`;
    } else if (value === 3) {
        slider.style.background = `linear-gradient(to right, #ff6b6b 0%, #ff8e53 50%, #f0f0f0 50%, #f0f0f0 100%)`;
    } else {
        slider.style.background = `linear-gradient(to right, #ff6b6b 0%, #ff8e53 50%, #ff8e53 ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`;
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentSection + 1) / sections.length) * 100;
    progressFill.style.width = progress + '%';
}

// Navigate to next section
function nextSection() {
    if (currentSection < sections.length - 1) {
        document.getElementById(sections[currentSection]).classList.add('hidden');
        currentSection++;
        document.getElementById(sections[currentSection]).classList.remove('hidden');
        updateProgress();
    }
}

// Navigate to previous section
function prevSection() {
    if (currentSection > 0) {
        document.getElementById(sections[currentSection]).classList.add('hidden');
        currentSection--;
        document.getElementById(sections[currentSection]).classList.remove('hidden');
        updateProgress();
    }
}

// Collect all survey data
function collectSurveyData() {
    const data = {
        address: localStorage.getItem('userAddress'),
        politicalViews: {},
        circumstances: {},
        personalDetails: ''
    };

    // Collect political views (slider values)
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        data.politicalViews[slider.id] = parseInt(slider.value);
    });

    // Collect circumstances (checkbox values)
    const checkboxes = document.querySelectorAll('#circumstances input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        data.circumstances[checkbox.id] = checkbox.checked;
    });

    // Collect personal details
    const personalDetailsText = document.getElementById('personalDetailsText');
    data.personalDetails = personalDetailsText.value.trim();

    return data;
}

// Submit survey and navigate to results
function submitSurvey() {
    const surveyData = collectSurveyData();
    
    // Store survey data in localStorage for use in results page
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate processing time (in real app, this would be API calls)
    setTimeout(() => {
        // Navigate to results page
        window.location.href = 'results.html';
    }, 1500);
}

// Add smooth transitions between sections
function showSection(sectionId) {
    const allSections = document.querySelectorAll('.question-section');
    allSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    
    // Add fade-in effect
    targetSection.style.opacity = '0';
    setTimeout(() => {
        targetSection.style.opacity = '1';
    }, 50);
}

// Enhanced slider interaction
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        // Add visual feedback on slider interaction
        slider.addEventListener('mousedown', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        slider.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        slider.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        slider.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add keyboard navigation for sliders
        slider.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.value > 1) {
                    this.value = parseInt(this.value) - 1;
                    this.dispatchEvent(new Event('input'));
                }
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.value < 5) {
                    this.value = parseInt(this.value) + 1;
                    this.dispatchEvent(new Event('input'));
                }
            }
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        // Ctrl+Enter to submit
        if (currentSection === sections.length - 1) {
            submitSurvey();
        } else {
            nextSection();
        }
    } else if (e.key === 'ArrowRight' && e.ctrlKey) {
        // Ctrl+Right to next section
        if (currentSection < sections.length - 1) {
            nextSection();
        }
    } else if (e.key === 'ArrowLeft' && e.ctrlKey) {
        // Ctrl+Left to previous section
        if (currentSection > 0) {
            prevSection();
        }
    }
});

// Add form validation
function validateCurrentSection() {
    const currentSectionId = sections[currentSection];
    
    if (currentSectionId === 'personalDetails') {
        const textarea = document.getElementById('personalDetailsText');
        if (textarea.value.trim().length < 10) {
            alert('Please provide more details about what\'s important to you (at least 10 characters).');
            return false;
        }
    }
    
    return true;
}

// Enhanced navigation with validation
function nextSectionWithValidation() {
    if (validateCurrentSection()) {
        nextSection();
    }
}

// Add auto-save functionality
function autoSave() {
    const surveyData = collectSurveyData();
    localStorage.setItem('surveyDataDraft', JSON.stringify(surveyData));
}

// Auto-save every 30 seconds
setInterval(autoSave, 30000); 