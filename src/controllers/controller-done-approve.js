const pool = require("../configs/database");
const { connect } = require("../routes/router-app");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  doneApprove(req, res) {
    let id = req.session.userid;
    let id_approve = req.params.id;
    pool.connect((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(
        `UPDATE * FROM pembayaran WHERE id_approve = $1 ORDER BY id_approve ASC`,
        [id_approve],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.render("approve-pembayaran", {
            userName: req.session.username,
            role: req.session.role,
            pembayaran: result.rows,
          });
        }
      );
    });
  },
};
