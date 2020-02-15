import React from 'react';

import '../../scss/Upload/UploadContainer.scss';

import UploadForm from './UploadForm';

function UploadContainer () {
  return (
    <div className="upload-container">
      <UploadForm/>
    </div>
  )
}

export default UploadContainer;