import axios from 'axios';

import config from '../../config/config';

const backendUrlBase = config.BACKEND_HTTP_TYPE + config.BACKEND_HOST + ':' + config.BACKEND_PORT;

export const uploadFiles = (files) => {
  const formData = new FormData();
  if (files.length > 1) {
    console.log(files);
  } else {
    formData.append('files', files[0]);
  }
  const data = axios.post(backendUrlBase + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
    });

  return data;
};

export const getFileData = () => {
  const data = axios.get(backendUrlBase + '/get-files')
    .then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
    });

  return data;
};