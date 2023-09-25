const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();

const serveTemplate = async (req, res) => {
  const templateName = req.url.slice(1);
  let data;

  if (templateName == "students") {
    data = await Student.find({});
  }

  res.render(templateName || "login", {
    data,
  });
};

router.use(serveTemplate);

module.exports = router;
