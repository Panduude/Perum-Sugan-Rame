const pool = require("../configs/database");

// Kirim error jika koneksi gagal
pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Fungsi untuk merender file register yang ada pada folder 'src/views/register.ejs'
  formRegister(req, res) {
    res.render("register", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5050/"
    });
  },
  // Fungsi untuk menyimpan data
  saveRegister(req, res) {
    // Tampung inputan user kedalam varibel username, email dan password
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.pass;
    // Pastikan semua varibel terisi
    if (username && email && password) {
      // Panggil koneksi dan eksekusi query
      pool.connect((err, connection) => {
        if (err) throw err;
        connection.query(`INSERT INTO table_user (user_name,user_email,user_password) VALUES ($1,$2,$3);`,
          [username, email, password], (error, results) => {
            if (error) throw error;
            // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
            req.flash("color", "success");
            req.flash("status", "Yes..");
            req.flash("message", "Registrasi berhasil");
            // Kembali kehalaman login
            res.redirect("/login");
          }
        );
        // Koneksi selesai
        connection.release();
      });
    } else {
      // Kondisi apabila variabel username, email dan password tidak terisi
      res.redirect("/login");
      res.end();
    }
  },
};
