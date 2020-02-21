const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =Schema.ObjectId;

const FileSchema = new Schema({
  id: ObjectId,
  fileName: { type: String },
  fileSource: { type: String },
  fileType: { type: String },
  fileSize: { type: Number },
  fileHash: { type: String },
  dateUploaded: { type: Date, default: Date.now }
});


const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;