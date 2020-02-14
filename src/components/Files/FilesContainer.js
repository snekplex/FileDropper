import React from 'react';

import '../../scss/Files/FilesContainer.scss';

import FileSearch from './FileSearch';
import FilesTable from './FilesTable';

function FilesContainer () {
  return (
    <div className="files-container">
      <FileSearch/>
      <FilesTable/>
    </div>
  )
}

export default FilesContainer;