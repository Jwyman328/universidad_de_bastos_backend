const express = require("express");
const note = require("../models/notes");
const noteRouter = new express.Router();
const {ObjectId} = require('mongodb'); // or ObjectID 

noteRouter.post("/", async (req, res) => {
  try {
    const noteData = req.body;
    const username = req.user.username;
    const noteDataWithUserName = { ...noteData, username: username };
    const createdNote = await req.db.notesDal.createNote(noteDataWithUserName)

    res.status(201).send(createdNote);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error recording note");
  }
});

noteRouter.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId
    const username = req.user.username
    const notesOfVideo = await req.db.notesDal.getVideoNotes(username,videoId)

    res.status(200).send(notesOfVideo);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

noteRouter.put("/:noteId", async (req, res) => {
  try {
    const noteData = req.body;
    const noteId = req.params.noteId
    const noteUpdated = await req.db.notesDal.updateNote(noteData, noteId)

    res.status(200).send(noteUpdated);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

noteRouter.delete("/:noteId", async (req, res) => {
  try {
   
    const noteId = req.params.noteId
    const noteIdInAsObjectId = new ObjectId(noteId)
    const deletedNote = await req.db.notesDal.deleteNote(noteId)

    res.status(200).send(deletedNote);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

module.exports = noteRouter;
