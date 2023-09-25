const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = {
  checkAuth: (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) return res.status(401);

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  },
};
