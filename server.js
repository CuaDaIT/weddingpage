const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 80;
const dataFilePath = path.join(__dirname, 'public', 'data.json');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/daad', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});
app.get('/mmo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index3.html'));
});
app.get('/her', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index4.html'));
});

// Route to handle confirmation based on branch
app.post('/save', (req, res) => {
    const branch = req.body.branch;
    const name = req.body.name;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newUserData = { branch, name };

    // Read the existing data from data.json
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ message: 'Error reading data file' });
        }
        // Parse the JSON data
        let jsonData = [];
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON data:', parseErr);
                return res.status(500).json({ message: 'Error parsing data file' });
            }
        }

        // Add new user data to the branch
        jsonData.push(newUserData);
        console.log('Updated JSON data:', jsonData);

        let dat;
        try {
            dat = JSON.stringify(jsonData);
        } catch (err) {
            console.error('Error converting data to JSON:', err);
            res.status(500).json({ success: false, message: 'Failed to convert data to JSON' });
            return;
        }
    

        // Write the updated data back to data.json
        fs.writeFile(dataFilePath, dat, 'utf-8', (err) => {
            if (err) {
                console.error('Error writing to data file:', err);
                return res.status(500).json({ message: 'Error writing to data file' });
            }
            console.log(JSON.stringify(jsonData));
            res.status(200).json({ message: 'Data saved successfully'});
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
