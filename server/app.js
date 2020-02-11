const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({'message': 'Express server live'});
});

app.listen(3000);