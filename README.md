# BallotBuddy - Your Personal Election Guide

BallotBuddy is a comprehensive web application designed to help users understand their political landscape and make informed voting decisions. By entering an address, users can access personalized information about their elected representatives, upcoming elections, and relevant legislation based on their unique political views and personal circumstances.

## Features

### 🏠 Address Input with Google Places Autocomplete
-   **Smart Address Entry**: Start typing your address and get instant suggestions powered by the Google Places API.
-   **Custom Styled UI**: A clean, responsive interface with a custom-styled, opaque autocomplete dropdown for a seamless user experience.
-   **Find Your District**: Quickly and accurately find your political districts based on a verified address.

### 📊 Personalized Political Survey
-   **Political Views Assessment**: Fine-tune your political profile with slider-based questions on key issues like abortion rights, tax policies, and environmental regulations.
-   **Personal Circumstances**: Select your relevant personal circumstances using simple checkboxes for topics like housing status, employment, and student status. This helps tailor the information to your specific situation.

### 🗳️ Election Helper
-   Discover upcoming elections and candidates in your district.
-   Receive personalized candidate recommendations and alignment scores based on your survey responses.
-   Read detailed explanations of why specific candidates may align with your views.

### 📋 Legislation Helper
-   Stay informed about current bills up for a vote.
-   Get personalized descriptions of bills and understand their potential impact based on your circumstances.
-   See your representatives' positions on key legislation.

### 🏛️ Representative Information
-   View a clear, intuitive display of all your elected officials, from the local to the federal level.
-   Access contact details for each representative.

## Technology Stack

-   **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
-   **APIs**: Google Places API for address autocomplete.
-   **Styling**: Custom CSS with a responsive, mobile-first design.
-   **Data Storage**: LocalStorage for persisting survey data and user preferences.

## File Structure

```
BallotBuddy/
├── .gitignore          # Specifies files for Git to ignore
├── index.html          # Main landing page (address input)
├── index.js            # Landing page functionality & API loading
├── my_api_keys.js      # Stores API keys (ignored by Git)
├── survey.html         # Political views survey
├── survey.js           # Survey logic and navigation
├── results.html        # Displays representatives and helper tabs
├── results.js          # Results page functionality
├── styles/
│   ├── styles.css      # Main styles for landing page
│   ├── survey.css      # Survey page styles
│   └── results.css     # Results page styles
└── README.md           # This file
```

## Getting Started

To run BallotBuddy locally, follow these steps:

1.  **Clone or download** the project files to your local machine.
2.  **Create your API Key file**:
    *   In the `BallotBuddy/` root directory, create a new file named `my_api_keys.js`.
    *   Inside this file, add the following line, replacing `'YOUR_GOOGLE_API_KEY'` with your actual Google Places API key:
        ```javascript
        const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
        ```
    *   **Note**: The `.gitignore` file is already configured to prevent this file from being uploaded to GitHub.
3.  **Open `index.html`** in a modern web browser (Chrome, Firefox, Safari, Edge).
4.  **Enter your address** using the autocomplete search bar.
5.  **Complete the survey** to receive personalized guidance.
6.  **Explore your results** to see your representatives and use the Election and Legislation helpers.

## Design Principles

-   **User-Friendly**: Intuitive navigation, clear instructions, and a clean interface.
-   **Responsive**: The layout adapts seamlessly to desktop, tablet, and mobile devices.
-   **Privacy-Focused**: User data is stored locally in the browser and is not sent to any external server. API keys are kept secure via `.gitignore`.
-   **Accessibility**: Designed with high contrast, readable fonts, and keyboard-navigable elements.

## Contributing

This is a personal project, but suggestions and improvements are always welcome! Areas for contribution could include:
-   Integrating with the Google Civic Information API or OpenStates API for real-time representative and legislative data.
-   Enhancing the AI-powered recommendation logic.
-   Adding more survey questions to create a more detailed user profile.

## License

This project is open source and available under the MIT License.

---

**BallotBuddy** - Making informed voting decisions easier for everyone! 🗳️
