const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });

      if (user) {
        const token = jwt.sign({ username: user.username }, config.secret, {
          expiresIn: "1h",
        });
        req.session.token = token;
        res.redirect("/views/students");
      } else {
        res.redirect("/views/login");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      res.redirect("/views/login");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/views/login");
  },
};
