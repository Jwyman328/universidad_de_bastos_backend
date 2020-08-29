module.exports = class BooksDal {
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

    const allBooksWithUserSpecificHasBeenReadByUserField = allBooks.map(
      (book) => {
        if (arrayOfBookIdsRead.includes(String(book._id))) {
          book.hasBeenReadByUser = true;
        }
        return book;
      }
    );

    return allBooksWithUserSpecificHasBeenReadByUserField;
  }

  async markBookAsRead(userId, bookId) {
    const books = await this.db
      .collection("books-read")
      .insertOne({ userId: userId, bookId: bookId });

    return books;
  }

  async removeBookAsRead(bookReadId) {
    const bookReadRemove = await this.db
      .collection("books-read")
      .deleteOne({ bookId: bookReadId });

    return bookReadRemove
  }
};
