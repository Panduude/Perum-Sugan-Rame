const pool = require("../configs/database");


module.exports = {
    kelolaPembayaran(req, res) {
      let id = req.session.userid;
      res.render("kelola-pembayaran", {
        url: "http://localhost:5050/",
        userName: req.session.username,
        role: req.session.role,
      })
    },
  };