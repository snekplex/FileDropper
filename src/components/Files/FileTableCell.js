import React, { useState } from 'react';

import * as fileService from '../../services/file/file';

function FileTableCell (props) {
  const [expanded, setExpanded] = useState(false);

  const onDownloadClick = async (fileName, fileType) => {
    const data = await fileService.downloadFile(fileName, fileType); 
  };

  const onDeleteClick = async (fileId) => {
    const data = await fileService.deleteFile(fileId);
    if (!data.data.fileDeleted) {
      window.alert('Error deleting file from database');
    };
  };

  const FilePreview = ({fileSource, fileType}) => {
    if (fileType.includes('image')) {
      return (
        <div className="file-preview">
          <img className="file-img" src={fileSource} alt="File preview"/>
        </div>  
      )
    } else {
      return (
        <div className="file-preview">
          Not Image
        </div>
      )
    }
  }
  
  const FileSize = ({fileSize}) => {
    if (fileSize >= 1e+9) {
      return (
        <div className="file-size">
          {(fileSize / 1e+9).toFixed(2)} GB
        </div>
      )
    } else if (fileSize >= 1000000) {
      return (
        <div className="file-size">
          {(fileSize / 1000000).toFixed(2)} MB
        </div>
      )
    } else if (fileSize >= 1000) {
      return (
        <div className="file-size">
          {(fileSize / 1000).toFixed(2)} KB
        </div>
      )
    } else {
      return (
        <div className="file-size">
          Error
        </div>
      )
    }
  }

  if (expanded) {
    return (
      <div className="table-cell expanded">
        <FilePreview
          fileSource={props.source}
          fileType={props.type}
        />
        <div className="file-name">
          {props.name}
        </div>
        <div className="file-type">
          {props.type}
        </div>
        <FileSize
          fileSize={props.size}
        />
        <div className="expanded-opts">
          <button 
            className="delete-btn"
            onClick={() => onDeleteClick(props.id)}
            >
            Delete
          </button>
          <button 
            className="download-btn"
            onClick={() => onDownloadClick(props.name, props.type)}
          >
            Download
          </button>
          <button 
            className="close-btn" 
            onClick={() => setExpanded(false)}
          >Close</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="table-cell" onClick={() => setExpanded(true)}>
        <div className="file-name">
          {props.name}
        </div>
        <FilePreview
          fileSource={props.source}
          fileType={props.type}
        />
        <div className="file-type">
          {props.type}
        </div>
        <FileSize
          fileSize={props.size}
        />
      </div>
    )
  }
}

export default FileTableCell;