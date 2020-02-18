const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');

const app = express();
const HOST = 'localhost';
const PORT = 3001;

const staticFilesPath = path.join(__dirname, 'public');
const uploadedFilesPath = path.join(__dirname, 'uploaded');

app.use(express.static(staticFilesPath));
app.use(express.static(uploadedFilesPath));
app.use(fileUpload());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    'message': 'Express server live'
  });
});

app.post('/upload', (req, res) => {
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    res.json({
      'filesUploaded': false
    });
  } else {
    const uploadedFiles = req.files;
    var file;

    if (uploadedFiles.files.length > 1) {
      for (file of uploadedFiles.files) {
        fs.writeFile(uploadedFilesPath + '\\' + file.name, file.data, (err) => {
          if (err) {
            res.json({
              'error': 'Error saving file',
              'filesUploaded': false
            });
          }
        });
      }
    } else {
      const file = uploadedFiles.files;
      fs.writeFile(uploadedFilesPath + '\\' + file.name, file.data, (err) => {
        if (err) {
          res.json({
            'error': 'Error saving file',
            'filesUploaded': false
          });
        }
      });
    }

    res.json({
      'filesUploaded': true
    });
  }
});

app.get('/get-files', (req, res) => {
  res.json({
    'message': 'Return files'
  });
});

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));