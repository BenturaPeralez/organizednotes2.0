const fs = require("fs");

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;



app.use(express.static("public"));
app.use(express.json());

app.post("/api/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./db/db.json"),
    "utf8",
    (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        res.send("you cannot read the file");
      }
     const notesParsed = JSON.parse(jsonString)
     //before thhis step an id is to be added
      notesParsed.push(req.body)
      fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesParsed), (err)=> {
        if (err) {
          console.log(err);
          res.json("error! note not added");
        }
        else {
          res.json("note is sucessfully added");
        }

      })
    
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
