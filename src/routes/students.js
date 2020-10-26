const express = require("express");
const Student = require("../models/student");
const router = express.Router();

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
  const { done } = req.body;
  Student.findByIdAndUpdate(req.params.id, { done })
    .then((student) => res.json(student))
    .catch((err) => res.json(500, err));
});

module.exports = router;
