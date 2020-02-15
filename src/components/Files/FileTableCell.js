import React from 'react';

function FileTableCell () {
  return (
    <div className="table-cell">
      <div className="file-name">
        Example.txt
      </div>
      <div className="file-preview">
        This is some example text that will...
      </div>
      <div className="file-type">
        .txt
      </div>
      <div className="file-size">
        12.05 Mb
      </div>
    </div>
  )
}

export default FileTableCell;