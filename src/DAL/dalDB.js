
  module.exports = class DalDb{

    constructor(db,  BooksDal){ //notesDal,
        this.db = db
        //this.notesDal = new notesDal(db)
        this.booksDal = new BooksDal(db) 
    }


}