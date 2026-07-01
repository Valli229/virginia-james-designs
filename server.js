const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const COUNTS_FILE = path.join(__dirname, 'linkCounts.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Load counts from file
function loadCounts() {
    try {
        if (fs.existsSync(COUNTS_FILE)) {
            return JSON.parse(fs.readFileSync(COUNTS_FILE, 'utf8'));
        }
    } catch (error) {
        console.error('Error loading counts:', error);
    }
    return {};
}

// Save counts to file
function saveCounts(counts) {
    try {
        fs.writeFileSync(COUNTS_FILE, JSON.stringify(counts, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving counts:', error);
    }
}

// Endpoint to record a link click
app.post('/api/link-click', (req, res) => {
    const { href, timestamp } = req.body;

    if (!href) {
        return res.status(400).json({ error: 'href is required' });
    }

    const counts = loadCounts();

    if (!counts[href]) {
        counts[href] = {
            count: 0,
            firstClicked: null,
            lastClicked: null,
            timestamps: []
        };
    }

    counts[href].count += 1;
    counts[href].lastClicked = timestamp || new Date().toISOString();
    if (!counts[href].firstClicked) {
        counts[href].firstClicked = counts[href].lastClicked;
    }
    counts[href].timestamps.push(timestamp || new Date().toISOString());

    // Keep only last 100 timestamps per link
    if (counts[href].timestamps.length > 100) {
        counts[href].timestamps = counts[href].timestamps.slice(-100);
    }

    saveCounts(counts);

    res.json({
        success: true,
        href: href,
        count: counts[href].count
    });
});

// Endpoint to get all link counts
app.get('/api/link-counts', (req, res) => {
    const counts = loadCounts();
    res.json(counts);
});

// Endpoint to get count for a specific link
app.get('/api/link-counts/:linkHash', (req, res) => {
    const counts = loadCounts();
    const linkHash = decodeURIComponent(req.params.linkHash);
    
    if (counts[linkHash]) {
        res.json(counts[linkHash]);
    } else {
        res.status(404).json({ error: 'Link not found' });
    }
});

// Endpoint to reset all counts (optional, for admin)
app.delete('/api/link-counts', (req, res) => {
    const password = req.query.password;
    
    // Simple password check (change in production!)
    if (password !== 'admin123') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    fs.writeFileSync(COUNTS_FILE, '{}', 'utf8');
    res.json({ success: true, message: 'All counts reset' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 VJD Web Server running on http://localhost:${PORT}`);
    console.log(`📊 Link counts stored in: ${COUNTS_FILE}`);
});
