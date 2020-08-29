const { ObjectId } = require("mongodb"); // or ObjectID
const note = require("../../models/notes");

module.exports = class NotesDal {
  constructor(db) {
    this.db = db;
  }

  async createNote(noteData) {
    const noteDateValidated = await note.validateAsync(noteData);
    const createdNote = await this.db
      .collection("notes")
      .insertOne(noteDateValidated);
    return createdNote;
  }

  async getVideoNotes(username, videoId) {
    const notesOfVideo = await this.db
      .collection("notes")
      .find({ username: username, videoId: videoId })
      .sort({ videoTimeNoteTakenInSeconds: 1 })
      .toArray();

    return notesOfVideo;
  }

  async updateNote(noteData, noteId) {
    const noteIdInAsObjectId = new ObjectId(noteId);
    const noteUpdated = await this.db
      .collection("notes")
      .updateOne(
        { _id: ObjectId(noteIdInAsObjectId) },
        { $set: { ...noteData } }
      );

    return noteUpdated;
  }

  async deleteNote(noteId) {
    const noteIdInAsObjectId = new ObjectId(noteId);
    const deletedNote = await this.db
      .collection("notes")
      .deleteOne({ _id: ObjectId(noteIdInAsObjectId) });

    return deletedNote;
  }
};
