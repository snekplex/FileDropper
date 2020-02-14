import React from 'react';

import '../../scss/Files/FileSearch.scss';

function FileSearch () {
  return (
    <div className="file-search">
      <input className="file-search-input" type="text" placeholder="Search for file..." />
      <button className="file-search-btn">Search</button>
    </div>
  )
}

export default FileSearch;