import React from 'react';

import '../../scss/Files/FilesContainer.scss';

import FileSearch from './FileSearch';
import FilesTable from './FilesTable';

function FilesContainer (props) {
  return (
    <div className="files-container">
      <FileSearch/>
      <FilesTable
        filesUploaded={props.filesUploaded}
        setFilesUploaded={props.setFilesUploaded}
      />
    </div>
  )
}

export default FilesContainer;