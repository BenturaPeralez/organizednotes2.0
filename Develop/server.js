const fs = require("fs");

const express = require("express");
const path = require("path");
const { response } = require("express");
const { send } = require("process");

const app = express();
const PORT = 3001;

const saveNote = (note) =>  fetch('/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(note),
});

app.use (express.static("public"));

app.post("/api/notes", (req,res) => {
  fs.readFile(
    path.join(__dirname, "./db/db.json"),
    "utf8",
    (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        res.send("you cannot read the file");
      }
      res.json(JSON.parse(jsonString));
    }
  );
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/send", (req, res) =>
  res.sendFile(path.join(__dirname, "public/send.html"))
);

app.get("/paths", (req, res) =>
  res.sendFile(path.join(__dirname, "public/paths.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./db/db.json"),
    "utf8",
    (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        res.send("you cannot read the file");
      }
      res.json(JSON.parse(jsonString));
    }
  );
});






app.listen(PORT);

//The following HTML routes should be created: `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
