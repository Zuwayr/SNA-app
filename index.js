const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const routeStudents = require("./src/routes/students");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend for queries app is working!");
});

app.use("/api/students", routeStudents, (req, res) => res.sendStatus(401));

const port = 3000;
app.listen(port);

console.log(`listening on ${port}`);
