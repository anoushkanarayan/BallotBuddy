const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all routes with more specific configuration
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files
app.use(express.static(__dirname));

// API proxy endpoint for Google Civic Information API
app.get('/api/representatives', async (req, res) => {
    console.log('=== Representatives API Request ===');
    console.log('Request headers:', req.headers);
    console.log('Request query:', req.query);
    
    try {
        const { address, key } = req.query;
        
        if (!address || !key) {
            console.log('Missing parameters - address:', !!address, 'key:', !!key);
            return res.status(400).json({ 
                error: 'Missing required parameters: address and key' 
            });
        }

        console.log('Processing request for address:', address);

        // Use the representatives endpoint to get current representatives
        const representativesUrl = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${encodeURIComponent(address)}`;
        console.log('Getting representatives from:', representativesUrl);
        
        const representativesResponse = await fetch(representativesUrl);
        console.log('Google API response status:', representativesResponse.status);
        
        const representativesData = await representativesResponse.json();
        
        if (!representativesResponse.ok) {
            console.error('Representatives API Error:', representativesData);
            return res.status(representativesResponse.status).json(representativesData);
        }
        
        console.log('Representatives Response successful, offices found:', representativesData.offices ? representativesData.offices.length : 0);
        console.log('Response data preview:', JSON.stringify(representativesData).substring(0, 200) + '...');
        
        // Return the data directly since it's already in the correct format
        res.json(representativesData);
        
    } catch (error) {
        console.error('Server error in representatives endpoint:', error);
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'BallotBuddy API server is running' });
});

// Test endpoint for Google Civic Information API
app.get('/api/test-civic', async (req, res) => {
    try {
        const { key } = req.query;
        
        if (!key) {
            return res.status(400).json({ 
                error: 'Missing required parameter: key' 
            });
        }

        // Test with a simple elections request first
        const testUrl = `https://www.googleapis.com/civicinfo/v2/elections?key=${key}`;
        
        console.log('Testing Civic API with:', testUrl);
        
        const response = await fetch(testUrl);
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            console.error('Test API - Non-JSON response:', textResponse);
            return res.status(response.status).json({
                error: 'Test API returned non-JSON response',
                status: response.status,
                contentType: contentType,
                message: 'API key may be invalid or API not enabled'
            });
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            console.error('Test API Error:', data);
            return res.status(response.status).json(data);
        }
        
        console.log('Test API successful, elections found:', data.elections ? data.elections.length : 0);
        res.json({
            success: true,
            message: 'Civic Information API is working',
            elections: data.elections ? data.elections.length : 0
        });
        
    } catch (error) {
        console.error('Test API server error:', error);
        res.status(500).json({ 
            error: 'Test API server error', 
            message: error.message 
        });
    }
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback function to provide representative data when API fails
function getFallbackRepresentatives(address) {
    return {
        offices: [
            {
                name: "President of the United States",
                divisionId: "ocd-division/country:us",
                levels: ["country"],
                roles: ["headOfGovernment"],
                officialIndices: [0]
            },
            {
                name: "United States Senator",
                divisionId: "ocd-division/country:us/state:dc",
                levels: ["administrativeArea1"],
                roles: ["legislatorUpperBody"],
                officialIndices: [1, 2]
            },
            {
                name: "United States Representative",
                divisionId: "ocd-division/country:us/state:dc/cd:1",
                levels: ["administrativeArea1"],
                roles: ["legislatorLowerBody"],
                officialIndices: [3]
            },
            {
                name: "Mayor",
                divisionId: "ocd-division/country:us/state:dc/place:washington",
                levels: ["locality"],
                roles: ["headOfGovernment"],
                officialIndices: [4]
            }
        ],
        officials: [
            {
                name: "Joe Biden",
                party: "Democratic",
                phones: ["202-456-1111"],
                emails: ["president@whitehouse.gov"],
                urls: ["https://www.whitehouse.gov"],
                photoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg"
            },
            {
                name: "Senator 1",
                party: "Democratic",
                phones: ["202-224-0001"],
                emails: ["senator1@senate.gov"],
                urls: ["https://www.senate.gov"]
            },
            {
                name: "Senator 2", 
                party: "Democratic",
                phones: ["202-224-0002"],
                emails: ["senator2@senate.gov"],
                urls: ["https://www.senate.gov"]
            },
            {
                name: "Representative",
                party: "Democratic", 
                phones: ["202-225-0001"],
                emails: ["rep@house.gov"],
                urls: ["https://www.house.gov"]
            },
            {
                name: "Mayor",
                party: "Democratic",
                phones: ["202-727-0001"],
                emails: ["mayor@dc.gov"],
                urls: ["https://mayor.dc.gov"]
            }
        ],
        divisions: {
            "ocd-division/country:us": {
                name: "United States",
                officeIndices: [0]
            },
            "ocd-division/country:us/state:dc": {
                name: "District of Columbia",
                officeIndices: [1, 2, 3]
            },
            "ocd-division/country:us/state:dc/place:washington": {
                name: "Washington, DC",
                officeIndices: [4]
            }
        },
        normalizedInput: {
            line1: address,
            city: "Washington",
            state: "DC",
            zip: "20500"
        }
    };
}

app.listen(PORT, () => {
    console.log(`🚀 BallotBuddy server running on http://localhost:${PORT}`);
    console.log(`📡 API proxy available at http://localhost:${PORT}/api/representatives`);
    console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
}); 