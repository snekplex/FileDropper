import React, { useCallback } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import { Line } from 'rc-progress';

import '../../scss/Upload/UploadForms.scss';

import FormTableCell from './FormTableCell';

function UploadForm() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  return (
    <div className="upload-form">
      <div className="form-header">
        File Upload
      </div>
      <div className="form-body">
        <div className="file-dropzone" {...getRootProps()}>
          <input {...getInputProps()}/>
          {
            isDragActive ?
              <div className="dropzone-div">
                Drop files here...
              </div> 
              :
              <div className="dropzone-div">
                <AiOutlineUpload 
                  className="upload-icon">
                </AiOutlineUpload>
                Drop/Click to add files
              </div>
          }
        </div>
        <span className="progress-bar-title">Uploading...</span>
        <Line 
          className="progress-bar"
          percent="20"
          strokeWidth="4"
          trailWidth="4">
        </Line>
        <div className="form-table">
          <div className="form-table-header">
            <span>Name</span>
            <span>Preview</span>
            <span>Type</span>
            <span>Size</span>
          </div>
          <div className="form-table-data">
            <FormTableCell/>
            <FormTableCell/>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button className="form-footer-btn upload-btn">Upload</button>
        <button className="form-footer-btn clear-btn">Clear</button>
      </div>
    </div>
  )
}

export default UploadForm;