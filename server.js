const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle confirmation based on branch
app.post('/:branch/save', (req, res) => {
    const branch = req.params.branch;
    const name = req.body.name;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newUserData = { branch, name };

    // Read the existing data from data.json
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data file' });
        }

        // Parse the JSON data
        let jsonData = {};
        if (data) {
            jsonData = JSON.parse(data);
        }

        // Initialize branch data if not present
        if (!jsonData[branch]) {
            jsonData[branch] = [];
        }

        // Add new user data to the branch
        jsonData[branch].push(newUserData);

        // Write the updated data back to data.json
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to data file' });
            }
            res.status(200).json({ message: 'Data saved successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
