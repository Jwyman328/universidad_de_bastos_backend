const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const helmet = require("helmet");

app.use(helmet());

const checkUserIsAuthenticated = require("./middlewares/checkUserIsAuthenticated");

//routers
const authRouter = require("./routers/auth-router");
const noteRouter = require("./routers/note-router");
const bookRouter = require("./routers/book-router");
const videoRouter = require("./routers/video-router");
const articleRouter = require("./routers/article-router");

//mongodb
const MongoClient = require("mongodb").MongoClient;
var connectionAccount;
const connectToMongo = require("./db/mongo_client_db");

const DalDb = require("./DAL/dalDB");
const BooksDal = require("./DAL/books/booksDal");
const NotesDal = require("./DAL/notes/notesDal");
const AuthDal = require("./DAL/auth/authDal");
const VideoDal = require("./DAL/videos/videoDal");
const ArticleDAL = require("./DAL/articles/articlesDAL");

let db;
let databaseLocation;
if (process.env.NODE_ENV === "DEV") {
  console.log("In developmnet mode");
  databaseLocation = process.env.DATABASEURLLOCALDOCKER;
} else {
  console.log("production mode");
  databaseLocation = process.env.DATABASEURL;
}
app.listen(process.env.PORT || 3000, async () => {
  try {
    connectionAccount = await MongoClient.connect(
      //
      databaseLocation,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connectionAccount.db("universidadDeBastos"); // make a cluster
    let users = await db.createCollection("users");
    let notes = await db.createCollection("notes");
    let books = await db.createCollection("books");
    let articles = await db.createCollection("articles");
    let booksRead = await db.createCollection("books-read");
    let videos = await db.createCollection("videos");
    let videoWatched = await db.createCollection("videos-watched");

    await db.collection("users").createIndex({ username: 1 }, { unique: true });

    console.log("listening oono port bannana 300");
  } catch (e) {
    console.log(e);
  }
});

const passDBToRouter = (req, res, next) => {
  try {
    req.db = db;
    next();
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send("error");
  }
};

const convertDBToDALDB = (req, res, next) => {
  try {
    req.db = db;
    req.db = new DalDb(
      req.db,
      BooksDal,
      NotesDal,
      AuthDal,
      VideoDal,
      ArticleDAL
    );
    next();
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send("error");
  }
};

app.use("/auth/", passDBToRouter, convertDBToDALDB, authRouter);
app.use(
  "/notes/",
  passDBToRouter,
  checkUserIsAuthenticated,
  convertDBToDALDB,
  noteRouter
);
app.use(
  "/books/",
  passDBToRouter,
  checkUserIsAuthenticated,
  convertDBToDALDB,
  bookRouter
);

app.use(
  "/videos/",
  passDBToRouter,
  checkUserIsAuthenticated,
  convertDBToDALDB,
  videoRouter
);

app.use(
  "/article/",
  passDBToRouter,
  checkUserIsAuthenticated,
  convertDBToDALDB,
  articleRouter
);

module.exports = app;
