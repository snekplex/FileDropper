const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');

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
app.use(compression());


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
        FileModel.saveFileObj(file);
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
          FileModel.saveFileObj(file);
        }
      });
    }

    res.json({
      'filesUploaded': true
    });
  }
});


app.get('/get-files', (req, res) => {
  FileModel.FileModel.find({}, (err, files) => {
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


app.get('/download/:fileName', (req, res) => {
  FileModel.FileModel.findOne({fileName: req.params.fileName}, (err, file) => {
    if (err) {
      res.json({
        'fileDownloaded': false
      });
    }
    if (file) {
      res.download(__dirname + `/uploaded/${req.params.fileName}`, req.params.fileName);
    }
  });
});

app.delete('/delete', (req, res) => {
  const fileId = req.body.fileId;
  FileModel.FileModel.findById(fileId, (err, file) => {
      const response = {
        fileDeleted: false,
        fileDataDeleted: false
      };
      fs.unlink(__dirname + `/uploaded/${file.fileName}`, (err) => {
        if (err) {
          response.fileDeleted = false;
        }
        response.fileDeleted = true;
      });
      file.remove((err) => {
        if (err) {
          response.fileDataDeleted = false;
        }
        response.fileDataDeleted = true;
      });
      res.json(response);
  });
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