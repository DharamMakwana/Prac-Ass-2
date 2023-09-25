const Student = require("../models/studentModel");

module.exports = {
  getStudents: async (req, res) => {
    try {
      const students = await Student.find({});
      res.json({ students });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  addStudent: async (req, res) => {
    try {
      const { name, age, grade } = req.body;
      const student = new Student({ name, age, grade });
      await student.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  showUpdateForm: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.render("updateStudent", { student });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id, name, age, grade } = req.body;
      await Student.findByIdAndUpdate(id, { name, age, grade });
      res.json({ success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.body;
      await Student.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
