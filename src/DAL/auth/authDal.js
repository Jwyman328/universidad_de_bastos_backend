module.exports = class AuthDal {
  constructor(db) {
    this.db = db;
  }

  async findAllBooksByUser(userId) {
    const allBooks = await this.db.collection("books").find({}).toArray();

    const allBooksReadByUser = await this.db
      .collection("books-read")
      .find({ userId: userId })
      .toArray();
    const arrayOfBookIdsRead = allBooksReadByUser.map((bookRead) => {
      return bookRead.bookId;
    });
  }
};
