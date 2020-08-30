module.exports = class DalDb {
  constructor(db, BooksDal, NotesDal, AuthDal, VideoDal) {
    this.db = db;
    this.notesDal = new NotesDal(db);
    this.booksDal = new BooksDal(db);
    this.authDal = new AuthDal(db);
    this.videoDal = new VideoDal(db);
  }
};
