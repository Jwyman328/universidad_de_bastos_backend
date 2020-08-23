const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const helmet = require("helmet");

app.use(helmet());

const checkUserIsAuthenticated = require('./middlewares/checkUserIsAuthenticated')

//routers
const authRouter = require("./routers/auth-router");
const noteRouter = require("./routers/note-router");


//mongodb
const MongoClient = require("mongodb").MongoClient;
var connectionAccount;
const connectToMongo = require('./db/mongo_client_db');

let db;
let databaseLocation;
if(process.env.NODE_ENV='DEV'){
  console.log('In developmnet mode')
  databaseLocation = process.env.DATABASEURLLOCAL
}else{
  console.log('production mode')
  databaseLocation = process.env.DATABASEURL
}
app.listen(process.env.PORT || 3000, async () => {
  try{
    connectionAccount = await MongoClient.connect(  //
      databaseLocation
    ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connectionAccount.db("universidadDeBastos"); // make a cluster
    let users = await db.createCollection("users"); // make a collection
    let notes = await db.createCollection("notes"); // make a collection
    await db.collection("users").createIndex({ username: 1 }, { unique: true });
  
    console.log("listening oono port bannana 300");
  } catch(e) {
    console.log(e)
  }
  
});

const passDBToRouter =  (req,res,next)=>{ 
  try{
    req.db =  db;
    next()
  }
  catch(e){
    console.log(e)
    res.status(500)
    res.send('error')
  }
}

app.use('/auth/',passDBToRouter, authRouter);
app.use('/notes/', passDBToRouter,checkUserIsAuthenticated, noteRouter)


module.exports = app;