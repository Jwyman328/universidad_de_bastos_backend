
  module.exports = class DalDb{

    constructor(db,  BooksDal, NotesDal){ 
        this.db = db
        this.notesDal = new NotesDal(db)
        this.booksDal = new BooksDal(db) 
    }


}