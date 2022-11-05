const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
  login(req, res) {
    res.render("login", {
      url: "http://localhost:5050/",
      // Kirim juga library flash yang telah di set
      colorFlash: req.flash("color"),
      statusFlash: req.flash("status"),
      pesanFlash: req.flash("message"),
    });
  },
  // Post / kirim data yang diinput user
  loginAuth(req, res) {
    let email = req.body.email;
    let password = req.body.pass;
    if (email && password) {
      pool.connect((err, connection) => {
        if (err) throw err;
        connection.query(
          `SELECT * FROM table_user WHERE user_email = $1 AND user_password = $2`,
          [email, password],
          (error, results) => {
            let role = results.rows[0].role
            if (error) throw error;
            if (results.rows != 0) {
              if (role == 'admin') {
                req.session.loggedin = true;
                req.session.userid = results.rows[0].user_id;
                req.session.username = results.rows[0].user_name;
                req.session.role = results.rows[0].role;
                res.redirect("/index-admin");
              } else if (role == 'warga'){
                req.session.loggedin = true;
                req.session.userid = results.rows[0].user_id;
                req.session.username = results.rows[0].user_name;
                req.session.role = results.rows[0].role;
                res.redirect("/index-warga");
              }
              // Jika data ditemukan, set sesi user tersebut menjadi true
            } else {
              // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
              req.flash("color", "danger");
              req.flash("status", "Oops..");
              req.flash("message", "Akun tidak ditemukan");
              res.redirect("/login");
            }
          }
        );
        connection.release();
      });
    } else {
      res.redirect("/login");
      res.end();
      console.log(password)
    }
  },
  // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'http://localhost:5050/login/logout'
  logout(req, res) {
    // Hapus sesi user dari broser
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      // Hapus cokie yang masih tertinggal
      res.clearCookie("secretname");
      res.redirect("/login");
    });
  },
};