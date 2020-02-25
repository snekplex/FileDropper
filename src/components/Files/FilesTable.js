import React, { useState, useEffect } from 'react';

import '../../scss/Files/FilesTable.scss';

import * as fileService from '../../services/file/file';

import FileTableCell from './FileTableCell';

function FilesTable (props) {
  const [apiFiles, setaApiFiles] = useState([]);
  useEffect(() => {

    async function fetchData() {
      const data = await fileService.getFileData();
      setaApiFiles(data.data);
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
    if (apiFiles) {
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