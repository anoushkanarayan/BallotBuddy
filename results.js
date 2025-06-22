// Results Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadRepresentatives();
    generatePersonalizedContent();
});

// Load user data from localStorage
function loadUserData() {
    const surveyData = localStorage.getItem('surveyData');
    const userAddress = localStorage.getItem('userAddress');
    
    if (userAddress) {
        document.getElementById('addressDisplay').textContent = userAddress;
    }
    
    if (surveyData) {
        window.userSurveyData = JSON.parse(surveyData);
    }
}

// Load representative data (mock data for now)
function loadRepresentatives() {
    // In a real application, this would fetch data from APIs like:
    // - Google Civic Information API
    // - OpenStates API
    // - Local government APIs
    
    const mockRepresentatives = {
        mayor: {
            name: "Mayor Sarah Williams",
            party: "Democratic",
            contact: "mayor@city.gov | (555) 123-4567"
        },
        council: {
            name: "City Council Members",
            party: "Mixed",
            contact: "council@city.gov | (555) 123-4568"
        },
        stateRep: {
            name: "Rep. Michael Johnson",
            party: "Republican",
            contact: "michael.johnson@state.gov | (555) 123-4569"
        },
        stateSen: {
            name: "Sen. Lisa Rodriguez",
            party: "Democratic",
            contact: "lisa.rodriguez@state.gov | (555) 123-4570"
        },
        usRep: {
            name: "Rep. David Thompson",
            party: "Democratic",
            contact: "david.thompson@house.gov | (555) 123-4571"
        },
        usSen: {
            name: "Sen. Robert Chen",
            party: "Republican",
            contact: "robert.chen@senate.gov | (555) 123-4572"
        }
    };
    
    // Populate representative cards
    document.getElementById('mayorName').textContent = mockRepresentatives.mayor.name;
    document.getElementById('mayorParty').textContent = mockRepresentatives.mayor.party;
    document.getElementById('mayorContact').textContent = mockRepresentatives.mayor.contact;
    
    document.getElementById('councilName').textContent = mockRepresentatives.council.name;
    document.getElementById('councilParty').textContent = mockRepresentatives.council.party;
    document.getElementById('councilContact').textContent = mockRepresentatives.council.contact;
    
    document.getElementById('stateRepName').textContent = mockRepresentatives.stateRep.name;
    document.getElementById('stateRepParty').textContent = mockRepresentatives.stateRep.party;
    document.getElementById('stateRepContact').textContent = mockRepresentatives.stateRep.contact;
    
    document.getElementById('stateSenName').textContent = mockRepresentatives.stateSen.name;
    document.getElementById('stateSenParty').textContent = mockRepresentatives.stateSen.party;
    document.getElementById('stateSenContact').textContent = mockRepresentatives.stateSen.contact;
    
    document.getElementById('usRepName').textContent = mockRepresentatives.usRep.name;
    document.getElementById('usRepParty').textContent = mockRepresentatives.usRep.party;
    document.getElementById('usRepContact').textContent = mockRepresentatives.usRep.contact;
    
    document.getElementById('usSenName').textContent = mockRepresentatives.usSen.name;
    document.getElementById('usSenParty').textContent = mockRepresentatives.usSen.party;
    document.getElementById('usSenContact').textContent = mockRepresentatives.usSen.contact;
}

// Generate personalized content based on user survey data
function generatePersonalizedContent() {
    if (!window.userSurveyData) return;
    
    const { politicalViews, circumstances, personalDetails } = window.userSurveyData;
    
    // Generate personalized candidate descriptions
    generateCandidateDescriptions(politicalViews, circumstances);
    
    // Generate personalized bill descriptions
    generateBillDescriptions(politicalViews, circumstances);
}

// Generate personalized candidate descriptions
function generateCandidateDescriptions(politicalViews, circumstances) {
    const bidenDescription = document.getElementById('bidenDescription');
    const trumpDescription = document.getElementById('trumpDescription');
    
    let bidenText = "Based on your political views and circumstances, ";
    let trumpText = "Given your political preferences and situation, ";
    
    // Analyze political views (slider values)
    if (politicalViews.healthcare >= 4) {
        bidenText += "your strong support for universal healthcare aligns with this candidate's healthcare policies. ";
        trumpText += "this candidate's healthcare approach may differ from your universal healthcare preferences. ";
    } else if (politicalViews.healthcare <= 2) {
        bidenText += "this candidate's universal healthcare stance may not align with your healthcare preferences. ";
        trumpText += "your healthcare views may align with this candidate's market-based approach. ";
    }
    
    if (politicalViews.socialPrograms >= 4) {
        bidenText += "Your support for expanded social programs matches this candidate's policy priorities. ";
        trumpText += "this candidate's approach to social programs may differ from your preferences. ";
    }
    
    if (politicalViews.gunControl >= 4) {
        bidenText += "Your support for stricter gun control aligns with this candidate's position. ";
        trumpText += "this candidate's stance on gun rights may not align with your gun control preferences. ";
    }
    
    if (politicalViews.climateChange >= 4) {
        bidenText += "Your concern about climate change aligns with this candidate's environmental policies. ";
        trumpText += "this candidate's approach to environmental issues may differ from your climate priorities. ";
    }
    
    if (politicalViews.immigration >= 4) {
        bidenText += "However, this candidate's immigration policies may differ from your border security priorities. ";
        trumpText += "Your focus on border security and immigration reduction aligns with this candidate's policies. ";
    }
    
    if (politicalViews.taxes >= 4) {
        bidenText += "Your support for higher taxes on the wealthy aligns with this candidate's tax policies. ";
        trumpText += "this candidate's tax approach may differ from your preferences for higher corporate taxes. ";
    }
    
    // Analyze circumstances (checkbox values)
    if (circumstances.lowIncome) {
        bidenText += "As someone with lower household income, this candidate's economic policies focused on middle-class relief may directly benefit your financial situation. ";
        trumpText += "as someone with lower household income, this candidate's economic policies may offer different approaches to improving your financial situation. ";
    }
    
    if (circumstances.student) {
        bidenText += "As a student, this candidate's education policies and student loan relief programs may be particularly relevant to your situation. ";
        trumpText += "As a student, this candidate's approach to education and student loan policies may impact your educational journey. ";
    }
    
    if (circumstances.subsidizedHousing) {
        bidenText += "Your use of housing assistance means this candidate's housing policies and support for affordable housing programs may directly affect your living situation. ";
        trumpText += "Your use of housing assistance means this candidate's housing policies may impact your access to affordable housing options. ";
    }
    
    if (circumstances.governmentBenefits) {
        bidenText += "Since you receive government benefits, this candidate's social safety net policies may be crucial to maintaining your current support programs. ";
        trumpText += "Since you receive government benefits, this candidate's approach to social programs may affect your access to these important resources. ";
    }
    
    if (circumstances.homeowner) {
        bidenText += "As a homeowner, this candidate's housing market policies and potential tax benefits for homeowners may impact your property investment. ";
        trumpText += "As a homeowner, this candidate's housing and tax policies may affect your property values and homeownership costs. ";
    }
    
    if (circumstances.urbanArea) {
        bidenText += "Living in an urban area means this candidate's infrastructure and city-focused policies may directly improve your community. ";
        trumpText += "Living in an urban area means this candidate's approach to city development and infrastructure may impact your local environment. ";
    }
    
    if (circumstances.studentLoans) {
        bidenText += "With student loan debt, this candidate's student loan relief and education financing policies may significantly impact your financial future. ";
        trumpText += "With student loan debt, this candidate's approach to student loan policies may affect your debt repayment options. ";
    }
    
    if (circumstances.collegeDegreeJob) {
        bidenText += "Working in a job requiring a college degree means this candidate's higher education and professional development policies may affect your career opportunities. ";
        trumpText += "Working in a job requiring a college degree means this candidate's approach to higher education and professional policies may impact your career path. ";
    }
    
    if (circumstances.investments) {
        bidenText += "As an investor, this candidate's market and tax policies may affect your investment portfolio and financial planning. ";
        trumpText += "As an investor, this candidate's economic and tax policies may impact your investment returns and financial strategy. ";
    }
    
    if (circumstances.unionMember) {
        bidenText += "As a union member, this candidate's labor policies and support for workers' rights may directly protect your employment benefits and working conditions. ";
        trumpText += "As a union member, this candidate's approach to labor policies may affect your union's bargaining power and workplace protections. ";
    }
    
    if (circumstances.religiousServices) {
        bidenText += "Regular religious attendance suggests this candidate's approach to religious freedom and faith-based policies may align with your values. ";
        trumpText += "Regular religious attendance suggests this candidate's religious freedom and faith-based policies may resonate with your spiritual values. ";
    }
    
    if (circumstances.married) {
        bidenText += "Being in a committed relationship means this candidate's family policies and relationship recognition may affect your legal and financial situation. ";
        trumpText += "Being in a committed relationship means this candidate's family and relationship policies may impact your partnership rights and benefits. ";
    }
    
    bidenDescription.textContent = bidenText;
    trumpDescription.textContent = trumpText;
}

// Generate personalized bill descriptions
function generateBillDescriptions(politicalViews, circumstances) {
    // This would be enhanced with AWS AI services in a real implementation
    // For now, we'll use basic logic based on survey responses
    
    const billDescriptions = document.querySelectorAll('.bill-description p');
    
    if (billDescriptions.length > 0) {
        // Healthcare bill
        if (politicalViews.healthcare >= 4) {
            billDescriptions[0].textContent = 
                "This bill aims to lower prescription drug costs and expand healthcare coverage. Given your strong support for universal healthcare, this legislation directly addresses your priorities and could significantly improve your access to affordable healthcare.";
        } else if (circumstances.lowIncome || circumstances.governmentBenefits) {
            billDescriptions[0].textContent = 
                "This bill aims to lower prescription drug costs and expand healthcare coverage. Given your financial situation and potential reliance on government benefits, this legislation could significantly improve your access to affordable healthcare and reduce your medical expenses.";
        } else if (circumstances.homeowner) {
            billDescriptions[0].textContent = 
                "This bill aims to lower prescription drug costs and expand healthcare coverage. As a homeowner, this legislation could help you maintain your property investment by reducing healthcare costs that might otherwise strain your budget.";
        } else {
            billDescriptions[0].textContent = 
                "This bill aims to lower prescription drug costs and expand healthcare coverage. This legislation could benefit your community by improving overall healthcare accessibility and reducing costs for everyone.";
        }
        
        // Small business bill
        if (circumstances.smallBusiness) {
            billDescriptions[1].textContent = 
                "This legislation provides tax breaks for small businesses and their employees. Since you work for a small business, this could directly benefit your financial situation and potentially increase your take-home pay.";
        } else if (circumstances.collegeDegreeJob) {
            billDescriptions[1].textContent = 
                "This legislation provides tax breaks for small businesses. As someone working in a professional role, this bill could create more opportunities in your industry and potentially improve your job security.";
        } else if (circumstances.student) {
            billDescriptions[1].textContent = 
                "This legislation provides tax breaks for small businesses. As a student, this bill could create more job opportunities for you after graduation and potentially improve the overall job market you'll enter.";
        } else if (politicalViews.taxes <= 2) {
            billDescriptions[1].textContent = 
                "This legislation provides tax breaks for small businesses. Given your preference for lower taxes, this bill aligns with your economic priorities.";
        } else {
            billDescriptions[1].textContent = 
                "This legislation provides tax breaks for small businesses. This bill could stimulate local economic growth and create more job opportunities in your community.";
        }
        
        // Environmental bill
        if (politicalViews.climateChange >= 4) {
            billDescriptions[2].textContent = 
                "This bill strengthens environmental regulations and invests in renewable energy. Your strong support for climate action aligns with this legislation's goals and could lead to cleaner air and water in your community.";
        } else if (circumstances.urbanArea) {
            billDescriptions[2].textContent = 
                "This bill strengthens environmental regulations and invests in renewable energy. Living in an urban area means this legislation could directly improve your air quality and create green jobs in your city.";
        } else if (circumstances.student) {
            billDescriptions[2].textContent = 
                "This bill strengthens environmental regulations and invests in renewable energy. As a student, this legislation could create new career opportunities in the growing renewable energy sector for your future.";
        } else if (circumstances.homeowner) {
            billDescriptions[2].textContent = 
                "This bill strengthens environmental regulations and invests in renewable energy. As a homeowner, this legislation could increase your property value by improving environmental quality in your area.";
        } else if (politicalViews.climateChange <= 2) {
            billDescriptions[2].textContent = 
                "This bill strengthens environmental regulations and invests in renewable energy. While you may have concerns about government environmental intervention, this legislation could create jobs in the renewable energy sector.";
        } else {
            billDescriptions[2].textContent = 
                "This bill strengthens environmental regulations and invests in renewable energy. This legislation could create jobs in the renewable energy sector and improve environmental quality for everyone.";
        }
    }
}

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and content
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => button.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    const selectedContent = document.getElementById(tabName + 'Tab');
    
    if (selectedButton) selectedButton.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
    
    // Add smooth transition effect
    if (selectedContent) {
        selectedContent.style.opacity = '0';
        setTimeout(() => {
            selectedContent.style.opacity = '1';
        }, 50);
    }
}

// Enhanced representative card interactions
document.addEventListener('DOMContentLoaded', function() {
    const representativeCards = document.querySelectorAll('.representative-card');
    
    representativeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Add loading animations
function showLoadingState() {
    const loadingElements = document.querySelectorAll('[id$="Name"], [id$="Party"], [id$="Contact"]');
    
    loadingElements.forEach(element => {
        element.textContent = 'Loading...';
        element.style.opacity = '0.6';
    });
}

function hideLoadingState() {
    const loadingElements = document.querySelectorAll('[id$="Name"], [id$="Party"], [id$="Contact"]');
    
    loadingElements.forEach(element => {
        element.style.opacity = '1';
    });
}

// Simulate loading representative data
setTimeout(hideLoadingState, 2000);

// Add keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    if (e.key === '1' && e.ctrlKey) {
        switchTab('election');
    } else if (e.key === '2' && e.ctrlKey) {
        switchTab('legislation');
    }
});

// Add export functionality (for future enhancement)
function exportData() {
    const data = {
        address: localStorage.getItem('userAddress'),
        surveyData: localStorage.getItem('surveyData'),
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ballotbuddy-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add print functionality
function printResults() {
    window.print();
}

// Add share functionality (for future enhancement)
function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'My BallotBuddy Results',
            text: 'Check out my personalized election guide from BallotBuddy!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
} 