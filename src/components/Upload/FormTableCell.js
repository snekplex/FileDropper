import React, { useState, useEffect } from 'react';
import { AiFillFileText } from 'react-icons/ai';

function FormTableCell(props) {

  const CellFileName = ({fileName}) => {
    if (fileName.length >= 15) {
      fileName = fileName.substring(0, 10) + '...';
    };

    return (
      <div className="cell-file-name">
        {fileName}
      </div>
    )
  };

  const CellFilePreview = ({file, fileType}) => {
    const [cellImg, setCellImg] = useState([]);
    useEffect(() => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setCellImg(reader.result);
      };

      return function cleanup() {
        reader.abort();
      };
    });
    if (fileType.includes('image')) {
      return (
        <div className="cell-file-preview">
          <img className="cell-file-img" src={cellImg} alt="Cell file preview"/>
        </div>  
      )
    } else {
      return (
        <div className="cell-file-preview">
          <AiFillFileText
            className="cell-file-img"
          ></AiFillFileText>
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
    } else if (fileSize <= 999) {
      return (
        <div className="cell-file-size">
          {fileSize} B
        </div>
      )
    } else {
      return (
        <div className="cell-file-size">
          NA
        </div>
      )
    }
  }


  return (
    <div className="form-table-cell">
      <CellFileName
        fileName={props.name}
      />
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