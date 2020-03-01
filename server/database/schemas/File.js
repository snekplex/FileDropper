const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const config = require('../../config/config');

const FileSchema = new Schema({
  id: ObjectId,
  fileName: {
    type: String
  },
  fileSource: {
    type: String
  },
  fileType: {
    type: String
  },
  fileSize: {
    type: Number
  },
  fileHash: {
    type: String
  },
  dateUploaded: {
    type: Date,
    default: Date.now
  }
});

function saveFileObj(file) {
  var fileSource = 'http://' + config.SERVER_HOST + ':' + config.SERVER_PORT + '/' + file.name;
  if (config.NODE_ENV !== 'development') {
    // Change the URL as needed
    fileSource = 'http://' + config.SERVER_HOST + ':' + config.SERVER_PORT + '/' + file.name;
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

const FileModel = mongoose.model('File', FileSchema);

module.exports = {
  FileModel,
  saveFileObj
};