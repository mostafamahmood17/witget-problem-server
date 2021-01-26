const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9na52.mongodb.net/${process.env.DB_data}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express());


client.connect((err) => {
  console.error(err)
  
  const buyCollections = client.db(`${process.env.DB_DATA}`).collection(`${process.env.DB_USER}`);
  const sellCollections = client.db(`${process.env.DB_DATA}`).collection(`${process.env.DB_SELL}`);

  
  console.log("Database connected");

  

  app.post("/buy", (req, res) => {
    const buyInfo = req.body;
    buyCollections.insertOne(buyInfo)
    .then((result) => {
      res.send(result.insertedCount > 0);
    });
  });


  app.post("/sell", (req, res) => {
    const sellInfo = req.body;
    console.log(sellInfo)
    sellCollections.insertOne(sellInfo)
    .then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000)
