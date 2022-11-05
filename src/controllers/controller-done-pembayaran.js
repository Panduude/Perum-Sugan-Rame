const session = require("express-session");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  donePembayaran(req, res) {
    let id = req.session.userid;
    let jenisPembayaran = req.session.jenisPembayaran;
    let id_pembayaran = req.session.id_pembayaran;
    pool.connect((err, connection) => {
      if (err) throw err;
      if (jenisPembayaran == "keamanan") {
        connection.query(
          `UPDATE pembayaran_warga_keamanan SET status_pembayaran = true WHERE user_id = $1 AND id_pembayaran = $2`,
          [id, id_pembayaran],
          (err, results) => {
            if (err) throw err;
            res.redirect("/data-pembayaran/" + jenisPembayaran);
          }
        );connection.release();
      }
      if (jenisPembayaran == "kebersihan") {
        connection.query(
          `UPDATE pembayaran_warga_kebersihan SET status_pembayaran = true WHERE user_id = $1 AND id_pembayaran = $2`,
          [id, id_pembayaran],
          (err, results) => {
            if (err) throw err;
            res.redirect("/data-pembayaran/" + jenisPembayaran);
          }
        );connection.release();
      }
    });
  },
};
