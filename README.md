# BallotBuddy - Your Personal Election Guide

BallotBuddy is a comprehensive web application that helps users understand their political landscape and make informed voting decisions. The app provides personalized guidance based on users' political views, personal circumstances, and location.

## Features

### 🏠 Address-Based Representative Lookup
- Find all your representatives from local to federal level
- Clean, intuitive display of representative information
- Contact details for each representative

### 📊 Personalized Political Survey
- **Political Views Assessment**: Slider-based questions on key political issues
  - Abortion rights
  - Tax policies
  - Campaign finance
  - Gun control
  - Healthcare
  - Environmental regulations

- **Personal Circumstances**: Yes/No questions about your situation
  - Housing status (Section 8)
  - Employment type (government, small business)
  - Income level
  - Veteran status
  - Student status
  - Union membership
  - Parental status

- **Additional Details**: Open text area for personal political priorities

### 🗳️ Election Helper
- Upcoming elections and candidates
- Personalized candidate recommendations
- Alignment scores based on your survey responses
- Detailed explanations of why candidates align with your views

### 📋 Legislation Helper
- Current bills up for vote
- Personalized bill descriptions
- Impact analysis based on your circumstances
- Representatives' positions on key legislation

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with modern design principles
- **Data Storage**: LocalStorage for user preferences
- **Future AI Integration**: AWS Bedrock/SageMaker for personalized content generation

## File Structure

```
BallotBuddy/
├── index.html          # Main landing page (address input)
├── index.js            # Landing page functionality
├── survey.html         # Political views survey
├── survey.js           # Survey logic and navigation
├── results.html        # Representatives and helper tabs
├── results.js          # Results page functionality
├── styles/
│   ├── styles.css      # Main styles and landing page
│   ├── survey.css      # Survey page styles
│   └── results.css     # Results page styles
└── README.md           # This file
```

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser
3. **Enter your address** to get started
4. **Complete the survey** to receive personalized guidance
5. **Explore your representatives** and election/legislation helpers

## User Flow

1. **Address Input** → User enters their full address
2. **Political Views Survey** → 6 slider questions on key issues
3. **Circumstances Survey** → 8 yes/no questions about personal situation
4. **Personal Details** → Open text area for additional priorities
5. **Results Page** → Representatives overview with two tabs:
   - **Election Helper**: Candidate recommendations
   - **Legislation Helper**: Bill analysis

## Future Enhancements

### API Integrations
- **Google Civic Information API**: Real representative data
- **OpenStates API**: State-level legislation data
- **Federal APIs**: Congressional data and voting records

### AWS AI Integration
- **Amazon Bedrock**: Generate personalized candidate descriptions
- **Amazon SageMaker**: Analyze user preferences and generate recommendations
- **Amazon Q**: Enhanced question-answering about political issues

### Additional Features
- Email notifications for upcoming elections
- Social sharing of results
- Export functionality for voting records
- Mobile app version
- Multi-language support

## Design Principles

- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Responsive**: Works on desktop, tablet, and mobile devices
- **User-Friendly**: Intuitive navigation and clear instructions
- **Privacy-Focused**: Data stored locally, no external tracking

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a personal project, but suggestions and improvements are welcome! Areas for contribution:

- API integrations for real data
- Enhanced AI-powered recommendations
- Additional survey questions
- Improved accessibility features
- Mobile optimization

## License

This project is open source and available under the MIT License.

---

**BallotBuddy** - Making informed voting decisions easier for everyone! 🗳️
