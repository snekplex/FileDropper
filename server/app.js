const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();
const HOST = 'localhost';
const PORT = 3001;

const staticFilesPath = (path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.json({ 'message': 'Express server live' });
});

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    fileUploaded = false;
    res.json({ 'fileUploaded': false });
  } else {
    const uploadedFiles = req.files;

    res.json({ 'fileUploaded': true });
  }
});

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));