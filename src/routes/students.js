const express = require("express");
const Student = require("../models/student");
const router = express.Router();
var pg = require("pg");

const client = new pg.Client({
  user: "docker",
  database: "postgres",
  password: "docker",
  port: 5432,
});
client.connect();

router.get("/", async (req, res) => {
  try {
    const users = await Student.findAll({});
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", (req, res) => {
  var whitelist = ["first_name", "last_name", "id"];
  var data = {};

  for (var property in req.body) {
    if (
      req.body.hasOwnProperty(property) &&
      whitelist.indexOf(property) !== -1
    ) {
      data[property] = req.body[property];
    }
  }
  const newStudent = new Student(data);

  newStudent
    .save()
    .then((student) => res.json(student))
    .catch((err) => res.status(500).json(err));
});

router.delete("/delete/:id", async (req, res) => {
  const idToDel = req.params.id;
  console.log(req.params.id);
  try {
    const success = await Student.destroy({ where: { id: idToDel } });
  } catch {
    (err) => res.json(500, err);
  }
  const users = await Student.findAll({});
  res.json(users);
});

router.post("/update/:id", (req, res) => {
  console.log(
    "UPDATE students SET first_name= '" +
      req.body.first_name +
      "', last_name='" +
      req.body.last_name +
      "', id='" +
      req.body.id +
      "' WHERE id='" +
      req.params.id +
      "';"
  );
  client.query(
    "UPDATE students SET first_name= '" +
      req.body.first_name +
      "', last_name='" +
      req.body.last_name +
      "', id='" +
      req.body.id +
      "' WHERE id='" +
      req.params.id +
      "';",
    (err, result) => {
      console.log("Updated");
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = router;
