const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const config = require('./config/config');
const FileModel = require('./database/schemas/File');

const app = express();
const dbUrl = config.MONGO_HOST + config.MONGO_DATABASE;

const staticFilesPath = path.join(__dirname, 'public');
const uploadedFilesPath = path.join(__dirname, 'uploaded');

app.use(bodyParser.json());
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
        } else {
          var fileSource = 'http://' + config.SERVER_HOST + ':' + config.SERVER_PORT + '/' + file.name;
          if (config.NODE_ENV !== 'development') {
            // Change the stored URL as needed
            fileSource = 'http://' + config.SERVER_HOST + '/' + file.name;
          }
          const fileObj = new FileModel({
            fileName: file.name,
            fileSource: fileSource,
            fileType: file.mimetype,
            fileSize: file.size,
            fileHash: file.md5
          });
          fileObj.save((err) => {
            if (err) {
              console.log(err);
            }
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
  FileModel.find({}, (err, files) => {
    if (err) {
      res.json({ 'error': 'Error finding files' });
    };

    var fileArray = [];

    files.forEach((file) => {
      fileArray.push(file);
    });
    res.json({ 'files': fileArray });
  });
});


app.get('/send-files', (req, res) => {
  res.sendFile(__dirname + `/uploaded/${req.body.imgName}`);
});



app.listen(config.SERVER_PORT, config.SERVER_PORT, async (err) => {
  if (err) {
    console.log(err);
  }

  try {

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err) => {
      if (err) {
        console.log(`Error connecting to mongodb. ERROR: ${err.message}`);
      } else {
        console.log('Connected to mongodb.');
      }
    });
    console.log(`Running on http://${config.SERVER_HOST}:${config.SERVER_PORT}`);

  } catch (err) {
    console.log(err);
  }
});