const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  prosesPembayaran(req, res) {
    let id = req.session.userid;
    let jenisPembayaran = req.session.jenisPembayaran;
    let id_pembayaran = req.params.id;
    req.session.id_pembayaran = id_pembayaran;
    pool.connect((err, connection) => {
      if (err) {
        throw err;
      }
      if (jenisPembayaran == "keamanan") {
        connection.query(
          `SELECT * FROM pembayaran_warga_keamanan INNER JOIN table_user
          ON pembayaran_warga_keamanan.user_id = table_user.user_id
          WHERE table_user.user_id = $1 AND pembayaran_warga_keamanan.id_pembayaran = $2
          ORDER BY id_pembayaran ASC `,
          [id, id_pembayaran],
          (err, results) => {
            if (err) throw err;
            res.render("proses-pembayaran", {
              url: "http://localhost:5050/",
              userName: req.session.username,
              role: req.session.role,
              waktu: results.rows[0].waktu,
              jenisPembayaran: jenisPembayaran,
            });
          }
        );
        connection.release();
      }
      if (jenisPembayaran == "kebersihan") {
        connection.query(
          `SELECT * FROM pembayaran_warga_kebersihan INNER JOIN table_user
              ON pembayaran_warga_kebersihan.user_id = table_user.user_id
              WHERE table_user.user_id = $1 AND pembayaran_warga_kebersihan.id_pembayaran = $2
              ORDER BY id_pembayaran ASC `,
          [id, id_pembayaran],
          (err, results) => {
            if (err) throw err;
            res.render("proses-pembayaran", {
              url: "http://localhost:5050/",
              userName: req.session.username,
              role: req.session.role,
              waktu: results.rows[0].waktu,
              jenisPembayaran: jenisPembayaran,
            });
          }
        );connection.release();
      }
    });
  },
};
