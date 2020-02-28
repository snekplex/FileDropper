import React from 'react';
import Loader from 'react-loader-spinner';

import '../../scss/Files/FilesTable.scss';

import FileTableCell from './FileTableCell';

function FilesTable (props) {
  const FileTableCells = ({files, loading}) => {
    if (loading) {
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
    } else if (files) {
      return (
        <div className="table-row-data">
          {
            files.map((file) => (
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
        <div className="table-row-data">
          Error Loading Files
        </div>
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
          files={props.files}
          loading={props.loadingFiles}
        />
      </div>
    </div>
  )
}

export default FilesTable;