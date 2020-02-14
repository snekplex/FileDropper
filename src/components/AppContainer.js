import React from 'react';

import '../scss/AppContainer.scss';

import FilesContainer from './Files/FilesContainer';
import UploadContainer from './Upload/UploadContainer'

function AppContainer() {
  return (
    <div className="app-container">
      <FilesContainer/>
      <UploadContainer/>
    </div>
  )
}

export default AppContainer;