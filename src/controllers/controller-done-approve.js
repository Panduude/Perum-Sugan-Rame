const pool = require("../configs/database")

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
        `UPDATE pembayaran SET status_approve = true WHERE id_approve = $1`,
        [id_approve],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.redirect('/approve-pembayaran')
        }
      );connection.release();
    });
  },
};
