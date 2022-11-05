const { Connection } = require("pg");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  berita(req, res) {
    let id = req.session.userid;
    let idberita = req.params.id;
    pool.connect((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(
        `SELECT * FROM berita WHERE idberita = $1`,
        [idberita],
        (err, results) => {
          res.render("detail_berita", {
            url: "http://localhost:5050/",
            userName: req.session.username,
            role: req.session.role,
            berita: results.rows,
          });
        }
      );
      connection.release();
    });
  },
};
