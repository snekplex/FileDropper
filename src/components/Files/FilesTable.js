import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import '../../scss/Files/FilesTable.scss';

import * as fileService from '../../services/file/file';

import FileTableCell from './FileTableCell';

function FilesTable (props) {
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [apiFiles, setApiFiles] = useState([]);
  useEffect(() => {

    async function fetchData() {
      setLoadingFiles(true);
      const data = await fileService.getFileData();
      if (data) {
        setApiFiles(data.data);
        setLoadingFiles(false);
      }
    }

    fetchData();

    if (props.filesUploaded) {
      fetchData();
      props.setFilesUploaded(false);
    }

    return function cleanup() {

    };

  }, [props]);
  

  const FileTableCells = ({apiFiles}) => {
    if (loadingFiles) {
      return (
        <div className="table-row-data loading">
          <Loader
            type="TailSpin"
            color="#ffffff"
            width={250}
            height={250}
            timeout={10000}
          ></Loader>
        </div>
      )
    } else if (apiFiles && !loadingFiles) {
      return (
        <div className="table-row-data">
          {
            apiFiles.map((file) => (
              <FileTableCell
                key={file._id}
                id={file._id}
                name={file.fileName}
                source={file.fileSource}
                type={file.fileType}
                size={file.fileSize}
                updateFiles={props.setFilesUploaded}
              />
            ))
          }
        </div>
      )
    } else {
      return (
        <div className="table-row-data"></div>
      )
    }
  };

  return (
    <div className="files-table">
      <div className="table-header">
        Stored Files
      </div>
      <div className="table-col-names">
        <span>Name</span>
        <span>Preview</span>
        <span>Type</span>
        <span>Size</span>
      </div>
      <div className="table-rows">
        <FileTableCells
          apiFiles={apiFiles.files}
        />
      </div>
    </div>
  )
}

export default FilesTable;