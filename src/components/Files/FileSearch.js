import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import '../../scss/Files/FileSearch.scss';

function FileSearch () {
  return (
    <div className="file-search">
      <input className="file-search-input" type="text" placeholder="Search for file..." />
      <button className="file-search-btn">
        <AiOutlineSearch
          className="search-icon">
        </AiOutlineSearch>
      </button>
    </div>
  )
}

export default FileSearch;