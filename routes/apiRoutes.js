const app = require('express').Router();
const fs = require('fs');
const path = require("path");

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

app.post("/notes", function (req, res) {
    console.log("post route")
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
    let note = req.body;
    let id = notes.length.toString();
    note.id = id;
    notes.push(note);
  
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
  
    res.json(notes);
  });

  app.get("/notes/:id", function (req, res) {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
    res.json(notes[Number(req.params.id)]);
  });

  module.exports = app; 