import React, { useState } from 'react';

import '../scss/AppContainer.scss';

import FilesContainer from './Files/FilesContainer';
import UploadContainer from './Upload/UploadContainer'

function AppContainer() {
  const [filesUploaded, setFilesUploaded] = useState(false);
  return (
    <div className="app-container">
      <FilesContainer
        filesUploaded={filesUploaded}
        setFilesUploaded={setFilesUploaded}
      />
      <UploadContainer
        filesUploaded={filesUploaded}
        setFilesUploaded={setFilesUploaded}
      />
    </div>
  )
}

export default AppContainer;