import React from 'react';

import '../../scss/Upload/UploadContainer.scss';

import UploadForm from './UploadForm';

function UploadContainer (props) {
  return (
    <div className="upload-container">
      <UploadForm
        setUploaded={props.setFilesUploaded}
      />
    </div>
  )
}

export default UploadContainer;