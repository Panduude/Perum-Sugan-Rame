const { Template } = require("ejs");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  buatPembayaran(req, res) {
    let id = req.session.userid;
    pool.connect((err, connection) => {
      if (err) throw err;
      res.render("buat-pembayaran", {
        url: "http://localhost:5050/",
        userName: req.session.username,
        role: req.session.role,
      });
    });
  },
};
