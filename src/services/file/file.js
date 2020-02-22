import axios from 'axios';


export const uploadFiles = (files) => {
  const formData = new FormData();
  if (files.length > 1) {
    console.log(files);
  } else {
    formData.append('files', files[0]);
  }
  const data = axios.post('http://localhost:3001/upload', formData, {
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
  const data = axios.get('http://localhost:3001/get-files')
    .then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
    });

  return data;
};