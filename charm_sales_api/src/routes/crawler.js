const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crawler = require('npm-license-crawler');

router.get('/licenses', (req, res) => {
    const projectRoot = path.join(__dirname, '..', '..', '..'); 

    const options = {
        start: [projectRoot],
        json: path.join(__dirname, '..', 'licenses.json'),
        unknown: true,
        exclude: ['.'],
    };
    crawler.dumpLicenses(options, (error) => {
        if (error) {
            console.error("Error:", error);
            return res.status(500).send('Server error');
        } else {
            const licensesFilePath = path.join(__dirname, '..', 'licenses.json');

            fs.readFile(licensesFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading licenses file:', err);
                    return res.status(500).send('Server error');
                }
                res.json(JSON.parse(data));
            });
        }
    });
});

module.exports = router;
