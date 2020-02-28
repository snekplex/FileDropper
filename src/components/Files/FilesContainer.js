import React, { useState, useEffect } from 'react';

import '../../scss/Files/FilesContainer.scss';

import * as fileService from '../../services/file/file';

import FileSearch from './FileSearch';
import FilesTable from './FilesTable';

function FilesContainer (props) {

  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiFiles, setApiFiles] = useState([]);
  useEffect(() => {

    async function fetchData() {
      setLoadingFiles(true);
      const data = await fileService.getFileData();
      if (data) {
        setApiFiles(data.data);
        setLoadingFiles(false);
      }
      
    }

    fetchData();

    if (props.filesUploaded) {
      fetchData();
      props.setFilesUploaded(false);
    }

    return function cleanup() {

    };

  }, [props]);

  const [filteredFiles, setFilteredFiles] = useState([]);
  useEffect(() => {

    var filtered = apiFiles.files;
    
    if (searchQuery !== '') {
      filtered = apiFiles.files.filter((file) => file.fileName.includes(searchQuery));
    }
    
    setFilteredFiles(filtered);

    return function cleanup() {
      
    };
  }, [searchQuery, apiFiles]);

  return (
    <div className="files-container">
      <FileSearch
        searchFunc={setSearchQuery}
      />
      <FilesTable
        files={filteredFiles}
        loadingFiles={loadingFiles}
        setFilesUploaded={props.setFilesUploaded}
      />
    </div>
  )
}

export default FilesContainer;