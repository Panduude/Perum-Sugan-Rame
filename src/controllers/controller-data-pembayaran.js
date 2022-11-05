const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  dataPembayaran(req, res) {
    let id = req.session.userid;
    let jenisPembayaran = req.params.id;
    pool.connect((err, connection) => {
      if (err) {
        throw err;
      }
      if (jenisPembayaran == 'keamanan') {
        connection.query(
          `SELECT * FROM pembayaran_warga_keamanan INNER JOIN table_user
        ON pembayaran_warga_keamanan.user_id = table_user.user_id
        WHERE table_user.user_id = $1
        ORDER BY id_pembayaran ASC `,
          [id],
          (err, results) => {
            if (err) throw err;
            req.session.jenisPembayaran= jenisPembayaran;
            res.render("data-pembayaran", {
              url: "http://localhost:5050/",
              userName: req.session.username,
              role: req.session.role,
              data: results.rows,
              jenisPembayaran: jenisPembayaran
            });
          }
        );connection.release();
      } if(jenisPembayaran == 'kebersihan') {
        connection.query(
          `SELECT * FROM pembayaran_warga_kebersihan INNER JOIN table_user
        ON pembayaran_warga_kebersihan.user_id = table_user.user_id
        WHERE table_user.user_id = $1
        ORDER BY id_pembayaran ASC `,
          [id],
          (err, results) => {
            if (err) throw err;
            req.session.jenisPembayaran= jenisPembayaran;
            res.render("data-pembayaran", {
              url: "http://localhost:5050/",
              userName: req.session.username,
              role: req.session.role,
              jenisPembayaran: jenisPembayaran,
              data: results.rows
            });
          }
        );connection.release();
      }
    });
  },
};
