import React from 'react';

import '../../scss/Files/FilesTable.scss';

import TableRow from './TableRow';

function FilesTable () {
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
      <div className="table-row-data">
        <TableRow/>
      </div>
    </div>
  )
}

export default FilesTable;