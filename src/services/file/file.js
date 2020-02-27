import axios from 'axios';
import { saveAs } from 'file-saver';

import config from '../../config/config';

const backendUrlBase = config.BACKEND_HTTP_TYPE + config.BACKEND_HOST + ':' + config.BACKEND_PORT;

export const uploadFiles = (files, setLoadPercent) => {
  const formData = new FormData();
  if (files.length > 1) {
    var file;
    for (file of files) {
      formData.append('files', file);
    }
  } else {
    formData.append('files', files[0]);
  }
  const data = axios.post(backendUrlBase + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded;
        const uploadTotal = progressEvent.total;
        const percent = Math.trunc((Math.floor(loaded/uploadTotal*1000)/10)).toString();
        setLoadPercent(percent);
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

export const downloadFile = (fileName, fileType) => {
  var fileSaverSupport = true;
  try {
    var isFileSaverSupported = !!new Blob();
  } catch (e) {
    fileSaverSupport = false;
  }
  const data = axios.get(backendUrlBase + `/download/${fileName}`, {
      responseType: 'blob'
    })
    .then((res) => {
      if (fileSaverSupport) {
        const blob = new Blob([res.data], { type: fileType });
        saveAs(blob, fileName);
      } else {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      }
      return res;
    }).catch((err) => {
      console.log(err);
    });


  return data;
};

export const deleteFile = (fileId) => {
  const data = axios.delete(backendUrlBase + '/delete', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      'fileId': fileId
    }
  }).then((res) => {
    return res;
  }).catch((err) => {
    console.log(err);
  });

  return data;
}