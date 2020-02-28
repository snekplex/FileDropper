import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import '../../scss/Files/FileSearch.scss';

function FileSearch (props) {

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const onSearchClick = () => {
    props.searchFunc(inputText);
  };

  return (
    <div className="file-search">
      <input 
        className="file-search-input" 
        type="text" 
        placeholder="Search for file..."
        value={inputText}
        onChange={handleInputChange} 
      />
      <button 
        className="file-search-btn"
        onClick={onSearchClick}
      >
        <AiOutlineSearch
          className="search-icon">
        </AiOutlineSearch>
      </button>
    </div>
  )
}

export default FileSearch;