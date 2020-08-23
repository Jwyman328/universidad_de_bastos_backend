const express = require("express");
const bookRouter = new express.Router();
const { ObjectId } = require("mongodb"); 

bookRouter.get("/", async (req, res) => {
  try {
    const user = req.user;
    const allBooks = await req.db.collection("books").find({}).toArray();

    const allBooksReadByUser = await req.db
      .collection("books-read")
      .find({ userId: user._id })
      .toArray();
    const arrayOfBookIdsRead = allBooksReadByUser.map(bookRead => {
        return bookRead.bookId
    })

    const allBooksWithUserSpecificHasBeenReadByUserField = allBooks.map((book) => {
        if(arrayOfBookIdsRead.includes(String(book._id))){
            book.hasBeenReadByUser = true
        }
        return book
    })

    res.status(201).send(allBooksWithUserSpecificHasBeenReadByUserField);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error getting books");
  }
});


bookRouter.post("/read/", async (req, res) => {
  try {
    const bookData = req.body;
    const user = req.user;
    const books = await req.db
      .collection("books-read")
      .insertOne({ userId: user._id, bookId: bookData.bookId });
    res.status(201).send(books);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error adding read book");
  }
});

bookRouter.delete("/read/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookReadRemove = await req.db
      .collection("books-read")
      .deleteOne({ bookId: bookId });
    res.status(200).send(bookReadRemove);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

module.exports = bookRouter;
