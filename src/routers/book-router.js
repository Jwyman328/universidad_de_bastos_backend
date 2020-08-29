const express = require("express");
const bookRouter = new express.Router();
const { ObjectId } = require("mongodb"); 

 bookRouter.get("/", async (req, res) => {
  try {
    const allBooksWithUserSpecificHasBeenReadByUserField = await req.db.booksDal.findAllBooksByUser(req.user._id)

    res.status(201).send(allBooksWithUserSpecificHasBeenReadByUserField);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error getting books");
  }
});


bookRouter.post("/read/", async (req, res) => {
  try {
    const bookId = req.body.bookId;
    const userId = req.user._id;
    const books = await req.db.booksDal.markBookAsRead(userId, bookId)
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
    const bookReadRemove = await req.db.booksDal.removeBookAsRead(bookId)

    res.status(200).send(bookReadRemove);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

module.exports = bookRouter;
