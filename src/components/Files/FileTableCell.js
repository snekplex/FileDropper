import React from 'react';

function FileTableCell (props) {

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

  return (
    <div className="table-cell">
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

export default FileTableCell;