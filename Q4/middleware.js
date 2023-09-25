const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = {
  checkAuth: (req, res, next) => {
    const token = req.session.token;

    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.redirect("/views/login");
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.redirect("/views/login");
    }
  },
};
