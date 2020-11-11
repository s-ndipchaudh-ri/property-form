const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs')
const path = require('path')

const app = express();
const cors = require('cors')
app.use(cors())
app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/propertyform/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.get('/checkfiles',(req,res) => {
  let imgs = []
  fs.readdir(`${__dirname}/propertyform/public/uploads/`, (err, files) => {
    files.forEach(file => {
     imgs.push(file)
    });
    res.json({images : imgs})
  });
  
  
})

app.get('/',(req,res) =>{
  
const directory = `${__dirname}/propertyform/public/uploads/`;

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});
  
})

app.listen(5000, () => console.log('Server Started...'));
