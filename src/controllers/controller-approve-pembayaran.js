const { Pool, Connection } = require("pg");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  approvePembayaran(req, res) {
    let id = req.session.userid;
    pool.connect((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(
        `SELECT * from pembayaran ORDER BY id_approve ASC`,
        (err, result) => {
          if (err) {
            throw err;
          }
          res.render("approve-pembayaran", {
            url: "http://localhost:5050/",
            userName: req.session.username,
            role: req.session.role,
            pembayaran: result.rows
          });
        }
      );
    });
  },
};
