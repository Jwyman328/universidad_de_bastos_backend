const express = require("express");
const note = require("../models/notes");
const noteRouter = new express.Router();

noteRouter.post("/", async (req, res) => {
  try {
    const noteData = req.body;
    const username = req.user.username;
    const noteDataWithUserName = { ...noteData, username: username };
    const noteDateValidated = await note.validateAsync(noteDataWithUserName);
    const createNote = await req.db
      .collection("notes")
      .insertOne(noteDateValidated);
    console.log("created", createNote);
    res.status(201).send(createNote);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error recording note");
  }
});

// noteRouter.get("/", async (req, res) => {
//   try {
//     console.log(" i was hit");
//     const allMeditationsListened = await req.db
//       .collection("meditationListened")
//       .find({ username: req.user.username }).sort( { date_time_listened
//         : 1 } )
//       .toArray();
//     res.status(200).send(allMeditationsListened);
//   } catch (e) {
//     console.log(e);
//     res.status(400);
//     res.send("error recording meditation listened");
//   }
// });

module.exports = noteRouter;
