const { ObjectId } = require("mongodb"); // or ObjectID
const videoWatchedModel = require("../../models/videoWatched");

module.exports = class VideoDal {
  constructor(db) {
    this.db = db;
  }

  async createWatchedVideo(videoData) {
    let createdVideoWatched;
    const videoDataValidated = await videoWatchedModel.validateAsync(videoData);
    const doesVideoWatchedExist = await this.db
      .collection("videos-watched")
      .find({
        videoUrl: videoDataValidated.videoUrl,
        userId: videoDataValidated.userId,
      })
      .toArray();

    if (doesVideoWatchedExist.length === 0) {
      console.log("new");
      createdVideoWatched = await this.db
        .collection("videos-watched")
        .insertOne(videoDataValidated);
    } else {
      createdVideoWatched = await this.db
        .collection("videos-watched")
        .updateOne(
          { _id: doesVideoWatchedExist[0]._id },
          { $set: { ...videoDataValidated } }
        );
    }

    return createdVideoWatched;
  }

  async getAllVideos() {
    const allVideos = await this.db.collection("videos").find({});
    return allVideos;
  }
};
