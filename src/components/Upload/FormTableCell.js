import React from 'react';

function FormTableCell() {
  return (
    <div className="form-table-cell">
      <div className="cell-file-name">
        Example.txt
      </div>
      <div className="cell-file-preview">
        This is some example text that will...
      </div>
      <div className="cell-file-type">
        .txt
      </div>
      <div className="cell-file-size">
        12.05 Mb
      </div>
    </div>
  )
}

export default FormTableCell;