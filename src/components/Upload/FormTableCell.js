import React, { useState } from 'react';

function FormTableCell(props) {

  const [cellImg, setCellImg] = useState([]);

  const CellFilePreview = ({file, fileType}) => {
    if (fileType.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setCellImg(reader.result);
      };
      return (
        <div className="cell-file-preview">
          <img className="cell-file-img" src={cellImg} alt="Cell file preview"/>
        </div>  
      )
    } else {
      return (
        <div className="cell-file-preview">
          Not Image
        </div>
      )
    }
  }

  const CellFileSize = ({fileSize}) => {
    if (fileSize >= 1e+9) {
      return (
        <div className="cell-file-size">
          {(fileSize / 1e+9).toFixed(2)} GB
        </div>
      )
    } else if (fileSize >= 1000000) {
      return (
        <div className="cell-file-size">
          {(fileSize / 1000000).toFixed(2)} MB
        </div>
      )
    } else if (fileSize >= 1000) {
      return (
        <div className="cell-file-size">
          {(fileSize / 1000).toFixed(2)} KB
        </div>
      )
    } else {
      return (
        <div className="cell-file-size">
          Error
        </div>
      )
    }
  }

  return (
    <div className="form-table-cell">
      <div className="cell-file-name">
        {props.name}
      </div>
      <CellFilePreview
        file={props.file}
        fileType={props.type}
      />
      <div className="cell-file-type">
        {props.type}
      </div>
      <CellFileSize 
        fileSize={props.size}
      />
    </div>
  )
}

export default FormTableCell;