import React, { useCallback, useState, useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import { Line } from 'rc-progress';

import '../../scss/Upload/UploadForms.scss';

import * as fileService from '../../services/file/file';
import FormTableCell from './FormTableCell';

function UploadForm() {
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);

  const [ isUploading, setUploading ] = useState(false);

  const [ uploadPercent, setUploadPercent ] = useState('0');
  const [ files, setFiles ] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const onUploadClick = async () => {
    setUploading(true);
    const data = await fileService.uploadFiles(files);
  };

  const FormTableCells = ({files}) => {
    if (files) {
      return (
        <div className="form-table-data" key>
          {
            files.map(file => (
              <FormTableCell
                key={file.name}
                file={file}
                name={file.name}
                type={file.type}
                size={file.size}
              />
            ))
          }
        </div>
      )
    } else {
      return (
        <div className="form-table-data"></div>
      )
    }
  }

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
        {
          isUploading ?
          <div className="upload-bar-div">
            <span className="progress-bar-title">Uploading...</span>
            <Line 
              className="progress-bar"
              percent={`${uploadPercent}`}
              strokeWidth="4"
              trailWidth="4">
            </Line>
          </div>
          :
          <span></span>
        }
        <div className="form-table">
          <div className="form-table-header">
            <span>Name</span>
            <span>Preview</span>
            <span>Type</span>
            <span>Size</span>
          </div>
          <FormTableCells
            files={files}
          />
        </div>
      </div>
      <div className="form-footer">
        <button className="form-footer-btn upload-btn" onClick={onUploadClick}>Upload</button>
        <button className="form-footer-btn clear-btn">Clear</button>
      </div>
    </div>
  )
}

export default UploadForm;