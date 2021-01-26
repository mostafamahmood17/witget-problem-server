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
  
  const buy = client.db(`${process.env.DB_DATA}`).collection(`${process.env.DB_USER}`);

  
  console.log("Database connected");

  

  app.post("/buy", (req, res) => {
    console.log(req.body)
    buy.insertOne(req.body).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  
  
  // app.post("/sell", (req, res) => {
  //   sell.insertOne(req.body).then((result) => {
  //     res.send(result.insertedCount > 0);
  //   });
  // });


});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000)

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening at http://localhost:${process.env.PORT}`);
// });