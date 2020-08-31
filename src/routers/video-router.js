const express = require("express");
const note = require("../models/notes");
const videoRouter = new express.Router();
const { ObjectId } = require("mongodb"); // or ObjectID

videoRouter.post("/", async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    const userId = req.user._id;
    const currentDate = new Date();
    const videoWatchedData = {
      videoUrl: videoUrl,
      userId: userId,
      dateWatched: currentDate,
    };
    const watchedVideo = await req.db.videoDal.createWatchedVideo(
      videoWatchedData
    );

    res.status(201).send(watchedVideo);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error recording video watched");
  }
});

videoRouter.get("/", async (req, res) => {
  try {
    const videos = await req.db.videoDal.getAllVideos(req.user._id);

    res.status(200).send(videos);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error getting videos");
  }
});

module.exports = videoRouter;
