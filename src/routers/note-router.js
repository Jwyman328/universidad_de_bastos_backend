const express = require("express");
const note = require("../models/notes");
const noteRouter = new express.Router();
const {ObjectId} = require('mongodb'); // or ObjectID 

noteRouter.post("/", async (req, res) => {
  try {
    const noteData = req.body;
    const username = req.user.username;
    const noteDataWithUserName = { ...noteData, username: username };
    const noteDateValidated = await note.validateAsync(noteDataWithUserName);
    const createNote = await req.db
      .collection("notes")
      .insertOne(noteDateValidated);
    res.status(201).send(createNote);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error recording note");
  }
});

noteRouter.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId
    const notesOfVideo = await req.db
      .collection("notes")
      .find({ username: req.user.username, videoId:videoId }).sort( { videoTimeNoteTakenInSeconds
        : 1 } )
      .toArray();
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
    const noteIdInAsObjectId = new ObjectId(noteId)
    const noteUpdated = await req.db
      .collection("notes").updateOne({ "_id" :ObjectId(noteIdInAsObjectId)  },{  $set: {...noteData}})
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
    const notesOfVideo = await req.db
      .collection("notes").deleteOne({ "_id" :ObjectId(noteIdInAsObjectId)  })
    res.status(200).send(notesOfVideo);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

module.exports = noteRouter;
