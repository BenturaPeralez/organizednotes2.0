const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.get('/notes', (req, res) => res.sendFile(path.join(_dirname, "./public/notes.html")))

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/send.html'))
);

app.get('/paths', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/paths.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

//`GET /notes` should return the `notes.html` file.