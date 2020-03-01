import React, { useState } from 'react';
import { AiFillFileText } from 'react-icons/ai';

import * as fileService from '../../services/file/file';

function FileTableCell (props) {
  const [expanded, setExpanded] = useState(false);

  const onDownloadClick = async (fileName, fileType) => {
    // eslint-disable-next-line
    const data = await fileService.downloadFile(fileName, fileType);
  };

  const onDeleteClick = async (fileId) => {
    const data = await fileService.deleteFile(fileId);
    if (!data.data.fileDeleted || !data.data.fileDataDeleted) {
      window.alert('Error removing file from database');
    }
    if (data.data.fileDeleted && data.data.fileDataDeleted) {
      props.updateFiles(true);
    }
  };

  const FileName = ({fileName}) => {
    if (fileName.length >= 15) {
      fileName = fileName.substring(0, 10) + '...';
    };

    return (
      <div className="file-name">
        {fileName}
      </div>
    )
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
          <AiFillFileText
            className="file-img"
          ></AiFillFileText>
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
    } else if (fileSize <= 999) {
      return (
        <div className="file-size">
          {fileSize} B
        </div>
      )
    } else {
      return (
        <div className="file-size">
          NA
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
        <FileName
          fileName={props.name}
        />
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